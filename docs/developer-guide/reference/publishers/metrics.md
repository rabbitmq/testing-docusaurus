---
id: metrics
title: Metrics
---

Metric collection and monitoring are as important for publishers as they are for any other application or component in an application. Several metrics collected by RabbitMQ are of particular interest when it comes to publishers:

- Outgoing message rate
- Publisher confirmation rate
- Connection churn rate
- Channel churn rate
- Unroutable dropped message rate
- Unroutable returned message rate

The publishing and confirmation rates are mostly self-explanatory. The churn rates are so important because they help detect applications that do not use connections or channels optimally and thus offer sub-optimal publishing rates and waste resources.

Unroutable message rates can help detect applications that publish messages that cannot be routed to any queue. For example, this may suggest a misconfiguration.

Client libraries may also collect metrics. RabbitMQ Java client is one example. These metrics can provide insight into application-specific architecture (e.g. what publishing component publishes unrooutable messages) that RabbitMQ nodes cannot infer.