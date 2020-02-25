---
id: precompiled
title: Run from precompiled binaries
sidebar_label: Precompiled binaries
---

We provide precompiled binaries for both Unix-like systems and Microsoft
Windows.

## Get Erlang/OTP

RabbitMQ relies on the Erlang/OTP runtime to run.

Please refer to the [Erlang/OTP requirements and install guide](erlang)
to learn about:
* what version of Erlang/OTP to get
* how to install it

## Get and run RabbitMQ

Once the appropriate version of Erlang/OTP is available on your
operating system, it is very easy to run RabbitMQ as an unprivileged
user to play with it.

### Unix-like systems

1.  Download the [`generic-unix` archive]:
    ```sh
    wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server-generic-unix-3.8.2.tar.xz
    ```

2.  Unpack the archive:
    ```sh
    tar xf rabbitmq-server-generic-unix-3.8.2.tar.xz
    ```

3.  Start RabbitMQ:
    ```sh
    ./rabbitmq_server-3.8.2/sbin/rabbitmq-server
    ```

    RabbitMQ will print the following banner:
    ```text

      ##  ##      RabbitMQ 3.8.2
      ##  ##
      ##########  Copyright (c) 2007-2019 Pivotal Software, Inc.
      ######  ##
      ##########  Licensed under the MPL 1.1. Website: https://rabbitmq.com

      Doc guides: https://rabbitmq.com/documentation.html
      Support:    https://rabbitmq.com/contact.html
      Tutorials:  https://rabbitmq.com/getstarted.html
      Monitoring: https://rabbitmq.com/monitoring.html

      Logs: .../rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini.log
            .../rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini_upgrade.log

      Config file(s): (none)

      Starting broker... completed with 0 plugins.
    ```

[`generic-unix` archive]: https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server-generic-unix-3.8.2.tar.xz

### Microsoft Windows

> **TODO**: Write this section.
