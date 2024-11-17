FROM node:latest AS build

WORKDIR /app

COPY package.json .
COPY index.html .
COPY tsconfig.json .
COPY src ./src
COPY scripts ./scripts
COPY public ./public
COPY .npmrc .

RUN npm install -g pnpm typescript
RUN pnpm install
RUN pnpm build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
