---
id: throttling
title: Publisher Throttling and Resource Alarms
sidebar_label: Publisher Throttling
---

When a cluster node has a [resource alarm](?) in effect, all connections in the cluster that attempt to publish a message will be blocked until all alarms across the cluster clear.

When a connection is blocked, no more data sent by this connection will be read, parsed or processed on the connection. When a connection is unblocked, all client traffic processing resumes.

Compatible AMQP 0-9-1 clients will be notified when they are blocked and unblocked.

Writes on a blocked connection will time out or fail with an I/O write exception.