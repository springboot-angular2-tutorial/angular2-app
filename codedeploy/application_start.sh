#!/usr/bin/env bash

# unless nginx has not started yet, exit
curl "http://localhost/index.html" || exit 0

# refresh cache
curl -I "http://localhost/index.html" -H 'Cache-Purge: 1'

