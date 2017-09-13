#!/bin/sh

apt-get update

apt-get install -y git nodejs

git config --global http.sslVerify false

git clone https://github.com/seraum/fortressjs

cp -r start-engine fortressjs/content/engine/

cp -r start-server fortressjs/content/srv/

cd fortressjs && nodejs wf.js

echo 'TECHIO> terminal'

while :
do
  if [ ! -f "/tmp/end.txt" ]; then
  sleep 1s
  else
     cat "/tmp/end.txt"
     sleep 3s
     exit 0
  fi
done
