FROM mhart/alpine-node:14 as base

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .

FROM base as production
ENV NODE_ENV=production
RUN npm run build
CMD ["node", "./build/index.js"]

FROM base as development
ENV NODE_ENV=development
RUN npm install -g nodemon
CMD ["nodemon", "./src/index.ts"]