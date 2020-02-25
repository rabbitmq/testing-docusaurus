---
id: streaming-across-clusters
title: Streaming Across Clusters
---

RabbitMQ offers multiple features for streaming messages between separate instances or clusters. There are multiple usecases for cross-cluster streaming that RabbitMQ support natively.

## Cases for Cross-Cluster Streaming

### Edge computing

RabbitMQ instances or clusters can be deployed to edge locations to provide both low-latency messaging for local systems and a routing backbone that routes or replicates messages to a centralised cluster in a data center.

![](/img/docs/concepts/cross-cluster-streaming-edge.svg)

### Peer-to-Peer Clusters

Peer clusters can route messages to each other to allow for message processing on both sides.

![](/img/docs/concepts/cross-cluster-streaming-peers.svg)

### Hot Standby

Messages can be streamed from an active cluster to a standby cluster so that in the event of a disaster, applications be be switched over to the hot-standby.

### Blue/Green Deployments

Consumers and publishers can be migrated from one cluster to another without message loss by streaming messages from the existing primary cluster to a new cluster that will soon become the primary.

### Consumer Load Distribution

Messages of a single queue can be distributed via streaming across counterpart queues on multiple clusters so that consumption load is spread out.

## Features

### Federation

Federation allows for the streaming of messages across multiple RabbitMQ instances or clusters. It is different to replicated queues (Quorum/Classic HA queues) in that it can link separate clusters across a WAN that would not be viable for a replicated queue. Clusters can be of different Erlang/RabbitMQ versions.

There are two type of federation:

- exchange federation
- queue federation

The two satisfy different use cases but both rely on concept of linking two RabbitMQ clusters together.

#### Upstream and Downstream clusters

Federation involves linking two or more clusters into an upstream-downstream relationship. Messages are published to an upstream cluster and those messages can be routed to local queues on the upstream as normal and additionally be configured to be streamed to the downstream cluster

![](/img/docs/concepts/federation-upstream-downstream.svg)

These upstream-downstream pairings can be combined to form many type of graph (hub and spoke, DAG, ring etc).

![](/img/docs/concepts/federation-upstream-downstream-dag.svg)

#### Exchange Federation

We can perform message routing to a downstream cluster using federated exchanges. 

- Routing option #1 - we want all messages published to exchanges in the upstream, to be routed to the downstream.
- Routing option #2 - we want all messages published to a particular exchange in the upstream, to be routed to the downstream.
- Routing option #3 - we want to route only a subset of messages published to a particular exchange(s) based on things like routing keys and headers.

A federated exchange can be a fanout, topic, direct or header exchange just like a normal exchange and we can express routing logic across clusters in the usual way we do so within a single cluster.

![](/img/docs/concepts/federated-exchange.svg)

The normal usecases are:

- Hub and Spoke pattern. Stream messages from multiple regional clusters to a central cluster where you want to process some particular type of message only or have some central auditing.
- Edge/Data Center pattern. Local RabbitMQ clusters serve local systems in an edge location and benefit from low latency. Those messages are in turn (selectively) streamed to clusters in either regional datacenters or a single global data center, when there is connectivity.
- Peer Clusters pattern. Messages published to two regional clusters and must be processed on both clusters. Each cluster plays the role of upstream and downstream, allowing local consumers to consume both locally published messages and message published to the peer cluster.


#### Queue Federation

Queue federation is not about routing but about distributing messages to be consumed across more than one cluster. It allows us to use the competing consumer pattern on a single queue, but across multiple clusters.

The way it works is that a federated queue is created on the downstream cluster which links it to a queue on the upstream. Messages will be streamed from the upstream queue to the downstream queue as long as there is a consumer on the downstream queue with enough capacity. It is a best effort approach to spread load of a single queue across multiple clusters.

![](/img/docs/concepts/federated-queue.svg)

For example:

- 1,2,3,4,5 arrive at upstream
- 1,2,3 are consumed from the upstream queue by a local consumer
- 4,5 are streamed to the downstream queue
- 6,7,8 arrive at the upstream
- 4,5 are consumed on the downstream queue by a local consumer
- 6,7 are consumed from the upstream queue by a local consumer
- 8 is streamed to the downstream queue
- 8 is consumed from the downstream queue by a local consumer

The normal usecases are:

- distribute consumption workload across multiple clusters
- blue-green deployments where consumers need to be migrated to a new cluster and not process the same message twice.

#### Federation Topologies

We can create federation topologies where one downstream cluster is the upstream of another. We can form Hub and Spoke,  Directed Acyclic Graphs (DAG), rings or whatever you want. Typically, it is recommended to keep federation topologies simple.

### Shovel

Shovels can be used to stream messages from one cluster to another, or one vhost to another. 

A shovel is an Erlang process that will consume messages from an exchange or queue on one cluster, and publish them to an exchange or queue on another cluster. It is basically, a well written consumer/publisher application that is hosted within the cluster and uses RabbitMQ's reliable messaging features to provide an At-Least-Once delivery guarantee of streamed messages.

The shovel processes will start-up when the cluster starts and can survive the loss of a broker, performing fail-over to another broker.

![](/img/docs/concepts/shovel.svg)

It has similarities with Exchange Federation but with some key differences:

- Nomenclature changes from upstream/downstream to source/destination.
- Supports AMQP 1.0. In fact the source could be AMQP 0.9.1 and the destination be AMQP 1.0 or vice-versa.
- Supports different streaming sources/destinations:
  - source exchange -> destination exchange
  - source queue -> destination exchange
  - source exchange -> destination queue
  - source queue -> destination queue
- Can be used to stream messages between vhosts on the same cluster

Often both Exchange Federation and Shovel can be a candidate for the same usecase.