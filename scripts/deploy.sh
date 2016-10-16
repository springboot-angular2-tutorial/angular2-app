#!/bin/sh

if [ -z "${ENV}" ]; then
  echo "ENV is required."
  exit 1
fi

# switch role if production
if [ "${ENV}" = "prod" ]; then
  source scripts/switch-production-role.sh
fi

# set variables
CDN_URL="https://cdn-${ENV}.hana053.com"
S3_CDN_URL="s3://cdn-${ENV}.hana053.com"
if [ "${ENV}" = "prod" ]; then
  MAIN_URL="https://micropost.hana053.com"
else
  MAIN_URL="https://micropost-${ENV}.hana053.com"
fi

# build
PUBLIC_PATH=${CDN_URL} npm run build:prod

# deploy
aws s3 sync --delete --acl public-read dist ${S3_CDN_URL}

# invalidate index.html
curl -I "${MAIN_URL}/index.html" -H 'Cache-Purge: 1'
