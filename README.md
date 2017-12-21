# CONSENSUS

## Start project

### Up:

`docker-compose up --build`


## Build assets

`docker-compose run --rm e2e npm run build`

`docker-compose run --rm e2e npm run build-watch`


## Launch tests

The scripts 'test-all', 'test-e2e' and 'test-unit' launch the pretest (script build) and the posttest (script linter).


### Run all the test:

`make test-all`

### Run all the system test  (backend)

`docker-compose exec system bundle exec rspec`

### Run all the e2e test

- This command builds the javascript before run the tests:
`docker-compose run --rm e2e npm run test-all`

### Run e2e end to end test:

- This command builds the javascript before run the tests:
`docker-compose run --rm e2e npm run test-e2e`

### Run e2e unit tests:

- This command builds the javascript before run the tests:
`docker-compose run --rm e2e npm run test-unit`


## ESLint

### Run ESLint

`docker-compose run --rm e2e npm run linter`


## Backend

### Run app.rb

`docker-compose run --rm system rake`
