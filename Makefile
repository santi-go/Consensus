test-all:
	docker-compose run --rm e2e npm run test-all && docker-compose exec system bundle exec rspec
