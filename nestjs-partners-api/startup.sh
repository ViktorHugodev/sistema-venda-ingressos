#!/bin/bash
set -e

echo "Instalando Prisma localmente para evitar problemas de permissão..."
npm install prisma --save-dev

echo "Gerando cliente Prisma..."
npx --no-install prisma generate

echo "Executando migrações..."
npx --no-install prisma migrate deploy

echo "Executando seed para popular o banco..."
npx --no-install prisma db seed

echo "Iniciando aplicação..."
npm run start:dev