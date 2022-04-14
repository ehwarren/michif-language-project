#!/bin/sh
if [ ! -f .env ]
then
  set -o allexport; source conf-file; set +o allexport
fi

if [ -z ${DATABASE_TUNNELED_HOST+x} ]; then echo "Tunneled host parameter not set"; exit 1; fi;
if [ -z ${DATABASE_PORT+x} ]; then echo "Tunneled host parameter not set"; exit 1; fi;
if [ -z ${DATABASE_USERNAME+x} ]; then echo "Tunneled host parameter not set"; exit 1; fi;
if [ -z ${DATABASE_PASSWORD+x} ]; then echo "Tunneled host parameter not set"; exit 1; fi;
if [ -z ${DATABASE_NAME+x} ]; then echo "Tunneled host parameter not set"; exit 1; fi;
if [ -z ${DATABASE_NAME_DEV+x} ]; then echo "Tunneled host parameter not set"; exit 1; fi;
if [ -z ${AWS_KEYFILE_PATH+x} ]; then echo "Tunneled host parameter not set"; exit 1; fi;
if [ -z ${AWS_INSTANCE_IP+x} ]; then echo "Tunneled host parameter not set"; exit 1; fi;

PGPASSWORD=$DATABASE_PASSWORD;
ssh ubuntu@$AWS_INSTANCE_IP -i $AWS_KEYFILE_PATH pg_dump -Fc --dbname='"'postgresql://$DATABASE_USERNAME:$DATABASE_PASSWORD@$DATABASE_TUNNELED_HOST:$DATABASE_PORT/$DATABASE_NAME'"' | pg_restore -c --no-owner --no-privileges --dbname="postgresql://$DATABASE_USERNAME:$DATABASE_PASSWORD@localhost:$DATABASE_PORT/$DATABASE_NAME_DEV"