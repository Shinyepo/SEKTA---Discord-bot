FROM node:17-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install && yarn build
CMD [ "node", "dist/index.js" ]