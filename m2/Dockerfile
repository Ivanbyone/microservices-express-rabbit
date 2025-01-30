FROM node:20-alpine

WORKDIR /m2

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start:dev"]