# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

# SPDX-License-Identifier: Apache-2.0

# This is a "Strict rule ordering" egress security template meant only for the egress use case. These rules would need to be adjusted to accommodate any other use cases. Use this ruleset with "Strict" rule ordering firewall policy and no default block action, as this template includes default block rules. This template will work with the "Drop Established firewall policy setting" but it does not require it. If you use "Drop Established" with this template it will generate duplicate log entries for some blocked traffic.

# This template will not work well with the "Drop All" firewall policy setting.

# Silently allow TCP 3-way handshake to be setup by $HOME_NET clients

# Do not move this section, it's important that this be at the top of the entire firewall ruleset to reduce rule conflicts

pass tcp $HOME_NET any -> $EXTERNAL_NET any (flow:not_established, to_server; msg:"pass rules do not alert/log"; sid:9918156;)
pass tcp $EXTERNAL_NET any -> $HOME_NET any (flow:not_established, to_client; msg:"pass rules do not alert/log"; sid:9918199;)

# Only allow short list of egress ports, and block all the rest

drop ip $HOME_NET any -> $EXTERNAL_NET ![443] (msg:"Disallowed Egress Port"; sid:20231671;)

# Allow Amazon

pass tls $HOME_NET any -> $EXTERNAL_NET any (tls.sni; content:".amazonaws.com"; nocase; endswith; flow:to_server; sid:20240002;)
pass tls $HOME_NET any -> $EXTERNAL_NET any (tls.sni; content:".amazon.com"; nocase; endswith; flow:to_server; sid:20240022;)

# Block and log any egress traffic not already allowed above

# reject TCP traffic for a more graceful block

reject tcp $HOME_NET any -> $EXTERNAL_NET any (flow:to_server; msg:"Default egress TCP to_server reject"; sid:9822311;)
drop udp $HOME_NET any -> $EXTERNAL_NET any (flow:to_server; msg:"Default egress UDP to_server drop"; sid:82319824;)
drop icmp $HOME_NET any -> $EXTERNAL_NET any (flow:to_server; msg:"Default egress ICMP to_server drop"; sid:82319825;)

# Block, but do not log any ingress traffic

drop ip $EXTERNAL_NET any -> $HOME_NET any (flow:to_server; noalert; sid:98228398;)
