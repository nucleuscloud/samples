FROM node:18-slim as builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm ci --omit=dev

COPY ./src ./src

FROM gcr.io/distroless/nodejs18
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

CMD ["src/index.js"]
