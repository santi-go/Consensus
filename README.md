# CONSENSUS

## Start project

### Build for most users

`docker-compose build`


### Up docker

`docker-compose up`


### Build (script) for user with specific UID

`sh build-docker.sh`


#### The content of script:

~~~
docker-compose build --build-arg HOST_USER_ID=`id -u` --build-arg HOST_GROUP_ID=`id -g` node
docker-compose build consensus
docker-compose build selenium
~~~


## Build assets

`docker-compose run --rm node npm run build`

`docker-compose run --rm node npm run build-watch`


## Launch tests

The scripts 'test-all', 'test-e2e' and 'test-unit' launch the pretest (script build) and the posttest (script linter).


### Run all test of e2e

`docker-compose run --rm node npm run test-all -s`


### Run end to end test of e2e:

`docker-compose run --rm node npm run test-e2e -s`


### Run unit tests of e2e:

`docker-compose run --rm node npm run test-unit -s`


## ESLint

### Run ESLint

`docker-compose run --rm node npm run linter -s`
