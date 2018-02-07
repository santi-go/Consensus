FROM node:8.9.4

ENV PROJECT_PATH /opt/consensus/

WORKDIR $PROJECT_PATH

COPY package* $PROJECT_PATH
RUN npm install

COPY . $PROJECT_PATH
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "up"]
