FROM node:18.20.3 as builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

FROM node:18.20.3 as production-stage

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 5000

ENTRYPOINT [ "npm", "run", "start" ]
# # CMD ["tail", "-f", "/dev/null"]
