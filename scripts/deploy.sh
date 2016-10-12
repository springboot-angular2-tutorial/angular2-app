#!/bin/sh

if [ -z "${ENV}" ]; then
  echo "ENV is required."
  exit 1
fi

# set variables
API_URL="https://backend-${ENV}.hana053.com"
if [ "${ENV}" = "prod" ]; then
  BUCKET_URL="s3://micropost.hana053.com"
else
  BUCKET_URL="s3://micropost-${ENV}.hana053.com"
fi

# build
API_URL=${API_URL} npm run build:prod

# deploy
aws s3 sync --delete --acl public-read dist ${BUCKET_URL}

