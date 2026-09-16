# syntax=docker/dockerfile:1

# ============================================================
# THE INTERNET THROUGH TIME — production image
# Stage 1: build the Vite app (Node LTS)
# Stage 2: serve the static bundle with nginx
# ============================================================

FROM node:22-alpine AS build
WORKDIR /app

# Dependencies first for layer caching.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Source + toolchain, then build (tsc strict + vite).
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts ./
COPY src ./src
COPY index.html ./
RUN npm run build

# ---- serve ------------------------------------------------------

FROM nginx:1.27-alpine AS serve

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ | grep -qi "INTERNET" || exit 1
