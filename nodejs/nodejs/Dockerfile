FROM node:16-slim

COPY ./package.json ./package-lock.json ./

RUN npm install --production

COPY ./src ./src

CMD ["npm", "start"]
