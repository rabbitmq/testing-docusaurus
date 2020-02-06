---
id: high-availability
title: High Availability
---

High availability is the ability of a system to handle failures and remain available/functioning. RabbitMQ must be run as a cluster with the use of replicated queues to achieve true high availability.

## Replicated Queues

RabbitMQ has two types of replicated queue:

- Quorum queues
- Classic HA queues

Today we recommend the usage of Quorum queues as they have stronger durability and availability than Classic HA queues. 

Quorum queues use the battle-tested Raft protocol for message replication across multiple brokers. In a three node cluster, a single broker can be lost without message loss or unavailability. In a five node cluster up to two brokers can be lost.

## Redundant storage + Automated Deployment

Redundant storage offers data safety but not high availability by itself. However, in the event of a broker loss it would be possible to deploy a new broker and attach the storage device. When fully automated this could result in only minutes of downtime once the incident has been detected.