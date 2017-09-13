#!/bin/sh

apt-get update

apt-get install -y git nodejs

git config --global http.sslVerify false

echo 'TECHIO> terminal'

while :
do
  if [ ! -f "fortressjs/wf.js" ]; then
  sleep 1s
  else
     echo "Well done !"
     exit 0
  fi
done
