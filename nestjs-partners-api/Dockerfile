FROM node:21-slim

WORKDIR /home/node/app

RUN apt update && apt install -y openssl procps

# Instalar NestJS CLI globalmente
USER root
RUN npm install -g @nestjs/cli@10.3.2

# Copiar arquivos do projeto
COPY --chown=node:node package*.json ./
RUN npm ci

# Copiar o script de inicialização primeiro
COPY --chown=node:node init.sh ./
RUN chmod +x ./init.sh

# Copiar o resto dos arquivos
COPY --chown=node:node . .

# Ajustar permissões finais
RUN chown -R node:node /home/node/app

# Mudar para o usuário node
USER node

# Usar o script de inicialização como comando padrão
CMD ["/bin/bash", "./init.sh"]