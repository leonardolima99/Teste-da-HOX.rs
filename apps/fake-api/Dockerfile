FROM node:14.18.1-alpine

ENV PORT=3001

RUN yarn config set unsafe-perm true

USER root

WORKDIR /home/node/app

RUN chown -R node:node /home/node/app

COPY --chown=node:node ./package.json .

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3001

CMD [ "yarn", "start" ]
