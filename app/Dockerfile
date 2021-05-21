FROM mhart/alpine-node:12

# install dependencies
WORKDIR /etc/app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:slim-12

WORKDIR /etc/app
COPY --from=0 /etc/app .
COPY . .

EXPOSE 3000
CMD ["node", "./build"]