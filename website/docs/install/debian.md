---
id: debian
title: Install on Debian and Ubuntu
sidebar_label: Debian
---

## Provide Erlang/OTP

Erlang/OTP packages in the official Debian and Ubuntu repositories are
often too old for RabbitMQ's [Erlang/OTP version requirements](erlang).

There are several providers of recent Erlang/OTP releases. Each one has
its own section.

If you already have Erlang available as a Debian package, you can [skip
to the next section](#install-rabbitmq).

### RabbitMQ repository [recommended]

The RabbitMQ team provides its own Erlang/OTP packages for Debian &
Ubuntu. This is the recommended repository.

#### Configure the repository

1.  Add the repository to the sources list after replacing
    [`$distribution`](#erlangotp-supported-debian-and-ubuntu-distributions)
    and [`$component`](#erlangotp-repository-components-available):
    ```sh
    sudo cat <EOF >/etc/apt/sources.list.d/rabbitmq-erlang.list
    deb http://dl.bintray.com/rabbitmq-erlang/debian $distribution $component
    EOF
    ```
2.  Install `apt-transport-https` to allow apt-get(8) to use the added
    repository:
    ```sh
    sudo apt-get install apt-transport-https
    ```

3.  Add the [PGP key used to sign the repository][PGP signing key]:
    ```sh
    wget -O- https://github.com/rabbitmq/signing-keys/releases/download/2.0/rabbitmq-release-signing-key.asc | \
    sudo apt-key add -
    ```

4.  Refresh the APT package index:
    ```sh
    sudo apt-get update
    ```

### Erlang Solutions

> **TODO**: Write this section

## Install RabbitMQ

1.  Add the repository to the sources list after replacing
    [`$distribution`](#supported-debian-and-ubuntu-distributions)
    and [`$component`](#rabbitmq-repository-components):
    ```sh
    sudo cat <EOF >/etc/apt/sources.list.d/rabbitmq-erlang.list
    deb http://dl.bintray.com/rabbitmq/debian $distribution $component
    EOF
    ```
2.  Install `apt-transport-https` to allow apt-get(8) to use the added
    repository:
    ```sh
    sudo apt-get install apt-transport-https
    ```

3.  Add the [PGP key used to sign the repository][PGP signing key]:
    ```sh
    wget -O- https://github.com/rabbitmq/signing-keys/releases/download/2.0/rabbitmq-release-signing-key.asc | \
    sudo apt-key add -
    ```

4.  Refresh the APT package index:
    ```sh
    sudo apt-get update
    ```

5.  Install the `rabbitmq-server` package:
    ```sh
    sudo apt-get install rabbitmq-server
    ```

## Start RabbitMQ

As per de Debian Policy, RabbitMQ is started automatically when the
package is installed.

Depending on the version of Debian/Ubuntu you use, you can start,
restart and stop it using either SysV init scripts or systemd.

### Start service with systemd

```sh
systemctl start rabbitmq-server
systemctl restart rabbitmq-server
systemctl stop rabbitmq-server
```

### Start service with SysV init script

```sh
service rabbitmq-server start
service rabbitmq-server restart
service rabbitmq-server stop
```

## Supported Debian and Ubuntu distributions

The repository supports several distributions of Debian and Ubuntu:

| Distribution| Value of `$distribution` in the sources.list |
|-----------------------|-----------|
| Debian Jessie (8)     | `jessie`  |
| Debian Stretch (9)    | `stretch` |
| Debian Buster (10)    | `buster`  |
| Debian Sid (unstable) | `buster`  |
| Ubuntu 16.04          | `xenial`  |
| Ubuntu 18.04          | `bionic`  |
| Ubuntu 19.04          | `bionic`  |
| Ubuntu 19.10          | `bionic`  |

## Repository components available

### RabbitMQ repository components

The repository uses components to allow to "pin" to a RabbitMQ release
series without pininng a specific version.

The following components are available:

| Component | What it provides |
|-----------|------------------|
| `main` | All packages |
| `rabbitmq-server` | All `rabbitmq-server` packages |
| `rabbitmq-server-v3.6.x` | All `rabbitmq-server` 3.6.x packages |
| `rabbitmq-server-v3.7.x` | All `rabbitmq-server` 3.7.x packages |
| `rabbitmq-server-v3.8.x` | All `rabbitmq-server` 3.8.x packages |

### Erlang/OTP repository components

The repository uses components to allow to "pin" to an Erlang/OTP
release series without pininng a specific version.

The following components are available:

| Component | What it provides |
|-----------|------------------|
| `main` | All versions of the Erlang/OTP and Elixir packages |
| `erlang` | All versions of the Erlang/OTP packages |
| `erlang-19.x` | All Erlang/OTP 19.x packages |
| `erlang-20.x` | All Erlang/OTP 20.x packages |
| `erlang-21.x` | All Erlang/OTP 21.x packages |
| `erlang-22.x` | All Erlang/OTP 22.x packages |

[PGP signing key]: https://github.com/rabbitmq/signing-keys/releases/download/2.0/rabbitmq-release-signing-key.asc
