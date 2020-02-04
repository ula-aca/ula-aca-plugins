#!/bin/sh

# ******************************************************************************
# This releases all changed packages
# Don't use this script yourself. It is only to be used by the ci job
# ******************************************************************************

# Exit the script on any command with non 0 return code
# We assume that all the commands in the pipeline set their return code
# properly and that we do not need to validate that the output is correct
set -e

exit_no_changes() {
    echo 'No changed packages, skipping release'
    exit 0
}

# If there are no changes, we will exit with a success code.
# It is not possible yet to mark a gitlab ci job as skipped.
# See: https://gitlab.com/gitlab-org/gitlab-ce/issues/18041
npx lerna changed || exit_no_changes

# set up Git
git checkout master
git config --global user.email "github-actions[bot]@users.noreply.github.com"
git config --global user.name "@github-actions[bot]"
git remote set-url origin https://${GH_ACTOR}:${GH_TOKEN}@github.com/ula-aca/ula-aca-plugins.git
      
# Publish to NPM, Create Gitlab release, Push to Git
npm run release -- --create-release github