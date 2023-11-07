#!/bin/bash


export SECRET_KEY=abc123
export DEBUG=True
export POSTGRES_DB=stocks
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export API_KEY=$1

docker-compose -f docker-compose.local.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 

docker exec samurai-stocks-api-1  python /src/manage.py makemigrations 
docker exec samurai-stocks-api-1  python /src/manage.py migrate