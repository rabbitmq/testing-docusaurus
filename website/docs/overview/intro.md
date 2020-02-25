---
id: intro
title: Introduction to RabbitMQ
---

## Messaging that just works

RabbitMQ is an open source messaging system that supports a variety of messaging use cases including:

- Microservice asynchronous communication
- Publish/Subscribe
- Point-to-point communication
- Work queues
- Request/Reply mechanism without the need for service discovery
- IOT communications via MQTT
- Web frontend-backend communication via STOMP
- High availability

See our [Concepts](concepts/index.md) page to learn more about general messaging patterns and the RabbitMQ building blocks that enable you to build the messaging architecture that you need.

## Why RabbitMQ?

There are many choices out there, so what makes RabbitMQ a great choice?

### Simple to deploy, simple to run.

Unlike many other messaging systems, RabbitMQ is a single, integrated system, without dependencies on external consensus services such as Etcd or Apache ZooKeeper. It is not complex to operate and does not require a dedicated operations teamto run it.

It deploys on all major Linux distributions, Windows and has first class Kubernetes support.

### Supports many protocols, many languages and use cases

RabbitMQ natively supports AMQP 0.9.1 but also supports:

- AMQP 1.0
- MQTT
- STOMP

It has client libraries in most programming languages.

### Integrated UI out-of-the-box and integrations with Grafana and Prometheus

RabbitMQ has a web user interface and API out-of-the-box simplying usage. You don't need to rely on third party web consoles or be forced to use the CLI tooling.

### Extremely flexible, supporting architectures that evolve

They call RabbitMQ the Swiss army knife of messaging. It supports many use cases meaning you don't need to deploy multiple messaging solutions to support your architecture. As your architecture changes, RabbitMQ is flexible enough to support your changing needs.

### Battle tested

RabbitMQ has been used in production for over 10 years and is one of the most widely deployed messaging systems in the world today.

### Open Source

RabbitMQ is open source and we welcome contributions. Please check out our [Be a Contributor](contribution/index.md) page to learn more.

We also have various ways for the community to engage:

- [RabbitMQ Users Google Group aka the mailing list](https://groups.google.com/forum/#!forum/rabbitmq-users)
- [GitHub Discussions](https://github.com/rabbitmq/discussions)
- [Slack channel](https://rabbitmq-slack.herokuapp.com/)

### Commercial Support

For those that need it, we offer commericial support and also an enterprise version of RabbitMQ which ships with extra features important for the enterprise.
