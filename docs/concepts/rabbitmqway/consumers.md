---
id: consumers
title: Consumers
---
Consumers subscribe to a queue using either auto-acknowledgement or manual acknowledgement mode and also optionally define a prefetch value.

## Acknowledgements and Prefetch

Once a channel has been established between a broker and a consumer, the consumer subscribes to a queue. The channel process on the broker will then start pushing messages from the queue down the channel to the consumer.

Because RabbitMQ uses a push model, it needs a back-pressure mechanism to control the flow of messages, to prevent overpowering the consumer. That mechanism is the combination of message acknowledgements and prefetch.

The prefetch is the number of unacknowledged messages the channel will allow at any one time. For example, with a prefetch of 5:

- broker pushes 1, 2, 3, 4, 5
- consumer acknowledges 1
- broker pushes 6
- consumer acknowledges 2, 3, 4
- broker pushes 7, 8, 9

At all times, there are no more than 5 unacknowledged messages on the channel. Higher prefetches yield higher throughputs but also have downsides, see the TODO page for a deeper dive.

A consumer can configure auto-acknowledgement mode which means a message will be automatically acknowledged upon sending the message. This is an unsafe setting that can result in message loss, but provides higher throughput. It is not generally recommended.

## Competing Consumers

We can scale out consumption of a queue if a single consumer cannot handle the load by itself. We simply add more consumers to the queue in question and they will all get a portion of messages delivered to them.

We call multiple consumers on a single queue **competing consumers** because each consumer competes to consume the same set of messages. With three consumers subscribed to a single queue, each should get delivered about 1/3 of the messages.

![Competing consumers](/img/docs/queues-competing-consumers.png)

## Non-competing Consumers

When you want three consumers to each process every single message of an exchange, then you need three queues. You tend to need this when you have multiple different services all needing to consume the same messages.

![Non-competing consumers](/img/docs/queues-non-competing-consumers.png)

## Scaling Consumers Independently

One of RabbitMQ's super powers is the way that it decouples both publishers from consumers, but also different consumers from each other.

In other messaging systems that are based on topics, you must scale out the topic itself according to the needs of the slowest consumer. With RabbitMQ each subscribing service gets its own queue and can add as many consumers as it desires, independently of other subscribed services.

![Independent consumer scaling](/img/docs/queues-any-num-of-consumers.png)