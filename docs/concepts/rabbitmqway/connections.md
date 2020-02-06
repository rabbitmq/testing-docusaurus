---
id: connections
title: Connections and Channels
---

Clients should open long-lived connections to get the best performance out of RabbitMQ. Once a connection is opened, the second step is to open a **channel**. A channel can be thought of as a virtual connection that multiplexes into a single AMQP connection. It allows a client to open multiple virtual connections with low overhead.

Establishing an AMQP connection and channel is expensive and requires many roundtrips, therefore it is highly advisable to create long lived connections and channels. Creating a connection per message published is extremely inefficient and will yield very low throughput.