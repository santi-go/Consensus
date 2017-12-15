FROM ruby:2.4.2

WORKDIR /system
ADD . /system

RUN apt-get update
RUN gem install bundle
RUN bundle install

CMD rackup --port 4567 -o 0.0.0.0
