#!/bin/sh

set -o errexit
set -o pipefail
set -o nounset


python /app/manage.py migrate
python /app/manage.py collectstatic --noinput
daphne config.asgi:application -b 0.0.0.0 -p 5000
