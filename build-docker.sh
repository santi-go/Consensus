#!/bin/bash
docker-compose build --build-arg HOST_USER_ID=`id -u` --build-arg HOST_GROUP_ID=`id -g` e2e
docker-compose build consensus
docker-compose build selenium
