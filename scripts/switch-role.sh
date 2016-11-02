#!/usr/bin/env bash

# Parse variable such as ROLE_ARN_stg, ROLE_ARN_prod and etc.
ROLE_ARN=$(eval echo '$ROLE_ARN_'${ENV})

CREDENTIALS=$(aws sts assume-role --role-arn ${ROLE_ARN} --role-session-name travisci)

export AWS_ACCESS_KEY_ID=$(echo ${CREDENTIALS} | jq --raw-output .Credentials.AccessKeyId)
export AWS_SECRET_ACCESS_KEY=$(echo ${CREDENTIALS} | jq --raw-output .Credentials.SecretAccessKey)
export AWS_SESSION_TOKEN=$(echo ${CREDENTIALS} | jq --raw-output .Credentials.SessionToken)
