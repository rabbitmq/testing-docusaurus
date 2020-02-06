---
id: communication-patterns
title: Communication Patterns
---

## Communication Patterns Overview

There are many communications styles to choose from and RabbitMQ supports them all. We'll be teasing apart the following definitions and the impact they have on software architectures:

- Synchronous vs Asynchronous
- RPC vs Durable Messaging
- Point-to-point vs publish-subscribe

> NOTE: Synchronous / asynchronous communication != language threading model (like async/await, futures etc).
>
> They are separate concepts! Read on to understand why.

## Synchronous vs Asynchronous Communication

![Synchronous messaging comic strip](/img/docs/strip-sync-async.png)

### Synchronous

Communication is **synchronous** when Service A makes a request to Service B and waits for a response. Service A might be using async/await or a future so it doesn't block, but that is an internal implementation detail, the fact is that one application is waiting for a response to its request to another service.

HTTP example:

1. Service A makes a call to the HTTP API of Service B. 
2. Service A waits for a response.
3. Service B processes the request and sends an HTTP response to Service A.
4. Service A resumes execution of that thread/continuation.

Messaging example:

1. Service A sends Service B a message.
2. Service A waits for a response message in a reply queue.
3. Service B processes the request and sends a response to the indicated reply queue.
4. Service A consumes the message and resumes execution of that thread/continuation.

Synchronous communications require both services A and B to up and available. Uptime of a service is directly corelated to the uptime of its downstream synchronous communication dependencies.

### Asynchronous

Communication is **asynchronous** when either:

- Service A makes a request to Service B but does not wait around for a response. A response may come back at some indeterminate point in the future and even via a different communications channel.
- Service A makes a request to Service B and does not expect a response at all - fire-and-forget.

HTTP example:

1. Service A makes an HTTP POST call to Service B to process an order. Service B responds immediately with an HTTP 200, confirming it has received the request (but not processed it yet).
2. Service A continues to serve other requests.
2. Service B processes the order.
4. Service B makes call to Service A to confirm the order has been processed.
5. Service A executes some logic, such an notifying the customer that the order has been processed.

> Note that in this example, in a scaled out service, the instance of Service A that made the request may not be the one that processes the response.

Messaging example:

1. Service A sends a ProcessOrder message to the messaging system. Messaging system confirms receipt.
2. Service A continues to serve other requests.
3. Messaging system delivers the message to Service B.
4. Service B processes the order.
5. Service B sends an OrderProcessed to the messaging system. Messaging system confirms receipt.
6. Messaging system delivers the message to Service A.
7. Service A executes some logic, such an notifying the customer that the order has been processed.

> Note that for Service A to work, it does not need Service B to be up. Meanwhile Service B does not need Service A to be up in order to process the order and notify Service A that it has done so. Uptime now is now only coupled to the reliability of the messaging system itself.

## RPC vs Durable Messaging

### Remote Procedure Call (RPC)

RPC is like calling a function, only the call is made over the network. Examples of RPC are:

- HTTP
- TCP

RPC is a synchronous communications style and therefore requires both endpoints to be up. This style of programming is most comfortable for programmers as it mimicks the normal way that a programmer writes code. It also has excellent support in modern programming languages and frameworks with support for multiple data serialization formats:

- JSON
- XML
- Binary serialization like Protocol Buffers, Thrift

RPC requires Service A to know the address of Service B so it can make a call to it. This problem is either solved by a classic configuration system or by a service discovery mechanism such as Consul or service names in Kubernetes.

RPC calls can combine into a wide and/or deep call graph which can lead to some downsides.

![RPC call graph](/img/docs/call-graph.png)

The major downside of RPC is coupling which affects:

- uptime
- failure rate
- latency

**Service uptime** of Service A is tied to the uptime of all its dependencies. 

- Service A -> B, C, D, E all with 95% uptime = 77% uptime for Service A
- Service A -> B, C, D, E all with 99% uptime = 95% uptime for Service A

**Failure rates** of an operation in Service A that requires 5 synchronous calls is multiplied by the failure rates of each downstream operation.

**Latency spikes** are more likely as we increase the number of synchronous calls to downstream dependencies. If all services have the following latency profile: p50=5ms, p99.9=100ms, p99.999=5s

Dependencies | Latency | Every X Operations
--|--|--
1 | 5s | 10000
1 | 100ms | 1000
5 | 5s | 2000
5 | 100ms | 200
10 | 5s | 1000
10 | 100ms | 100
20 | 5s | 500
20 | 100ms | 50

Tail latencies that individually are rare events become more common place as our call graph grows.

Many of these drawbacks may be mitigated and bounded given enough infrastructure, expertise and operational excellence, but at some dollar cost.

### Durable Messaging

Moving to an asynchronous model can avoid many of the issues caused by too heavy a reliance on a synchronous communications architecture.

A messaging system naturally supports asynchronous communication but adds additional benefits:

- Unavailability of downstream services does not necessarily affect the availability of Service A.
- Latency spikes in downstream services does not affect the latency profile of Service A.
- Processing failures don't necessarily affect the operations of Service A.
- The messaging system can absorb traffic spikes that might have caused downstream systems to crash under the load. 

It also brings its own challenges and downsides.

The programming model may be less straight forward as the asynchronous style can require more indirection. Rather than waiting for the order to be processed by Service B, Service A may need to let the caller know the order has been received and notify later when the OrderProcessed event is received.

An operation that is now comprised of multiple independent asynchronous operations can be more hard to troubleshoot/detect when things go wrong and more difficult to resolve. But there are tools available such as:

- deadletter queues
- poisonous message queues
- message retries

### A mix of both

In all likelihood we shouldn't try to force the usage of only synchronous RPC or asynchronous message passing in our architecture but use a blend of both. 

![A mix of both](/img/docs/mixing-sync-and-async.png)

Authentication is an example of what naturally fits RPC. Sending an email notification is an example of what naturally fits an asynchronous operation. There may be a large gray area in the middle where both are candidates, each with their pros and cons.

## Point-to-point vs Publish-Subscribe

### Point-to-point

Point-to-point communications can be performed in either a synchronous or asynchronous style. What makes point-to-point is that as a single operation there is one service talking to just one other service. Service A knows it wants to talk to Service B and makes a request to it, either directly via a protocol such as HTTP or via messaging system that supports it.

The downsides of point-to-point are the extra coupling it brings, especially if we have multiple services which need to be communicated with to perform an action. For example, to create an order in Service A today we make the following point-to-point communications:

1. Notify Inventory service
2. Notify shipping service
3. Call notification service to send a confirmation email

Tomorrow we add communications to the Customer Care service, the Invoice service, the Marketing Campaign service and each time it means changing the code in Service A.

The usual reasons for point-to-point communications are:

- RPC
- Commands (a service tells another service to do something)

### Publish-Subscribe

Publish-Subscribe is an asynchronous style where the publisher of a message does not know (or generally care) who will consume the message. A single message could be delivered to a single service, 10, 1000 or no services at all. The point is that the publisher simply sends a message and forgets about it. Independently any number of services can subscribe to the messages they care about.

Service A publishes the OrderCreated event, and the following services subscribe to that event:

- Notifications service (so that it can send a confirmation email)
- Inventory service (so that it can update its stock)
- Shipping service (so that is can begin an internal workflow to prepare the order)

When Service A publishes an OrderCreated event, that event automaticvally gets forwarded to all three services. 

Tomorrow when we add three new subscribers, it does not require any code changes to Service A.

![Publish-Subscribe](/img/docs/pub-sub.png)

Publish-subscribe is most often used to broadcast events. An event is simply a fact about something that has happened in the system. Events can cause a chain reaction of activity where more events are emitted and reacted to.