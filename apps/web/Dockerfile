FROM node:14.18.1-alpine AS builder

RUN yarn global add vite typescript sass

USER root

WORKDIR /home/node/app

RUN chown -R node:node /home/node/app

COPY --chown=node:node ./package.json .

USER node

RUN yarn

COPY --chown=node:node . .

RUN yarn build

FROM nginx:latest

COPY --from=builder /home/node/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
