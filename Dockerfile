FROM node:12-alpine as base
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install
RUN npm install @vue/cli@4.5.0 -g
COPY *.config.js .eslintrc.js .browserslistrc ./
COPY src ./src

FROM base as development
EXPOSE 8080
# start app
CMD ["yarn", "run", "serve"]
