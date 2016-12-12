#!/usr/bin/env bash

set -u

if [ ! -v AWS_SESSION_TOKEN ]; then
  source ./scripts/switch-role.sh
fi

readonly DOCKER_NAME=micropost/frontend
readonly AWS_ACCOUNT_NUMBER=$(aws sts get-caller-identity --output text --query 'Account')

# Build
PUBLIC_PATH="https://cdn-${ENV}.hana053.com" yarn run build

# Ensure docker repository exists
aws ecr describe-repositories --repository-names ${DOCKER_NAME} || \
  aws ecr create-repository --repository-name ${DOCKER_NAME}

# Push to docker repository
eval $(aws ecr get-login)
docker build -t ${DOCKER_NAME} .
docker tag ${DOCKER_NAME}:latest ${AWS_ACCOUNT_NUMBER}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${DOCKER_NAME}:latest
docker push ${AWS_ACCOUNT_NUMBER}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${DOCKER_NAME}:latest

# Update service
aws ecs update-service --cluster micropost --service frontend
