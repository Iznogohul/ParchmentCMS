FROM node:20-alpine As development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci

FROM node:20-alpine As build
WORKDIR /usr/src/app
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
RUN npm ci --omit=dev && npm cache clean --force && apk add --no-cache bash=5.2.26-r0 && npm install -g modclean@3.0.0-beta.1 node-prune@1.0.2 && modclean -n default:safe,default:caution -r && node-prune

FROM node:20-alpine As production
ENV NODE_ENV production
COPY --chown=root:root --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=root:root --from=build /usr/src/app/dist ./dist
EXPOSE 80
USER node
CMD ["node", "dist/main.js"]