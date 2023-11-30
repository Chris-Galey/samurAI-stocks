#!/bin/bash

# These environment variables are consumed by the docker-compose file.
# We can supply explicit defaults that are checked in with source code 
# since they are only used for local development.
export SECRET_KEY=$1
export DEBUG=True
export POSTGRES_DB=stocks
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export API_FINN_KEY=$2
export API_ALPHA_KEY=$3

docker-compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec samurai-stocks-api-1  python /src/manage.py makemigrations 
docker exec samurai-stocks-api-1  python /src/manage.py migrate