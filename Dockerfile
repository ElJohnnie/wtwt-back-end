FROM node:18.20.3 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18.20.3 AS production-stage

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 5000

ENTRYPOINT [ "npm", "run", "start" ]
# # CMD ["tail", "-f", "/dev/null"]
