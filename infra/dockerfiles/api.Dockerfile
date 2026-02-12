FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY apps/api/package.json apps/api/package.json
RUN npm install
COPY . .
RUN npm run build -w @coiffedom/api
EXPOSE 4000
CMD ["npm", "run", "start", "-w", "@coiffedom/api"]
