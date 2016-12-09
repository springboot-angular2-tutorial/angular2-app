#!/usr/bin/env bash

set -u

if [ ! -v AWS_SESSION_TOKEN ]; then
  source ./scripts/switch-role.sh
fi

# build
PUBLIC_PATH="https://cdn-${ENV}.hana053.com" yarn run build

# update container
readonly DOCKER_NAME=micropost/frontend
readonly AWS_ACCOUNT_NUMBER=$(aws sts get-caller-identity --output text --query 'Account')
eval $(aws ecr get-login)
docker build -t ${DOCKER_NAME} .
docker tag ${DOCKER_NAME}:latest ${AWS_ACCOUNT_NUMBER}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${DOCKER_NAME}:latest
docker push ${AWS_ACCOUNT_NUMBER}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${DOCKER_NAME}:latest

# notify to deploy
aws sns publish --topic-arn "arn:aws:sns:${AWS_DEFAULT_REGION}:${AWS_ACCOUNT_NUMBER}:frontend_app_updated" \
   --message "${ENV}: ${TRAVIS_COMMIT}"
