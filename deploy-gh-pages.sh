#/bin/bash

# Build
echo "Building BlendSongs..."
brunch build

# Save it to a safe location
cp -R public /tmp/blendsongs
rm -rf public

# Change branches
git checkout gh-pages

# Copy it in
cp -Rf /tmp/blendsongs/* .
git add .
git commit -a -m 'Updating the BlendSongs build'

rm -rf /tmp/blendsongs

# Push
git push origin gh-pages

# Checkout master
git checkout master
