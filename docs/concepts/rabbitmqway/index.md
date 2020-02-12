---
id: index
title: Messaging the RabbitMQ Way
---

In this guide we'll look at the various components of AMQP 0-9-1 such as exchanges, bindings, queues and how they are combined to produce different messaging patterns.

The simplest thing to remember is that:

1. Publishers open long lived connections to a RabbitMQ broker and send messages down a channel.
2. The channel on the broker side routes messages to queues based on routing rules determined by the exchange, exchange to queue bindings and message properties.
3. Messages are stored in queues in FIFO order and remain there until they can be delivered to a consumer.
4. Consumers subscribe to queues over long lived connections and get delivered messages in FIFO order.

## Logical Routing Architecture

![Logical routing architectyre](/img/docs/concepts/logical-routing.png)

## Physical Routing Architecture

In reality, exchanges are not things but simply meta-data that determine message routing. The real flow is publisher channel to queue to consumer channel.

![Physical routing architectyre](/img/docs/concepts/physical-routing.png)

Understanding the physical message flow can help you as you learn more about RabbitMQ clustering and performance.

Most diagrams will use the logical routing style to simplify things.