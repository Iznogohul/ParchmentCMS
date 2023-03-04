FROM node:18.14.2-alpine
ENV NODE_ENV production
RUN apk add --update-cache dumb-init && rm -rf /var/cache/apt/*
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --omit=dev && npm cache clean --force
USER node
EXPOSE 80
CMD ["dumb-init", "node", "src/app.js"]