FROM node:18.0-bullseye-slim

WORKDIR /usr/src/server

COPY . .

RUN npm install

ENV NODE_ENV=production

EXPOSE 3001

CMD [ "npm", "start" ]
