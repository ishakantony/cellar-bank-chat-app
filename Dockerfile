# syntax=docker/dockerfile:1

# ── base: shared foundation ───────────────────────────────────────────
FROM node:24-slim AS base
WORKDIR /app

# ── deps: install all dependencies (cached layer) ─────────────────────
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ── builder: next build (standalone output) ───────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ── runner: lean production image (standalone output only) ────────────
FROM node:24-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN groupadd --system --gid 1001 nodejs \
 && useradd  --system --uid 1001 -g nodejs nextjs

# Standalone server + its traced node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
