DOCKERHUB_UNAME=dockerusername

BASE_URL=$1
NEW_VERSION=$2

docker buildx build --platform linux/amd64 --build-arg VITE_BASE_URL=$BASE_URL -t $DOCKERHUB_UNAME/webserver-prod:$NEW_VERSION -f webserver/Dockerfile . --no-cache
docker push $DOCKERHUB_UNAME/webserver-prod:$NEW_VERSION

docker buildx build --platform linux/amd64  -t $DOCKERHUB_UNAME/api-prod:$NEW_VERSION -f backend/Dockerfile ./backend --no-cache
docker push $DOCKERHUB_UNAME/api-prod:$NEW_VERSION