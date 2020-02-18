---
id: erlang
title: Erlang/OTP
---

RabbitMQ relies on the Erlang/OTP runtime to run. A specific version of
RabbitMQ will be able to run on a range of Erlang/OTP versions. This
page documents that range for each version of RabbitMQ.

## Current requirements

As of **RabbitMQ 3.7.19+**, the requirements are:

<div class="erlang-requirements"></div>

* ### Minimum
  21.3
* ### Maximum
  22.x

## Installing Erlang/OTP

### From a package or installer

Please refer to the the install guide of RabbitMQ for your environment,
referenced in the left sidebar: it explains how to install Erlang/OTP.

### From source (Unix-like only)

The easiest way to compile and install Erlang/OTP from source as an
unprivileged user is to use [kerl].

Here is a quick overview of its usage:

1.  Fetch the `kerl` CLI and make it executable:
    ```sh
    wget https://raw.githubusercontent.com/kerl/kerl/master/kerl
    chmod a+x kerl
    ```

2.  Build a specific version of Erlang:
    ```sh
    ./kerl build 22.2 22.2
    ```

3.  Install Erlang/OTP:
    ```sh
    ./kerl install 22.2 ~/kerl/22.2
    ```

4.  Add `~/kerl/$erlang_version` to your `$PATH`.

For more details, please read [kerl documentation].

[kerl]: https://github.com/kerl/kerl/
[kerl documentation]: https://github.com/kerl/kerl/blob/master/README.md

## Compatibility matrix

| RabbitMQ version | Min. required Erlang/OTP | Max. supported Erlang/OTP |
|------------------|--------------------------|---------------------------|
| 3.8.2  | 21.3 | 22.x |
| 3.8.1  | 21.3 | 22.x |
| 3.8.0  | 21.3 | 22.x |
| 3.7.24 | 21.3 | 22.x |
| 3.7.23 | 21.3 | 22.x |
| 3.7.22 | 21.3 | 22.x |
| 3.7.21 | 21.3 | 22.x |
| 3.7.20 | 21.3 | 22.x |
| 3.7.19 | **21.3** | 22.x |
| 3.7.18 | 20.3 | 22.x |
| 3.7.17 | 20.3 | 22.x |
| 3.7.16 | 20.3 | 22.x |
| 3.7.15 | 20.3 | **22.x** |
| 3.7.14 | 20.3 | 21.3.x |
| 3.7.13 | 20.3 | 21.3.x |
| 3.7.12 | 20.3 | 21.3.x |
| 3.7.11 | **20.3** | **21.3.x** |
| 3.7.10 | 19.3 | 21.x |
| 3.7.9 | 19.3 | 21.x |
| 3.7.8 | 19.3 | 21.x |
| 3.7.7 | 19.3 | **21.x** |
| 3.7.6 | 19.3 | 20.3.x |
| 3.7.5 | 19.3 | 20.3.x |
| 3.7.4 | 19.3 | 20.3.x |
| 3.7.3 | 19.3 | 20.3.x |
| 3.7.2 | 19.3 | 20.3.x |
| 3.7.1 | 19.3 | 20.3.x |
| 3.7.0 | 19.3 | 20.3.x |

## Support Erlang/OTP versions policy

[Starting in January 2019][erlang-support-policy-ann], RabbitMQ supports
two most recent Erlang/OTP release series.

When a new Erlang/OTP release series is published, support for up to
three release series is provided for a few months:
*   to allow RabbitMQ to stabilize on the new release, and
*   for end users to upgrade their copy of Erlang if they are using the
    minimum required version.

[erlang-support-policy-ann]: https://groups.google.com/d/msg/rabbitmq-users/G4UJ9zbIYHs/qCeyjkjyCQAJ
