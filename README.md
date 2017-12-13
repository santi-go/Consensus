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

The scripts 'test-all', 'test-e2e' and 'test-unit' launch the pretest (script build) and the posttest (script linter).


### Run all the test:

- This command builds the javascript before run the tests:
`docker-compose run --rm e2e npm run test-all`

### Run end to end test:

- This command builds the javascript before run the tests:
`docker-compose run --rm e2e npm run test-e2e`

### Run unit tests:

- This command builds the javascript before run the tests:
`docker-compose run --rm e2e npm run test-unit`


## ESLint

### Run ESLint

`docker-compose run --rm e2e npm run linter`
