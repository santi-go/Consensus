#!/bin/bash
cd ..
docker-compose build --build-arg HOST_USER_ID=`id -u` --build-arg HOST_GROUP_ID=`id -g` node
docker-compose build consensus
docker-compose build selenium
