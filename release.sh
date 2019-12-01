#!/usr/bin/env sh
set -e
echo "Enter release version:"
read VERSION
read -p 'Releasing $VERSION - are you sure?(y/n)' -n 1 -read
echo #(optional) move to a new line
if [[ $REPLY =~ ^[Yy] ]]
then
  echo 'Releasing $VERSION ...'

  # commit 
  get add -A 

  get commit -m "[build] $VERSION"
  npm version $VERSION --message "[build] $VERSION"
  get push origin master

  # npublish
  npm publish
fi
