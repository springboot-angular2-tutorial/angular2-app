#!/bin/sh

credentials=$(aws sts assume-role --role-arn ${PROD_ROLE_ARN} --role-session-name travisci)

export AWS_ACCESS_KEY_ID=$(echo ${credentials} | jq --raw-output .Credentials.AccessKeyId)
export AWS_SECRET_ACCESS_KEY=$(echo ${credentials} | jq --raw-output .Credentials.SecretAccessKey)
export AWS_SESSION_TOKEN=$(echo ${credentials} | jq --raw-output .Credentials.SessionToken)

unset credentials