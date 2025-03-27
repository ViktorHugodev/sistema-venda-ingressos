FROM node:21-slim

WORKDIR /home/node/app

RUN apt update && apt install -y openssl procps

RUN npm install -g @nestjs/cli@10.3.2 prisma

# Mudar para root para garantir permissões adequadas
USER root

# Copiar package.json e package-lock.json
COPY package*.json ./
RUN npm ci

# Copiar o resto dos arquivos
COPY . .

# Garantir que o usuário node tenha permissões
RUN chown -R node:node /home/node/app

# Mudar para o usuário node
USER node

# Comando será definido no docker-compose
CMD ["npm", "run", "start:dev"]