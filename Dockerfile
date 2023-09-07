FROM node:20-alpine As development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci

FROM node:20-alpine As build
WORKDIR /usr/src/app
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
RUN npm ci --omit=dev && npm cache clean --force

FROM node:20-alpine As production
ENV NODE_ENV production
RUN apk add --no-cache dumb-init=1.2.5-r2
COPY --chown=root:root --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=root:root --from=build /usr/src/app/dist ./dist
EXPOSE 80
CMD ["dumb-init", "node", "dist/main.js"]