#!/usr/bin/env bash

set -u

if [ ! -v AWS_SESSION_TOKEN ]; then
  source ./scripts/switch-role.sh
fi

# set variables
CDN_URL="https://cdn-${ENV}.hana053.com"
S3_CDN_URL="s3://cdn-${ENV}.hana053.com"

# build
PUBLIC_PATH=${CDN_URL} yarn run build:prod

# create codedeploy archive
tar czvf dist/codedeploy.tgz -C codedeploy .

# deploy
aws s3 sync --delete --acl public-read dist ${S3_CDN_URL}

# invalidate cached index.html by using codedeploy
aws deploy create-deployment --application-name micropost \
  --s3-location bucket=cdn-${ENV}.hana053.com,key=codedeploy.tgz,bundleType=tgz \
  --deployment-group-name web-frontend
