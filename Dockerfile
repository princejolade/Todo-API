FROM node:alpine

WORKDIR /app

COPY ./dist ./dist

COPY package.json .

EXPOSE 80

RUN npm install --omit=dev

ENTRYPOINT [ "node", "./dist/main.js" ]

