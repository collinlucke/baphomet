FROM node:latest AS build

WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
COPY tsconfig.json .
COPY src ./src

RUN echo "ATLAS_DB_PASSWORD=${ATLAS_DB_PASSWORD}" >> .env
RUN echo "ATLAS_DB_USERNAME=${ATLAS_DB_USERNAME}" >> .env
RUN echo "ATLAS_CLUSTER=${ATLAS_CLUSTER}" >> .env
RUN echo "ATLAS_DB=${ATLAS_DB}" >> .env
RUN echo "ACCESS_TOKEN_SECRET=${ACCESS_TOKEN_SECRET}" >> .env
RUN echo "REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}" >> .env

RUN npm install -g pnpm typescript
RUN pnpm install

COPY . .
EXPOSE 5050
CMD ["pnpm", "start"]
