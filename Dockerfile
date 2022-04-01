FROM node:16 as base

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
ENV PORT 3000
ENV TOKEN_KEY qqwweerrttyyuuiioopp[[]]
ENV AUTH_USERNAME Discord_DEV
ENV AUTH_PASSWORD "\$2a\$12\$F7p/Q4n9qeHRKCBR4P6i0eByffAnxGK59bHmlbzc/rCoM1KGEaUbG"
EXPOSE $PORT

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /app
CMD ["npm", "index.js"]
