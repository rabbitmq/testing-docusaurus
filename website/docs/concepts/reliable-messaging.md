---
id: reliable-messaging
title: Reliable Messaging
---

Reliable messaging is about strong guarantees that published messages get delivered to consumers in the face of failures such as TCP connection failures and even the loss of a broker.

There is a chain of responsibility from publisher to broker to consumer and both RabbitMQ and the clients need to behave correctly in order to achieve reliability.

## Guarantees 

With messaging systems we tend to talk about either At-Most-Once or At-Least-Once processing guarantees. Additionally we care about ordering guarantees.

### At-Most-Once Guarantee

The At-Most-Once guarantee says that messages might get lost, but a message will never get processed more than once. RabbitMQ offers this guarantee when:
- publishers do not use Publisher Confirms
- consumers use Auto Acknowledgement mode
- messages are stored in a classic queue with a non-redundant storage device

This is a best effort, highest performance option that is good when you don't care if some messages get lost but do care about low latency and high throughput.

### At-Least-Once Guarantee

The At-Least-Once guarantee says that no message will get lost, but might end up being processed by a consumer more than once. We attain this guarantee by ensuring:

- publishers use Publisher Confirms
- consumers use manual consumer acknowedgements correctly
- messages are replicated across multiple brokers or durable, fault tolerant storage is used. 

> RAID arrays or cloud block storage (like EBS on AWS) offer replication at the storage layer.

This guarantee offers safety first and usually results in lower throughput and higher latencies.

## Publisher Confirms

In order to not lose a message in-transit between a publisher and a broker, we use an acknowledgement mechansim called Publisher Confirms. Once a broker has safely written a message to disk (and possibly replicated), it will notify the publisher that it now has taken responsibility for that message.

Until this confirm has been received by the publisher, it cannot assume that the message is safe and remains the publisher's responsibility.

## Consumer Acknowledgements
 
In order not to lose a message in-transit between a broker and a consumer, we use Consumer Acknowledgements. If we want At-Least-Once processing guarantees, the consumer should send an acknowledgement **after** it has safely completed processing the message.

If there is an error while processing the message, then the message can be redelivered for another attempt at processing it.

If the consumer acknowledges a message on receipt, but before processing it, then an error during processing will essentially cause the message to have been lost. It will not be redelivered and will end up having never been successfully processed.

## Replicated Queues

Both Classic HA queues and Quorum queues offer replication of messages over multiple brokers so that in the event of the loss of a broker, no confirm messages are lost and the queue remains operational.

## Durable, Fault Tolerant Storage

Using a storage device that provides redundancy in the case of failure is also a good option. It does not offer high availability by itself as the loss of the broker will cause all hosted queues to be offline. But it can provide data safety.

RAID arrays and cloud block storage are both good options.