FROM node:20-alpine

WORKDIR /m1

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]