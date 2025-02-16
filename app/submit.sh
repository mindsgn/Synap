#!/bin/bash
#npm install -g eas-cli
#npx eas build:version:set
npx prettier --write app
npx prettier --write components
npx prettier --write constants
npx prettier --write hooks
npx prettier --write schema
npx prettier --write src
npx prettier --write store

# yarn version:patch
# npx eas build --platform android