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


## How to configure at first time ESLint (already created)

### First install in docker

Install the 'eslint' tool in the project:

docker-compose run --rm e2e npm install eslint --save-dev


### Configure linter

To run initial configuration:
`docker-compose run --rm e2e ./node_modules/.bin/eslint --init`

If you choice personal style you can configure:
~~~
? Are you using ECMAScript 6 features?
? Are you using ES6 modules?
? Where will your code run?
? Do you use JSX?
? What style of indentation do you use?
? What quotes do you use for strings?
? What line endings do you use?
? Do you require semicolons?
~~~

For more configurations, view the page https://eslint.org/docs/user-guide/configuring


### Create a script

Create a new script in package.json:

"linter": "eslint --ignore-path .gitignore ."


### Submit changes eslint installation to project:

git add .eslintrc.js
git commit -m 'Add eslint automation'


### Next thing to do

Change the task 'linter' to 'pretest' or 'posttest', in this moment have not decided to run automatically.
