---
id: failures
title: Types of Publisher Failure
---

## Connection failures

Network connection between clients and RabbitMQ nodes can fail. How applications handle such failures directly contributes to the data safety of the overall system.

### Heartbeats

It can take time to detect the loss of a TCP connection so in order to speed up connection loss detection, an explicit [heartbeat](?) can be configured when opening the connection.

### Connection Recovery

Several RabbitMQ clients support automatic recovery of connections and topology (queues, exchanges, bindings, and consumers): Java, .NET, Bunny are some examples.

Other clients do not provide automatic recovery as a feature but do provide examples of how application developers can implement recovery.

The automatic recovery process for many applications follows the following steps:

- Reconnect to a reachable node
- Restore connection listeners
- Restore channel listeners
- Re-open channels
- Restore channel listeners
- Restore channel basic.qos setting, publisher confirms and transaction settings

After connections and channels are recovered, topology recovery can start. Topology recovery includes the following actions, performed for every channel:

- Re-declare exchanges (except for predefined ones)
- Re-declare queues
- Recover all bindings
- Recover all consumers

## Confirm timeouts

When a confirm is not received after a configured time period the publisher must choose whether it should send the mesage again or not. Resending corresponds with At-Least-Once guarantees while not sending could result in the message being lost (at-most-once).

## Non-existent exchange

An attempt to publish to a non-existent exchange will result in a channel-level exception with the code of 404 Not Found and render the channel it was attempted on to be closed.

## Unroutable

If the publisher has set the [mandatory flag](confirms#mandatory-flag) then it will be notified if the message could not be routed to a queue. If the flag is not set then the message is silently dropped.

## Queue Full

A queue can have a [length or size limit](?) applied. When at that limit, a queue will either:

- reject the message (when [reject-publish](?) has been configured).
- accept the message but drop the oldest message (when [drop-head](?) has been configured and no [deadletter exchange](?) has been configured).
- accept the message but eject the oldest message from the queue and forward it to the configured deadletter exchange (when [drop-head](?) has been configured and also a [deadletter exchange](?) has been configured).

## Channel process crash

Channel process crashes are extremely rare and result in the loss of the channel. A new channel must be reopened. 

## Blocked Connection (publisher throttling)

When a RabbitMQ broker is being overloaded by publishers, it uses a [flow control mechanism to throttle publishers](throttling). When a connection is blocked, no messages can be sent down any open channels.
    
## Notes on Exception Handling

Publishers generally can expect two types of exception:

- A network I/O exception due to a failed write or timeout
- An acknowledgement delivery timeout

Note that "exception" here means an error in the general sense; some programming languages do not have exceptions at all so clients there would communicate the error differently. The discussion and recommendations in this section should apply equally to most client libraries and programming languages.

The former type of exception can occur immediately during a write or with a certain delay. This is because certain types of I/O failures (e.g. to high network congestion or packet drop rate) can take time to detect. Publishing can continue after the connection recovers but if the connection is blocked due to an alarm, all further attempts will fail until the alarm clears. This is covered in more details below in the [Publisher Throttling page](throttling).

The latter type of exception can only happen when the application developer provides a timeout. What timeout value is reasonable for a given application is decided by the developer. It should not be lower than the effective heartbeat timeout.