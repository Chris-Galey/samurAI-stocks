#!/bin/bash
export SECRET_KEY=abc123
export DEBUG=True
export POSTGRES_DB=stocks
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export API_FINN_KEY=$1
export API_ALPHA_KEY=$2
docker-compose -f docker-compose.local.yml up -d --build
sleep 10 
docker exec samurai-stocks-api-1  python /src/manage.py makemigrations 
docker exec samurai-stocks-api-1  python /src/manage.py migrate