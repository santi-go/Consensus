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

### First install in docker (already created)

Install the 'eslint' tool in the project:

docker-compose run --rm e2e npm install eslint --save-dev
docker-compose run --rm e2e ./node_modules/.bin/eslint --init


### Create a script

Create a new script in package.json:

"eslintest": "eslint --ignore-path .gitignore ."


### Submit changes eslint installation to project:

git add .eslintrc.js
git commit -m 'Add eslint automation'


### Next thing to do

Change the task 'eslintest' to 'pretest' or 'posttest', in this moment have not decided to run automatically.
