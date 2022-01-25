FROM node:16 as builder

WORKDIR /tmp
COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production

FROM nginx:stable-alpine
COPY --from=builder /tmp/build /usr/share/nginx/html
