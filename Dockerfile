FROM node:8.9.4

ENV PROJECT_PATH /opt/consensus_applicative/
WORKDIR $PROJECT_PATH
COPY . $PROJECT_PATH

RUN npm install

EXPOSE 8080
