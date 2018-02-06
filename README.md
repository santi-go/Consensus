# CONSENSUS

## Start project

### Build (launch the script)

`docker-compose build`


### Up docker

`docker-compose up`


### For system with different UID of 1000

~~~
cd scripts
sh build-docker
~~~

Not use if you need sudo to run docker or docker-compose.


#### The content of script:

~~~
cd ..
docker-compose build --build-arg HOST_USER_ID=`id -u` --build-arg HOST_GROUP_ID=`id -g` node
docker-compose build api
docker-compose build consensus
docker-compose build selenium
~~~


## Build assets

`docker-compose run --rm node npm run build`

`docker-compose run --rm node npm run build-watch`


## Launch tests

The scripts 'test-all', 'test-e2e' and 'test-unit' launch the pretest (script build) and the posttest (script linter).


### Run all test of e2e

`docker-compose run --rm node npm run test-all`


### Run end to end test of e2e:

`docker-compose run --rm node npm run test-e2e`


### Run unit tests of e2e:

`docker-compose run --rm node npm run test-unit`


## ESLint

### Run ESLint

`docker-compose run --rm node npm run linter`


# License

Copyright 2018 Devscola

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
