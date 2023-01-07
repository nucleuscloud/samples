FROM node:18-slim as builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./

RUN npm ci

COPY ./src ./src

RUN npm run build

RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs18
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["dist/index.js"]
