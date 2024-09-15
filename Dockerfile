FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY . .

RUN npm run build

FROM base as production
WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
# RUN npm ci

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public

# RUN mkdir -p /app/local/collections
# RUN ln -s /app/local/collections /app/public/collections || 'Link creation failed'
# ENV COLLECTIONS_PATH=public/collections
# USER nextjs

# CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install 
COPY . .
CMD npm run dev