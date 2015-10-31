#!/bin/bash

# Read Last Version
LAST_ID=$(cat REVISION)

# Check if _index.html has changed
if [[ $(git --no-pager diff ${LAST_ID} HEAD _index.html) ]]; then
    gulp copy --production
    gulp addDeploymentTimestamps --production
fi

# Check if src/sass/ has changed
if [[ $(git --no-pager diff ${LAST_ID} HEAD src/sass/) ]]; then
    gulp sass --production
    gulp autoprefix --production
fi

# Check if src/js/ has changed
if [[ $(git --no-pager diff ${LAST_ID} HEAD src/js/) ]]; then
    ./node_modules/.bin/webpack --config webpack-production.config.js
fi

# Check if package.json has changed
#if [[ $(git --no-pager diff ${LAST_ID} HEAD package.json) ]]; then
#    ./node_modules/.bin/webpack --config webpack-production.config.js
#fi

# Write Newest ID
git rev-parse HEAD > REVISION
