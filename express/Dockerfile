FROM node:12.4-alpine

WORKDIR /usr/app

COPY . .
RUN rm -rf node_modules
RUN rm -rf .env
RUN yarn install
RUN yarn global add pm2
RUN yarn build

CMD ["pm2-runtime", "./build/index.js"]