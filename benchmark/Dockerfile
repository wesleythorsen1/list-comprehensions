# base stage 
FROM node:20-alpine AS base

WORKDIR /app

COPY \
  package-lock.json \
  package.json \
  *.js \
  ./

RUN npm ci 

CMD ["node", "./run.js"]
