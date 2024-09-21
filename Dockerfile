ARG NODE_VERSION=21.4.0
ARG PNPM_VERSION=8.12.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as build
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17 as final
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 4321