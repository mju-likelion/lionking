FROM node:16.16.0-alpine AS INSTALLER

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn --prod
RUN yarn global add @nestjs/cli

COPY . .
RUN yarn build

FROM node:16.16.0-alpine

WORKDIR /usr/src/app

COPY --from=INSTALLER /usr/src/app .

ENV NODE_ENV production
ARG EMAIL_AUTH_EMAIL
ARG EMAIL_AUTH_PASSWORD
ARG EMAIL_HOST
ARG EMAIL_FROM_USER_NAME
ARG SECRET_KEY
ARG DB_NAME
ARG DB_PASSWORD
ARG PORT

CMD ["node", "dist/src/main.js"]
EXPOSE ${PORT}
