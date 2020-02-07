---
id: queues
title: Queues
---
A queue stores messages in FIFO order until they can be delivered to a consumer. Messages are deleted either once the consumer acknowledges them or auto-acknowledgements are used. 

Likewise, publishers can request confirmation that their messages have been persisted to one or more queues (called Publisher Confirms). These publisher confirms and consumer acknowledgements form the basis of reliable messaging in RabbitMQ.

If there is currently no consumer then the message remains in the queue until consumption (see note).

> NOTE: Messages and queues can be configured to be durable or non-durable and even ephemeral with auto-delete features. See the Reliability Guide for an introduction to message durability.

## Queue Types

There are three types of queue available.

### Classic queue

This is an unreplicated queue that exists only on a single broker. Use this queue when you only have a single broker or high availability of the queue is not required. Classic queues offer the highest throughput and lowest latency of the queue types.


### Classic HA queue

This is a replicated queue that can exist across a cluster of brokers. It is designed to provide safety against data loss and provide high availability. See the High Availabilty page to learn more.

### Quorum queue

This is a replicated queue designed to replace Classic HA queues, based on the Raft protocol. It is the recommend queue type for when you need high availability of a queue and strong guarantees against data loss.


## Queue Configurations

### Limits

We can configure queues to not grow beyond a certain size or length via the use of policies. When a queue becomes "full" it will start either rejecting, discarding or moving messages into an overflow queue, according to what you configure it to do.

### Time-to-live (TTL)

Classic and Classic HA queues allow for messages to be discarded once they exceed a given time-limit

### Lazy Mode

Classic and Classic HA queues by default will try and keep messages in memory. This can cause memory issues when queues grow very large. When a queue is configured to be lazy it will remove messages from memory once successfully written to disk and lazily load them back into memory on demand. This lowers the memory footprint dramatically.