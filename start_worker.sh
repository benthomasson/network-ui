#!/bin/bash -ex
export REDIS_URL=redis://localhost:6379/0
export USE_DOCKER=no

export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432
export POSTGRES_DB=network_ui
export POSTGRES_USER=debug
export POSTGRES_PASSWORD=debug
export DATABASE_URL="postgres://${POSTGRES_USER}:{$POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"

./manage.py runworker ansible

