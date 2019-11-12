# Base image
FROM node:12.13-alpine

# Base system dependencies
RUN apk add --no-cache \
    curl \
    git

# Workdir
RUN mkdir -p /application
WORKDIR /application

# NPM dependencies
ADD package.json package-lock.json ./
RUN npm install

# Application files
ADD . ./
