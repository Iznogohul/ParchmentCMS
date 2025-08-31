FROM node:22-alpine AS development
WORKDIR /usr/src/app
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile --ignore-scripts --reporter=silent

FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN corepack enable && pnpm run build
RUN pnpm prune --prod && apk add --no-cache bash=5.2.37-r0 && npm install -g modclean@3.0.0-beta.1 node-prune@1.0.2 && modclean -n default:safe,default:caution -r && node-prune

FROM node:22-alpine AS production
ENV NODE_ENV="production"
COPY --chown=root:root --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=root:root --from=build /usr/src/app/dist ./dist
EXPOSE 80
USER node
CMD ["node", "dist/main.js"]