FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

# Porta que o Next.js usará internamente
EXPOSE 3002

# Usar a porta 3002 explicitamente
CMD ["npm", "run", "dev", "--", "--port", "3002"]