# apps/mfe_auth/Dockerfile

FROM node:18-alpine AS deps
WORKDIR /app

COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

RUN npm ci --only=production

# ==========================================
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build SEULEMENT mfe_auth
RUN npx nx build mfe_auth --prod

# ==========================================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/dist/apps/mfe_auth/.next/standalone ./
COPY --from=builder /app/dist/apps/mfe_auth/.next/static ./apps/mfe_auth/.next/static
COPY --from=builder /app/dist/apps/mfe_auth/public ./apps/mfe_auth/public

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/mfe_auth/server.js"]