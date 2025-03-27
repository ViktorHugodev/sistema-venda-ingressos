#!/bin/bash
set -e

echo "==> Instalando Prisma localmente..."
npm install prisma --save-dev

echo "==> Gerando cliente Prisma..."
npx --no prisma generate

echo "==> Executando migrações do banco de dados..."
npx --no prisma migrate deploy 

echo "==> Populando o banco de dados com dados iniciais..."
npx --no prisma db seed || echo "Seed falhou, mas continuando..."

echo "==> Iniciando os serviços Partner1 e Partner2..."
npm run start:dev