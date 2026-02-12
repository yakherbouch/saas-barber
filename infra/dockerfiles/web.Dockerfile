FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm install
COPY . .
RUN npm run build -w @coiffedom/web
EXPOSE 3000
CMD ["npm", "run", "start", "-w", "@coiffedom/web"]
