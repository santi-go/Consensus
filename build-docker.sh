#!/bin/bash
docker pull registry.gitlab.com/devscola/consensus-api
docker-compose build --build-arg HOST_USER_ID=`id -u` --build-arg HOST_GROUP_ID=`id -g` node
docker-compose build api
docker-compose build consensus
docker-compose build selenium
