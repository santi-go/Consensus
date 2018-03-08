# CONSENSUS

## Start project

### Up docker

`docker-compose up --build`

### Build last consensus-api image

`docker-compose build --no-cache api`

## Launch tests

The scripts 'test-all', 'test-e2e' and 'test-unit' launch the pretest (script build).

### Run all tests:

`docker-compose run --rm consensus npm run test-all`


### Run end to end tests:

`docker-compose run --rm consensus npm run test-e2e`


### Run unit tests:

`docker-compose run --rm consensus npm run test-unit`


## ESLint

### Run ESLint

`docker-compose run --rm consensus npm run linter`


### Automate fix ESLint warnings

`docker-compose run --rm consensus npm run linter-fix`


## Build public folder

### Launch build one time

`docker-compose run --rm consensus npm run build`


### Launch build watching changes

`docker-compose run --rm consensus npm run build-watch`


### Launch build for deploy to Heroku

`docker-compose run --rm consensus npm run build-deploy`


# License

Copyright 2018 Devscola

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
