---
id: publish-message
title: Publish a message
---

Now that RabbitMQ is running, we will publish our first message.

RabbitMQ supports several protocols to publish and consume messages and
client libraries are available for dozen of programming languages and
environments. For this tutorial, we will be using a Python AMQP 0-9-1
client library.

> **TODO**: Write this page.

<!--DOCUSAURUS_CODE_TABS-->

<!--Python-->
```python
#!/usr/bin/env python

# This client uses the Pika, an AMQP 0-9-1 client library.
import pika

# Open a connection, then a channel on that connection.
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

# Declare a queue named "hello".
channel.queue_declare(queue='hello')

# Publish a message using the channel previously opened.
channel.basic_publish(exchange='', routing_key='hello', body='Hello World!')

print(" [x] Sent 'Hello World!'")

# Close the connection, which implicitly closes the channel.
connection.close()
```

<!--Java-->
```java
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.nio.charset.StandardCharsets;

public class Send {
    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        /* Open a connection, then a channel on that connection. */
        try (Connection connection = factory.newConnection();
            Channel channel = connection.createChannel()) {

            /* Declare a queue named "hello". */
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);

            /* Publish a message using the channel previously opened. */
            String message = "Hello World!";
            channel.basicPublish(
              "", QUEUE_NAME, null,
              message.getBytes(StandardCharsets.UTF_8));

            System.out.println(" [x] Sent '" + message + "'");
        }

        /* The connection is closed, as well as the channel, when they
         * go out of scope. */
    }
}
```

<!--.NET-->
```csharp
using System;
using RabbitMQ.Client;
using System.Text;

class Send
{
    public static void Main()
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };
        using(var connection = factory.CreateConnection())
        using(var channel = connection.CreateModel())
        {
            channel.QueueDeclare(
              queue: "hello",
              durable: false,
              exclusive: false,
              autoDelete: false,
              arguments: null);

            string message = "Hello World!";
            var body = Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(
              exchange: "",
              routingKey: "hello",
              basicProperties: null,
              body: body);
            Console.WriteLine(" [x] Sent {0}", message);
        }

        Console.WriteLine(" Press [enter] to exit.");
        Console.ReadLine();
    }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->
