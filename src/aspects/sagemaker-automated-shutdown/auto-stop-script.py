import requests
from datetime import datetime
import getopt, sys
import urllib3
import boto3
import json
from io import StringIO 

class Capturing(list):
    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = self._stringio = StringIO()
        return self
    def __exit__(self, *args):
        self.extend(self._stringio.getvalue().splitlines())
        del self._stringio    # free up some memory
        sys.stdout = self._stdout

# OVERVIEW
# This script is adapted from https://github.com/aws-samples/amazon-sagemaker-notebook-instance-lifecycle-config-samples/blob/master/scripts/auto-stop-idle/autostop.py. Modifications are made to calculate four quantities (CPU utilization, CPU memory utilization, GPU utilization, GPU memory utilization) at regular intervals defined by the cron expression of the on-start script. These aggregate values are also added as tags to the notebook instance so users can get an idea of what the utilization looks like without accessing the actual jupyter notebook. Additionally, a cloudwatch agent logs more detailed metrics for users to monitor notebook instance usage. Fianlly, an example query (commented out) is provided to use within Cost Explorer to visualize aggregate metrics. 

# Usage
usageInfo = """Usage:
This scripts checks if a notebook is idle for X seconds if it does, it'll stop the notebook:
python autostop.py --time <time_in_seconds> [--port <jupyter_port>] [--ignore-connections]
Type "python autostop.py -h" for available options.
"""
# Help info
helpInfo = """-t, --time
    Auto stop time in seconds
-p, --port
    jupyter port
-c --ignore-connections
    Stop notebook once idle, ignore connected users
-h, --help
    Help information
"""

idle = True
port = '8443'
ignore_connections = False
try:
    opts, args = getopt.getopt(sys.argv[1:], "ht:p:c", ["help","time=","port=","ignore-connections"])
    if len(opts) == 0:
        raise getopt.GetoptError("No input parameters!")
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print(helpInfo)
            exit(0)
        if opt in ("-t", "--time"):
            time = int(arg)
        if opt in ("-p", "--port"):
            port = str(arg)
        if opt in ("-c", "--ignore-connections"):
            ignore_connections = False
except getopt.GetoptError:
    print(usageInfo)
    exit(1)

# Missing configuration notification
missingConfiguration = False
if not time:
    print("Missing '-t' or '--time'")
    missingConfiguration = True
if missingConfiguration:
    exit(2)

# Threshold for deciding idle value
time_threshold = time*60 # converts time in minutes put to seconds

# Force shutdown if conditions are true, or just log to output
idle_shutdown = True

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def get_notebook_name():
    log_path = '/opt/ml/metadata/resource-metadata.json'
    with open(log_path, 'r') as logs:
        _logs = json.load(logs)
    return _logs['ResourceName']


def get_notebook_resource_arn():
    log_path = '/opt/ml/metadata/resource-metadata.json'
    with open(log_path, 'r') as logs:
        _logs = json.load(logs)
    return _logs['ResourceArn']

# When is a notebook considered idle by the Notebooks API? - https://github.com/jupyter/notebook/issues/4634
# The way it works at present is that the kernel sends a 'busy' message when it starts executing a request, and an 'idle' message when it finishes. So it's idle if there's not code running. The 'while True' loop would leave it busy.
# Code execution isn't the only kind of request, though. Among other things, when you open a notebook in a tab, it will make a kernel info request, which will reset the timer.

def is_idle(last_activity):
    last_activity = datetime.strptime(last_activity,"%Y-%m-%dT%H:%M:%S.%fz")
    if (datetime.now() - last_activity).total_seconds() > time_threshold:
        print('Notebook is idle. Last activity time = ', last_activity)
        return True
    else:
        print('Notebook is not idle. Last activity time = ', last_activity)
        return False


response = requests.get('https://localhost:'+port+'/api/sessions', verify=False)
data = response.json()
print("kernal activity: " + response.text)
if len(data) > 0:
    
    print("Using Jupyter Notebook API since request was successful")
    for notebook in data:

        if notebook['kernel']['execution_state'] == 'idle':
            if not ignore_connections:
                if notebook['kernel']['connections'] == 0:
                    if not is_idle(notebook['kernel']['last_activity']):
                        idle = False
                else:
                    idle = False #If any connection exists, notebook is not idling
            else:
                if not is_idle(notebook['kernel']['last_activity']):
                    idle = False #If last activity is recent, notebook is not idling
        else:
            print('Notebook is not idle:', notebook['kernel']['execution_state'])
            idle = False
else:
    print("Checking SageMaker instance last modified time")
    client = boto3.client('sagemaker')
    uptime = client.describe_notebook_instance(
        NotebookInstanceName=get_notebook_name()
    )['LastModifiedTime']
    if not is_idle(uptime.strftime("%Y-%m-%dT%H:%M:%S.%fz")):
        idle = False

# Terminal Idle Check
response = requests.get('https://localhost:'+port+'/api/terminals', verify=False)
data = response.json()
print("terminal activity: " + response.text)
if len(data) > 0:
    print("Using Jupyter Notebook API since request was successful")
    for terminal in data:
        if not is_idle(terminal['last_activity']):
            idle = False
    
if idle and idle_shutdown:
    print(f'Closing idle notebook since Jupyter Kernels and Terminals idling is {idle}')
    client = boto3.client('sagemaker')
    client.stop_notebook_instance(
        NotebookInstanceName=get_notebook_name()
    )

else:
    print(f"Notebook is active at {datetime.now()}.")
    print(f'NOT closing idle notebook since Jupyter Kernels and Terminals idling is {idle}')
