---
id: index
title: The Basics
---

## The Basics

Publishers publish to a destination that varies from protocol to protocol:

- In AMQP 0-9-1, publishers publish messages to exchanges.
- In AMQP 1.0, publishing happens on a link.
- In MQTT, publishers publish to topics. 
- STOMP supports a variety of destination types: topics, queues, AMQP 0-9-1 exchanges. 

This is covered in more details in the protocol-specific differences section.

A message is sent down a channel established between the publisher and a broker. On the broker side, the channel process will determin the destination queue(s) by looking up the exchange and its bindings. The message will then be forwarded on to any matching queues.

## Publisher Lifecycle

Publishers are often long lived: that is, throughout the lifetime of a publisher it publishes multiple messages. Opening a connection or channel (session) to publish a single message is not optimal.

Publishers usually open their connection(s) during application startup. They often would live as long as their connection or even application runs.

Publishers can be more dynamic and begin publishing in reaction to a system event, stopping when they are no longer necessary. This is common with WebSocket clients used via Web STOMP and Web MQTT plugins, mobile clients and so on.

## Protocol Differences

The process of publishing messages is quite similar in every protocol RabbitMQ supports. All four protocols allow the user to publish a message which has a payload (body) and one or more message properties (headers).

All four protocols also support an acknowledgement mechanism for publishers which allows the publishing application to keep track of the messages that have or haven't been successfully accepted by the broker, and continue publishing the next batch or retry publishing the current one.

The difference typically have more to do with the terminology used than the semantics. Message properties also vary from protocol to protocol.
AMQP 0-9-1

### AMQP 0-9-1

In AMQP 0-9-1, publishing happens on a channel using routing rules determined by an exchange. The broker channel process uses a routing topology set up by defining bindings between one or more queues and the exchange, or source exchange and destination exchange. Successfully routed messages are stored in queues.

The role of each entity is covered in the AMQP 0-9-1 concepts guide.

### AMQP 1.0

In AMQP 1.0 publishing happens within a context of a link.

### MQTT 3.1

In MQTT 3.1.1, messages are published on a connection to a topic. Topics perform both routing and storage. In RabbitMQ, a topic is backed by a queue internally.

When publisher chooses to use QoS 1, published messages are acknowledged by the routing node using a PUBACK frame, the publisher acknowledgement mechanism in MQTT 3.1.

Publishers can provide a hint to the server that the published message on the topic must be retained (stored for future delivery to new subscribers). Only the latest published message for each topic can be retained.

Other than closing the connection, there is no mechanism by which the server can communicate a publishing error to the client.

See the MQTT and MQTT-over-WebSockets guides to learn more.

### STOMP

STOMP clients publish on a connection to one or more destinations which can have different semantics in case of RabbitMQ.

STOMP provides a way for the server to communicate an error in message processing back to the publisher. Its variation of publisher acknowledgements is called receipts, which is a feature clients enable when publishing.

See the STOMP guide, STOMP-over-WebSockets and the STOMP 1.2 spec to learn more.