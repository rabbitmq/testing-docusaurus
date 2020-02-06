---
id: routing
title: Message Routing
---

RabbitMQ's powerful routing is one of its killer features. Other messaging systems are based on topics where messages go into a topic and out of a topic. Message ordering across topics is not possible.

RabbitMQ has a different model. Publishers and consumers are decoupled so that any consumer can receive any combination of events in temporal order. Publishers simply name an exchange, add some optional meta-data and no more. This flexibility creates evolutionary architectures that are easy to change.

## Messages

A publisher sends a message payload, such as a JSON document, alongwith:

- an exchange name
- an optional routing key (a string value)
- message properties
- message headers

The channel process on the broker routes the message to queues based on the type of exchange and any queue bindings that exist.

> Remember that exchanges and bindings are meta-data, they consistute the logical routing. Under the hood, messages flow from publisher channel to queue to consumer channel.

## Exchange Types

There are five standard exchange types:

- Default exchange (for point-to-point messaging)
- Fanout (broadcast)
- Topic (routing based on wildcard matching of routing key)
- Direct (routing based on exact match of routing key)
- Headers (routing based on message headers)

There are more exchange types that are covered in the Advanced Routing page.

> The topic, direct and headers exchange can be thought of as filters. Every queue binding is evaluated to see if the message should be routed to that queue or filtered out.

### Default Exchange

When no exchange name is given, the assumed exchange is the amq.default exchange. The message is routed to a queue that matches the routing key. This is the only exchange that gives the publisher the power to choose the destination queue.

For example, the eCommerce site sends a command to the Accounts service to create an account.

![Default exchange](/img/docs/exchange-default.png)

### Fanout exchange

Use this exchange when you want multiple queues to receive every message without any conditional per-queue filtering. This is classic, simple publish-subscribe.

For example, both the three different services all want to consume all events. Each service has its own queue and each queue is bound to the fanout exchange.

![Fanout exchange](/img/docs/exchange-fanout.png)

### Topic exchange

This exchange will route messages based on wildcard matching of the routing key. A routing key can be comprised of a single word, or multiple words separated by dots, such as order.placed. 

The available wildcards are:

- \* wildcard that spans one word only
- \# wildcard that spans one or more words

For example, we have the following events: 

- order.placed
- order.cancelled
- order.billing.complete
- order.billing.failed
- order.shipping.complete
- order.shipping.failed
- account.created
- account.deleted

We can create bindings with the following binding keys:

- order.placed - exact match
- order.*.complete - all messages related to a completed sub process of orders
- \*.shipping.\* - all messages related to shipping
- order.# - all messages related to orders

This allows for publish-subscribe where each subscribing service filters out the messages it doesn't care about.

![Topic exchange](/img/docs/exchange-topic.png)

### Direct exchange

This exchange is a routing rule like the topic exchange except that it only supports exact match on routing keys. It has slightly higher performance than the topic exchange which would be the reason why you might choose it over the more flexible topic exchange.

![Direct exchange](/img/docs/exchange-direct.png)

### Header exchange

This exchange allows for bindings to filter messages according to headers. A binding can specify one or more headers and their match value. Additionally it specifies whether ALL or ANY of the headers must match.

For example, if we have the custom headers:

- department
- service-level

We could specify a match on one, both or either.

- Match department=sales
- Match both department=sales and service-level=gold
- Match either department=sales or service-level=gold

This exchange is useful when you cannot express all routing within a routing key.

![Headers exchange](/img/docs/exchange-headers.png)