FROM mhart/alpine-node:14

# install dependencies
WORKDIR /etc/app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build

EXPOSE 5000
CMD ["node", "build/index.js"]