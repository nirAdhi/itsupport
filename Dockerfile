# Multi-stage build for Next.js app with Prisma/SQLite
# Optimized for Hetzner cloud deployment

# --- Dependencies stage ---
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

# --- Builder stage ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app (standalone output)
RUN npm run build

# --- Production stage ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Install production deps for Prisma
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci --omit=dev && npm cache clean --force

# Copy standalone Next.js server
COPY --from=builder /app/.next/standalone ./

# Copy static files (standalone needs these separately)
COPY --from=builder /app/.next/static ./.next/static

# Copy public assets
COPY --from=builder /app/public ./public

# Copy Prisma schema + generated client
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy seed file to create admin user on startup
COPY seed.mjs ./seed.mjs

# Create data directory for SQLite persistence
RUN mkdir -p /app/data

# Expose port
EXPOSE 3000

# Start: apply migrations to SQLite DB, run seed, then start standalone server
CMD ["sh", "-c", "DATABASE_URL=file:/app/data/dev.db npx prisma migrate deploy && DATABASE_URL=file:/app/data/dev.db node seed.mjs && node server.js"]
