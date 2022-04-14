#!/bin/sh
if [ ! -f .env ]
then
  set -o allexport; source conf-file; set +o allexport
fi

if [ -z ${DATABASE_TUNNELED_HOST+x} ]; then echo "Tunneled host parameter not set"; exit 1; fi;
if [ -z ${DATABASE_PORT+x} ]; then echo "Database Port parameter not set"; exit 1; fi;
if [ -z ${DATABASE_USERNAME+x} ]; then echo "Database Username parameter not set"; exit 1; fi;
if [ -z ${DATABASE_PASSWORD+x} ]; then echo "Database Password parameter not set"; exit 1; fi;
if [ -z ${DATABASE_NAME+x} ]; then echo "Database Name parameter not set"; exit 1; fi;
if [ -z ${DATABASE_NAME_DEV+x} ]; then echo "Database Dev Name parameter not set"; exit 1; fi;
if [ -z ${AWS_KEYFILE_PATH+x} ]; then echo "Keyfile Path parameter not set"; exit 1; fi;
if [ -z ${AWS_INSTANCE_IP+x} ]; then echo "Instance IP parameter not set"; exit 1; fi;

PGPASSWORD=$DATABASE_PASSWORD;
pg_dump -Fc --dbname="postgresql://$DATABASE_USERNAME:$DATABASE_PASSWORD@localhost:$DATABASE_PORT/$DATABASE_NAME_DEV" | ssh ubuntu@$AWS_INSTANCE_IP -i $AWS_KEYFILE_PATH pg_restore -c --no-owner --no-privileges --dbname='"'postgresql://$DATABASE_USERNAME:$DATABASE_PASSWORD@$DATABASE_TUNNELED_HOST:$DATABASE_PORT/$DATABASE_NAME'"'
# pg_dump -Fc  | pg_restore -c --no-owner --no-privileges -U$DATABASE_USERNAME --role=$DATABASE_USERNAME -h localhost -d $DATABASE_NAME