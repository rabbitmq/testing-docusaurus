---
id: troubleshooting
title: Publisher Troubleshooting
sidebar_label: Troubleshooting
---

This section covers a number of common issues with publishers, how to identify and address them. Failures in distributed systems come in many shapes and forms, so this list is by no means extensive.

## Connectivity Failures

Like any client, a publisher has to successfully connect and successfully authenticate first.

The number of potential connectivity issues is pretty broad and has a dedicated guide.

## Authentication and Authorisation

Like any client, a publisher can fail to authenticate or don't have the permissions to access their target virtual host, or publish to the target exchange.

Such failures are logged by RabbitMQ as errors.

See the sections on troubleshooting of authentication and authorisation in the Access Control guide.

## Connection Churn

Some applications open a new connection for every message published. This is highly inefficient and not how messaging protocols were designed to be used. Such condition can be detected using connection metrics.

Prefer long lived connections when possible.

## Connection Interruption

Network connections can fail. Some client libraries support automatic connection and topology recovery, others make it easy to implement connection recovery in application code.

When connection is down, no publishes will go through or be internally enqueued (delayed) by clients. In addition, messages that were previously serialised and written to the socket are not guaranteed to reach the target node. It is therefore critically important for publishers that need reliable publishing and data safety to use Publisher Confirms to keep track of what publishes were confirmed by RabbitMQ. Messages that were not confirmed should be considered undelivered after a period of time. Those messages can be republished if it's safe to do so for the application. This is covered in tutorial 7 and the Data Safety section in this guide.

See Recovery from Network Connection Failures for details.

## Routing Issues

A publisher can be successfully connected, authenticated and granted the permissions to publish to an exchange (topic, destination). However, it is possible that such messages would not be routed to any queues or consumers. This can be due to

- A configuration mismatch between applications, e.g. topics used by the publishers and consumers do not match
- Publisher misconfiguration (exchange, topic, routing key are not what they should be)
- For AMQP 0-9-1, missing bindings on the target exchange
- A resource alarm is in effect: see the section below
- Network connection has failed and the client did not recover: see the section above

Inspecting the topology and metrics usually helps narrow the problem quickly. For example, the individual exchange page in management UI can be used to confirm that there is inbound message activity (ingress rate above zero) and what the bindings are.

In the following example the exchange has no bindings, so no messages will be routed anywhere:

An exchange without bindings

Bindings can also be listed using rabbitmq-diagnostics:

```
# note that the implicit default exchange bindings won't
# be listed as of RabbitMQ 3.8

rabbitmq-diagnostics list_bindings --vhost "/"
=> Listing bindings for vhost /...

In the example above the command yields no results.
```

Starting with RabbitMQ 3.8, there's a new metric for unroutable dropped messages:

Unroutable message metrics diagram

In the example above, all published messages are dropped as unroutable (and non-mandatory). See the Unroutable Message Handling section in this guide.

Cluster-wide and connection metrics as well as server logs will help spot a resource alarm in effect.

## Resource Alarms

When a resource alarm is in effect, all connections that publish will be blocked until the alarm clears. Clients can opt-in to receive a notification when they are blocked. Learn more in the Resource Alarms guide.

## Protocol Exceptions

With some protocols, such as AMQP 0-9-1 and STOMP, publishers can run into a condition known as a protocol error (exception). For example, publishing to a non-existent exchange or binding an exchange to an non-existent exchange will result in a channel exception and will render the channel closed. Publishing is not possible on a closed channel. Such events are logged by the RabbitMQ node the publisher was connected to. Failed publishing attempts will also result in client-side exceptions or errors returned, depending on the client library used.

## Concurrent Publishing on a Shared Channel

Concurrent publishing on a shared channel is not supported by client libraries. Learn more in the Concurrency Considerations section.