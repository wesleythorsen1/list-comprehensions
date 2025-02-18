# base stage 
FROM node:20-alpine AS base

WORKDIR /app

COPY \
  package-lock.json \
  package.json \
  benchmark.js \
  ./
COPY ./benchmarks ./benchmarks

RUN npm ci 

CMD ["node", "./benchmark.js"]
