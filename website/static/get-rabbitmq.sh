#!/bin/sh
# vim:sw=4:et:

# This is a script to quickly get a running RabbitMQ node as an
# unprivileged user, based on the generic-unix archive.

set -u

RABBITMQ_VERSION=3.8.2

GEN_UNIX_DIR=rabbitmq_server-$RABBITMQ_VERSION
GEN_UNIX_FILE=rabbitmq-server-generic-unix-$RABBITMQ_VERSION.tar.xz
GEN_UNIX_URL=https://github.com/rabbitmq/rabbitmq-server/releases/download/v$RABBITMQ_VERSION/$GEN_UNIX_FILE

usage() {
}

main() {
    downloader --check
    need_cmd mktemp
    need_cmd erl

    local _ansi_escapes_are_valid=false
    if [ -t 2 ]; then
        if [ "${TERM+set}" = 'set' ]; then
            case "$TERM" in
                xterm*|rxvt*|urxvt*|linux*|vt*)
                    _ansi_escapes_are_valid=true
                ;;
            esac
        fi
    fi

    # 1. Create temporary directory (for download & Erlang build)
    local _dir
    _dir="$(mktemp -d 2>/dev/null || ensure mktemp -d -t rabbitmq)"
    local _file="${_dir}/${GEN_UNIX_FILE}"

    # 2. Download RabbitMQ.
    local _url="${GEN_UNIX_URL}"
    if $_ansi_escapes_are_valid; then
        printf "\33[1minfo:\33[0m downloading generic-unix archive\n" 1>&2
    else
        printf '%s\n' 'info: downloading generic-unix archive' 1>&2
    fi

    ensure mkdir -p "$_dir"
    ensure downloader "$_url" "$_file"

    # 3. Unpack RabbitMQ.
    if $_ansi_escapes_are_valid; then
        printf "\033[1minfo:\033[0m unpacking generic-unix archive\n" 1>&2
    else
        printf '%s\n' 'info: unpacking generic-unix archive' 1>&2
    fi
    cd "$_dir"
    tar xf "$_file"

    # 4. Check RabbitMQ CLI can run.
    if $_ansi_escapes_are_valid; then
        printf "\033[1minfo:\033[0m checking CLI\n" 1>&2
    else
        printf '%s\n' 'info: checking CLI' 1>&2
    fi
    local _rmqdir="${_dir}/$GEN_UNIX_DIR"
    ensure "$_rmqdir"/sbin/rabbitmqctl help >/dev/null

    # 5. Display instructions to start RabbitMQ.
    if $_ansi_escapes_are_valid; then
        printf "\n\033[1;32mRabbitMQ ${RABBITMQ_VERSION} is ready to run!\033[0m\n" 1>&2
    else
        printf "\nRabbitMQ ${RABBITMQ_VERSION} is ready to run!\n" 1>&2
    fi

    cat <<EOF

To start it:
  $_rmqdir/sbin/rabbitmq-server

Log files will be in:
  $_rmqdir/var/log/rabbitmq

Configuration is in:
  $_rmqdir/etc/rabbitmq

CLI is in:
  $_rmqdir/sbin
EOF
}

# --------------------------------------------------------------------
# Code taken from Rustup installeri script.
# See:
#   https://www.rust-lang.org/learn/get-started
#   https://sh.rustup.rs.
# --------------------------------------------------------------------

say() {
    printf 'get-rabbitmq: %s\n' "$1"
}

err() {
    say "$1" >&2
    exit 1
}

need_cmd() {
    if ! check_cmd "$1"; then
        err "need '$1' (command not found)"
    fi
}

check_cmd() {
    command -v "$1" > /dev/null 2>&1
}

# Run a command that should never fail. If the command fails execution
# will immediately terminate with an error showing the failing
# command.
ensure() {
    if ! "$@"; then err "command failed: $*"; fi
}

# This wraps curl or wget. Try curl first, if not installed,
# use wget instead.
downloader() {
    local _dld
    if check_cmd curl; then
        _dld=curl
    elif check_cmd wget; then
        _dld=wget
    elif check_cmd fetch; then
        _dld=fetch
    else
        _dld='curl, wget or fetch' # to be used in error message of need_cmd
    fi

    if [ "$1" = --check ]; then
        need_cmd "$_dld"
    elif [ "$_dld" = curl ]; then
        if ! check_help_for curl --proto --tlsv1.2; then
            echo "Warning: Not forcing TLS v1.2, this is potentially less secure"
            curl --silent --show-error --fail --location "$1" --output "$2"
        else
            curl --proto '=https' --tlsv1.2 --silent --show-error --fail --location "$1" --output "$2"
        fi
    elif [ "$_dld" = wget ]; then
        if ! check_help_for wget --https-only --secure-protocol; then
            echo "Warning: Not forcing TLS v1.2, this is potentially less secure"
            wget "$1" -O "$2"
        else
            wget --https-only --secure-protocol=TLSv1_2 "$1" -O "$2"
        fi
    elif [ "$_dld" = fetch ]; then
        fetch -o "$2" "$1"
    else
        err "Unknown downloader"   # should not reach here
    fi
}

check_help_for() {
    local _cmd
    local _arg
    local _ok
    _cmd="$1"
    _ok="y"
    shift

    # If we're running on OS-X, older than 10.13, then we always
    # fail to find these options to force fallback
    if check_cmd sw_vers; then
        if [ "$(sw_vers -productVersion | cut -d. -f2)" -lt 13 ]; then
            # Older than 10.13
            echo "Warning: Detected OS X platform older than 10.13"
            _ok="n"
        fi
    fi

    for _arg in "$@"; do
        if ! "$_cmd" --help | grep -q -- "$_arg"; then
            _ok="n"
        fi
    done

    test "$_ok" = "y"
}

main "$@" || exit 1
