# Multi-stage build: build with Node, serve static with nginx
FROM node:18-alpine AS builder
WORKDIR /app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent || npm install --silent

# copy and build
COPY . .
RUN npm run build

### Production image
FROM nginx:stable-alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a simple nginx config that supports SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
