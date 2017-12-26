# CONSENSUS

## Start project

### Build (automate)

`make build-docker`


#### For build manually the project you must:

~~~
docker-compose build --no-cache --build-arg HOST_USER_ID=`id -u` --build-arg HOST_GROUP_ID=`id -g` e2e
docker-compose up --build
~~~

### Up docker

`docker-compose up`


## Build assets

`docker-compose run --rm e2e npm run build`

`docker-compose run --rm e2e npm run build-watch`


## Launch tests

The scripts 'test-all', 'test-e2e' and 'test-unit' launch the pretest (script build) and the posttest (script linter).


### Run all the test:

`make test-all`


### Run all test of System (backend)

`docker-compose exec system bundle exec rspec`

or

`make test-system`


### Run all test of e2e

- This command builds the javascript before run the tests:

`docker-compose run --rm e2e npm run test-all`

or

`make test-e2e`


### Run end to end test of e2e:

- This command builds the javascript before run the tests:

`docker-compose run --rm e2e npm run test-e2e`


### Run unit tests of e2e:

- This command builds the javascript before run the tests:
`docker-compose run --rm e2e npm run test-unit`


## ESLint

### Run ESLint

`docker-compose run --rm e2e npm run linter`
