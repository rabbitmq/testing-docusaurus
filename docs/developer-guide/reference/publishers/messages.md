---
id: messages
title: Messages
---

## Message Properties

### AMQP 0-9-1

Every delivery combines message metadata and delivery information. Different client libraries use slightly different ways of providing access to those properties. Typically delivery handlers have access to a delivery data structure.

The following properties are delivery and routing details; they are not message properties per se and set by RabbitMQ at routing and delivery time:

| Property | Type | Description |
| -- | -- | -- |
| Delivery tag | Positive integer | Delivery identifier, see Confirms.|
| Redelivered | Boolean | Set to `true` if this message was previously delivered and requeued |
| Exchange | String | Exchange which routed this message |
| Routing key | String | Routing key used by the publisher |
| Consumer tag | String | Consumer (subscription) identifier |

The following are message properties. Most of them are optional. They are set by publishers at the time of publishing:

| Property | Type | Description | Required? |
| -- | -- | -- | -- |
| Delivery mode | Enum (1 or 2) | 2 for "persistent", 1 for "transient". Some client libraries expose this property as a boolean or enum. | Yes |
| Type | String | Application-specific message type, e.g. "orders.created" | No |
| Headers | Map (string => any) | An arbitrary map of headers with string header names | No |
| Content type | String | Content type, e.g. "application/json". Used by applications, not core RabbitMQ | No |
| Content encoding | String | Content encoding, e.g. "gzip". Used by applications, not core RabbitMQ | No |
| Message ID | String | Arbitrary message ID | No |
| Correlation ID | String | Helps correlate requests with responses, see tutorial 6 | No |
| Reply To | String | Carries response queue name, see tutorial 6 | No |
| Expiration | String | Per-message TTL | No |
| Timestamp | Timestamp | Application-provided timestamp | No |
| User ID | String | User ID, validated if set | No |
| App ID | String | Application name | No |

## Message Types

The type property on messages is an arbitrary string that helps applications communicate what kind of message that is. It is set by the publishers at the time of publishing. The value can be any domain-specific string that publishers and consumers agree on.

RabbitMQ does not validate or use this field, it exists for applications and plugins to use and interpret.

Message types in practice naturally fall into groups, a dot-separated naming convention is common (but not required by RabbitMQ or clients), e.g. orders.created or logs.line or profiles.image.changed.

If a consumer gets a delivery of an unknown type it is highly advised to log such events to make troubleshooting easier.

## Content Type and Encoding

The content (MIME media) type and content encoding fields allow publishers communicate how message payload should be deserialized and decoded by consumers.

RabbitMQ does not validate or use these fields, it exists for applications and plugins to use and interpret.

For example, messages with JSON payload should use application/json. If the payload is compressed with the LZ77 (GZip) algorithm, its content encoding should be gzip.

Multiple encodings can be specified by separating them with commas.