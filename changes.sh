#!/bin/sh

# Check if _index.html has changed
if [[ $(git --no-pager diff HEAD^ HEAD _index.html) ]]; then
    gulp copy --production
    gulp addDeploymentTimestamps --production
fi

# Check if src/sass/ has changed
if [[ $(git --no-pager diff HEAD^ HEAD src/sass/) ]]; then
    gulp sass --production
    gulp autoprefix --production
fi

# Check if src/js/ has changed
if [[ $(git --no-pager diff HEAD^ HEAD src/js/) ]]; then
    ./node_modules/.bin/webpack --config webpack-production.config.js --entry=app
fi

# Check if package.json has changed
if [[ $(git --no-pager diff HEAD^ HEAD package.json) ]]; then
    ./node_modules/.bin/webpack --config webpack-production.config.js --entry=vendor
fi
