build-docker:
	docker-compose build --build-arg HOST_USER_ID=`id -u` --build-arg HOST_GROUP_ID=`id -g` e2e
	docker-compose build system
	docker-compose build consensus
	docker-compose build selenium
	docker-compose up

test-system:
	docker-compose exec system bundle exec rspec

test-e2e:
	docker-compose run --rm e2e npm run test-all

test-all:
	docker-compose run --rm e2e npm run test-all && docker-compose exec system bundle exec rspec
