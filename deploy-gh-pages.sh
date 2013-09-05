#!/bin/bash

# Build
echo "Building the app ..."
brunch build

# Save it off
cp -R public /tmp/blendsongs
rm -Rf public

# Change branches
git checkout gh-pages

# Commit the build
cp -Rf /tmp/blendsongs/* .
git add .
git commit -a -m "Updating the BlendSongs build"

rm -Rf /tmp/blendsongs

# Push 
git push origin gh-pages

# Checkout master
git checkout step-6
