---
id: confirms
title: Publisher Confirms
---

Ensuring data safety is a collective responsibility of applications, client libraries and RabbitMQ cluster nodes. Messages can be lost in-flight between a publisher and broker.

A message could be lost:

- while in an outgoing or incoming buffer
- while being transmitted over the wire
- while being written to disk
- while being processed by the channel

Publisher confirms are an acknowledgement mechansim that offers At-Least-Once guarantees.

## Basic.ack, basic.nack, basic.return

Confirms come is as either:

- basic.ack: the message has been safely stored by the broker
- basic.nack: some kind of failure occurred and the message has not been safely stored by the broker
- basic.return: the message was unroutable (see the [Unroutable section](#mandatory-flag))

## Strategies for Using Publisher Confirms

Publisher confirms provide a mechanism for application developers to keep track of what messages have been successfully accepted by RabbitMQ. There are several commonly used strategies for using publisher confirms:

- **Streaming**: publish messages continuously, and process incoming confirms continuously. Limiting the number of unconfirmed messages (aka in-flight messages) to predetermined amount.
- **Batching**: publish a batch of messages at a time and wait for all outstanding confirms before sending the next batch.
- **Publish-and-wait**: publish one message at a time, waiting for the confirm before sending the next. This option is **highly** discouraged due to its highly negative impact on publisher throughput.

### Streaming Confirms

Most client libraries usually provide a way for developers to handle individual confirmations as they arrive from the server. The confirms will arrive asynchronously. Since publishing is also inherently asynchronous in AMQP 0-9-1, this option allows for safe publishing with very little overhead. The algorithm is usually similar to this:

- Enable publisher confirms on a channel
- For every published message, add a map entry that maps current sequence number to the message
- When a positive ack arrives, remove the entry
- When a negative ack arrives, remove the entry and schedule its message for republishing (or something else that's suitable)

In the RabbitMQ Java client, confirm handler is exposed via the ConfirmCallback and ConfirmListener interfaces. One or more listeners have to be added to a channel.

### Batch Publishing

This strategy involves publishing batches of messages and awaiting for the entire batch to be confirmed. Retries are performed on batches.

- Enable publisher confirms on a channel
- Send messages of a batch one after the other until all have been sent.
- Wait for all outstanding confirms
- When all confirms come in positive, publish the next batch
- If there are negative confirms or timeout hits, republish the entire batch or only the relevant messages

Some clients provide convenience API elements for waiting for all outstanding confirms. For example, in the Java client there is Channel#waitForConfirms(timeout).

Since this approach involves waiting for confirms, it will have negative effects on publisher throughput. The larger the batch, the smaller the effect will be.

### Publish-and-Wait

This strategy can be considered an anti-pattern and is documented primarily for completeness. It involves publishing a message and immediately waiting for the outstanding acknowledgement to arrive. 

This approach will have a very significant negative effect on throughput and is not recommended.

## Mandatory flag

A publisher can request to be notified if a published message was not routed to any queues. It does this by setting the the `mandatory` flag to true. If the message cannot be routed to any queue then the publisher is warned via an additional confirm message called basic.return which is sent to the publisher after a basic.ack.

The possible causes of an unroutable message are:

- message sent to the default exchange but no queue matches the routing key
- message sent to an exchange with no bindings
- message sent to an exchange with bindings, but no bindings match that particular message.