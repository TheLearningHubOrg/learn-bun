# Production Dockerfile for Bun Runtime
FROM oven/bun:1-alpine AS runner

WORKDIR /app
COPY package.json ./

RUN bun install --production

COPY . .

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
