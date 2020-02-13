---
id: start-rabbitmq
title: Start RabbitMQ
---

This series of Getting Started steps considers that you already
[installed RabbitMQ](/get-rabbitmq).

The very first thing will be to start RabbitMQ. Once this is done, we
will:
1.  use its CLI (command line interface) to verify it started
    successfully and
2.  ensure we can communicate with it.

## Starting the broker

The way to do it really depends on the method you used to install it.
This article will give a few common examples. For more informations,
please read the documentation of your package manager or deployment
tool. It is even possible that RabbitMQ was started for you already.

### If you use the generic-unix package

Starting RabbitMQ is as simple as running the rabbitmq-server(8) script,
located in `sbin`, in the directory created by decompressing the
generic-unix archive:

```sh
/path/to/rabbitmq_server-$version/sbin/rabbitmq-server
```

This command will display the following banner in the terminal:
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

  Logs: /tmp/rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini.log
        /tmp/rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini_upgrade.log

  Config file(s): (none)

  Starting broker... completed with 0 plugins.
```

### On most Unix-like systems with a package manager

The package probably installed RabbitMQ as a service. Therefore, use the
tool on your system to start the corresponding service:

* On Linux distributions based on systemd:

    ```sh
    systemctl start rabbitmq-server
    ```

* On Linux distributions based on SysV init scripts:

    ```sh
    service rabbitmq-server start
    ```

* On FreeBSD:

    ```sh
    service rabbitmq start
    ```

### On Microsoft Windows

RabbitMQ is installed as a service which is started automatically. There
is nothing to do in particular.

## Checking the broker is running

### Using the command line interface

Now that RabbitMQ is supposedly running, you can use the CLI to query
its status:

```sh
rabbitmqctl status
```

This status command is quite verbose. Here is an example based on the
generic-unix-based RabbitMQ started earlier:
```text
Status of node rabbit@cassini ...
Runtime

OS PID: 19392
OS: FreeBSD
Uptime (seconds): 16
RabbitMQ version: 3.8.2
Node name: rabbit@cassini
Erlang configuration: Erlang/OTP 21 [erts-10.3.5.9] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:128] [hipe] [dtrace]
Erlang processes: 271 used, 1048576 limit
Scheduler run queue: 1
Cluster heartbeat timeout (net_ticktime): 60

Plugins

Enabled plugin file: /tmp/rabbitmq_server-3.8.2/etc/rabbitmq/enabled_plugins
Enabled plugins:


Data directory

Node data directory: /tmp/rabbitmq_server-3.8.2/var/lib/rabbitmq/mnesia/rabbit@cassini

Config files


Log file(s)

 * /tmp/rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini.log
 * /tmp/rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini_upgrade.log

(...)

Listeners

Interface: [::], port: 25672, protocol: clustering, purpose: inter-node and CLI tool communication
Interface: [::], port: 5672, protocol: amqp, purpose: AMQP 0-9-1 and AMQP 1.0
Interface: 0.0.0.0, port: 5672, protocol: amqp, purpose: AMQP 0-9-1 and AMQP 1.0
```

There are several CLI tools provided with RabbitMQ to interact with it:
* rabbitmqctl(8)
* rabbitmq-diagnostics(8)
* rabbitmq-plugins(8)
* rabbitmq-queues(8)
* rabbitmq-upgrade(8)

We will use some of them later in this guide.

### Using log files

The RabbitMQ log files location depends again on how you installed it.
The exact location is reported by `rabbitmqctl status` as seen above.

Common locations are:
* generic-unix package: `/path/to/rabbitmq_server-$version/var/log/rabbitmq`
* Linux/FreeBSD packages: `/var/log/rabbitmq`
* Microsoft Windows: `%APPDATA%\RabbitMQ\log`

Here is an example of the log file based on the generic-unix-based
RabbitMQ started earlier:

```sh
cat /tmp/rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini.log
```

```text
2020-02-13 20:17:38.236 [info] <0.259.0>
 Starting RabbitMQ 3.8.2 on Erlang 21.3.8.13
 Copyright (c) 2007-2019 Pivotal Software, Inc.
 Licensed under the MPL 1.1. Website: https://rabbitmq.com
2020-02-13 20:17:38.237 [info] <0.259.0>
 node           : rabbit@cassini
 home dir       : /home/dumbbell
 config file(s) : (none)
 cookie hash    : JD0UL5ltCvNhzE8sE1hEnw==
 log(s)         : /tmp/rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini.log
                : /tmp/rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini_upgrade.log
 database dir   : /tmp/rabbitmq_server-3.8.2/var/lib/rabbitmq/mnesia/rabbit@cassini
(...)
2020-02-13 20:17:38.438 [info] <0.595.0> started TCP listener on [::]:5672
2020-02-13 20:17:38.438 [info] <0.610.0> started TCP listener on 0.0.0.0:5672
2020-02-13 20:17:38.438 [info] <0.259.0> Running boot step cluster_name defined by app rabbit
2020-02-13 20:17:38.438 [info] <0.259.0> Running boot step direct_client defined by app rabbit
2020-02-13 20:17:38.438 [notice] <0.104.0> Changed loghwm of /tmp/rabbitmq_server-3.8.2/var/log/rabbitmq/rabbit@cassini.log to 50
2020-02-13 20:17:38.519 [info] <0.8.0> Server startup complete; 0 plugins started.
```
