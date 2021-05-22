FROM mhart/alpine-node:16 as base

WORKDIR /usr/src/app
COPY package*.json .
COPY .dockerignore .
RUN npm install
ARG VIRTUAL_HOST
ENV VIRTUAL_HOST $VIRTUAL_HOST
RUN echo "VITE_VIRTUAL_HOST=$VIRTUAL_HOST" > .env

FROM base as production
ENV NODE_ENV=production
RUN cat ./.dockerignore
COPY . .
RUN npm run build
CMD [ "node", "./build" ]

FROM base as development
ENV NODE_ENV=development
RUN echo "src\nstatic" > .dockerignore
RUN cat ./.dockerignore
COPY . .
RUN npm install -g @sveltejs/kit@next
CMD [ "svelte-kit", "dev", "--host" ]