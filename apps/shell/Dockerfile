# apps/shell/Dockerfile

# ==========================================
# Stage 1: Dependencies
# ==========================================
FROM node:18-alpine AS deps
WORKDIR /app

COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# ==========================================
# Stage 2: Builder
# ==========================================
FROM node:18-alpine AS builder
WORKDIR /app

# Copier node_modules depuis deps
COPY --from=deps /app/node_modules ./node_modules

# Copier tout le monorepo
COPY . .

# Build SEULEMENT web-client-shell avec Nx
RUN npx nx build shell --prod

# ==========================================
# Stage 3: Runner (Image finale)
# ==========================================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers buildés
COPY --from=builder /app/dist/apps/shell/.next/standalone ./
COPY --from=builder /app/dist/apps/shell/.next/static ./apps/shell/.next/static
COPY --from=builder /app/dist/apps/shell/public ./apps/shell/public

# Changer le propriétaire
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/shell/server.js"]