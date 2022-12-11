FROM node:16
# working directory
WORKDIR /usr/src/app

COPY package*.json ./
# installing dependencies
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]