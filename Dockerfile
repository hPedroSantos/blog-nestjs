FROM node:20-alpine AS build

WORKDIR /app/src

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app/src

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

RUN npm ci --only=production
 
EXPOSE 3000

CMD ["node", "dist/main.js"]
