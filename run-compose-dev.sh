#!/bin/bash

# These environment variables are consumed by the docker-compose file.
# We can supply explicit defaults that are checked in with source code 
# since they are only used for local development.
export SECRET_KEY=abc123
export DEBUG=True
export POSTGRES_DB=stocks
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
# export MY_API_KEY=$1  

docker-compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec samurai-stocks-api-1  python /src/manage.py makemigrations 
docker exec samurai-stocks-api-1  python /src/manage.py migrate