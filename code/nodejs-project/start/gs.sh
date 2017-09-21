#!/bin/sh

apt-get update

echo 'TECHIO> open -p 8080 /home'

while :
do
  if [ ! -f result.txt ]; then
  sleep 1s
  else
     cat result.txt
     exit 0
  fi
done
