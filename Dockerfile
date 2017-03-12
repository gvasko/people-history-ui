# source: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM 221820444680.dkr.ecr.eu-central-1.amazonaws.com/nodeje/node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
