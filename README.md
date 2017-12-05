# CONSENSUS

## Start project

### Build:

docker-compose build


### Up:

docker-compose up


### Up&build:

docker-compose up --build


## Build assets

docker-compose run --rm e2e npm run build

docker-compose run --rm e2e npm run build-watch


## Launch tests

### Run end to end test:

docker-compose run --rm e2e npm run test


### Run unit tests:

docker-compose run --rm e2e npm run unit-test
