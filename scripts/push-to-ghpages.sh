#!/bin/sh

rm -rf out || exit 0;
NODE_ENV=production npm run build
cp -rf __build__ out

(
cd out
git init
git config user.name "Travis-CI"
git config user.email "travis@example.com"
git add .
git commit -m "Deployed to Github Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)

