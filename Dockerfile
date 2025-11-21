# multi-stage dockerfile for express server in monorepo
FROM node:20-alpine AS base

# set working directory
WORKDIR /app

# install pnpm
RUN npm install -g pnpm

# copy workspace and package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# subpackages
COPY server/package.json ./server/
COPY client/package.json ./client/

# install dependencies
RUN pnpm install --frozen-lockfile

# build server
FROM base AS server-build
COPY server/package.json ./server/
COPY server/src ./server/src
COPY server/tsconfig.json ./server/
COPY tsconfig.json ./
COPY tsconfig.base.json ./
RUN pnpm --filer server run build

# Build client
FROM base AS client-build
COPY client/tsconfig.json ./client/
COPY client/public ./client/public
COPY client/src ./client/src
RUN pnpm --filter client run build


# Production image
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only production package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built server and client
COPY --from=server-build /app/server/dist ./server/dist
COPY --from=client-build /app/client/.next ./client/.next
COPY --from=client-build /app/client/public ./client/public

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S express -u 1001
USER express

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://localhost:8080/api/healthz', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

CMD ["node", "server/dist/index.js"]


# copy source code
COPY server/src ./server/src
COPY server/tsconfig.json ./server/
COPY tsconfig.json ./

# build the server
RUN cd server && npx tsc --project .

# production stage
FROM node:20-alpine AS production

# install pnpm
RUN npm install -g pnpm

WORKDIR /app

# copy package files for production install
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY server/package.json ./server/

# install only production dependencies
RUN pnpm install --frozen-lockfile --production

# copy built application
COPY --from=base /app/server/dist ./server/dist

# create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S express -u 1001

# change ownership
USER express

# expose port
EXPOSE 8080

# health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://localhost:8080/api/healthz', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

# start the application
CMD ["node", "server/dist/index.js"]
