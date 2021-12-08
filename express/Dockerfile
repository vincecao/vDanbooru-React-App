FROM node:14-alpine

WORKDIR /usr/app

COPY . .
RUN rm -rf node_modules
RUN rm -rf .env
RUN yarn install
RUN yarn global add pm2
RUN yarn run --prod build

CMD ["pm2-runtime", "./build/index.js"]