FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
ENV PORT=9000
EXPOSE 9000
CMD ["node", "./bin/www"]
