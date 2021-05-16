FROM mhart/alpine-node:14

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
FROM mhart/alpine-node:14

WORKDIR /etc/app
COPY --from=0 /etc/app .
COPY . .

EXPOSE 5000
CMD ["node", "/etc/app/build/index.js"]