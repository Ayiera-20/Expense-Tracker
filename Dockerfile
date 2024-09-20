#Sample Dockerfile for NodeJS Apps

FROM node:20

ENV NODE_ENV=production

WORKDIR /app

COPY ["api/package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 4000

CMD [ "node", "server.js" ]