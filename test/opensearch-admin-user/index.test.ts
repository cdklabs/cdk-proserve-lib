import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Domain, EngineVersion } from 'aws-cdk-lib/aws-opensearchservice';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { OpensearchAdminUser } from '../../src/opensearch-admin-user/index';

describe('OpensearchAdminUser', () => {
    let stack: Stack;
    let domain: Domain;
    let username: StringParameter;
    let password: StringParameter;

    beforeEach(() => {
        stack = new Stack(undefined, `TST${new Date().getTime()}`);

        domain = new Domain(stack, 'TestDomain', {
            domainName: 'test-domain',
            version: EngineVersion.OPENSEARCH_1_3
        });

        username = new StringParameter(stack, 'Username', {
            parameterName: '/test/username',
            stringValue: 'admin'
        });
        password = new StringParameter(stack, 'Password', {
            parameterName: '/test/password',
            stringValue: 'password123'
        });
    });

    it('creates custom resource with correct properties', () => {
        // Act
        new OpensearchAdminUser(stack, 'TestConstruct', {
            username,
            password,
            domain
        });

        // Assert
        const template = Template.fromStack(stack);
        template.hasResourceProperties('Custom::OpensearchAdminUser', {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            DomainName: Match.objectLike({
                Ref: Match.stringLikeRegexp('TestDomain')
            }),
            PasswordParameterName: Match.objectLike({
                Ref: Match.stringLikeRegexp('Password')
            }),
            UsernameParameterName: Match.objectLike({
                Ref: Match.stringLikeRegexp('Username')
            })
        });
    });

    it('creates Lambda function with correct properties', () => {
        // Act
        new OpensearchAdminUser(stack, 'TestConstruct', {
            username,
            password,
            domain
        });

        // Assert
        const template = Template.fromStack(stack);
        template.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            Runtime: 'nodejs18.x',
            Timeout: 60,
            MemorySize: 512,
            DeadLetterConfig: Match.anyValue()
        });
    });

    it('grants necessary permissions to Lambda function', () => {
        // Act
        new OpensearchAdminUser(stack, 'TestConstruct', {
            username,
            password,
            domain
        });

        // Assert
        const template = Template.fromStack(stack);
        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'es:UpdateDomainConfig',
                        Effect: 'Allow',
                        Resource: Match.anyValue()
                    })
                ])
            }
        });
    });

    it('grants KMS permissions when domainKey is provided', () => {
        // Arrange
        const domainKey = new Key(stack, 'TestDomainKey');

        // Act
        new OpensearchAdminUser(stack, 'TestConstruct', {
            username,
            password,
            domain,
            domainKey
        });

        // Assert
        const template = Template.fromStack(stack);

        // Check that the Lambda function has permission to use the KMS key
        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'kms:DescribeKey',
                        Effect: 'Allow',
                        Resource: {
                            'Fn::GetAtt': [
                                Match.stringLikeRegexp('TestDomainKey'),
                                'Arn'
                            ]
                        }
                    })
                ])
            }
        });
    });

    it('creates encrypted resources with provided key', () => {
        // Arrange
        const workerEncryption = new Key(stack, 'TestWorkerKey');

        // Act
        new OpensearchAdminUser(stack, 'TestConstruct', {
            username,
            password,
            domain,
            workerEncryption
        });

        // Assert
        const template = Template.fromStack(stack);
        template.hasResourceProperties('AWS::SQS::Queue', {
            KmsMasterKeyId: {
                'Fn::GetAtt': [Match.stringLikeRegexp('TestWorkerKey'), 'Arn']
            }
        });
        template.hasResourceProperties('AWS::Lambda::Function', {
            KmsKeyArn: {
                'Fn::GetAtt': [Match.stringLikeRegexp('TestWorkerKey'), 'Arn']
            }
        });
    });
});
