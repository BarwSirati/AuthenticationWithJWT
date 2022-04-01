FROM node:16 as base

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /app
CMD ["npm", "index.js"]
