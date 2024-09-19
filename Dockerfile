# Menggunakan base image Node.js
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Menyalin semua file dari proyek ke dalam container
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build aplikasi Next.js
RUN npm run build

# Build aplikasi Next.js
RUN npm run build

# Tahap produksi: menggunakan image lebih kecil
FROM node:18-alpine AS runner

WORKDIR /app

# Menyalin node_modules dan hasil build dari tahap builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Expose port 3000
EXPOSE 3000



