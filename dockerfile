FROM node:14-alpine
WORKDIR /opt/app
ADD . .
RUN yarn
RUN yarn build
CMD ["node", "./dist/main.js"]
