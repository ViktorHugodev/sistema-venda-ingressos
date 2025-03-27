# Sistema de Venda de Ingressos

Este projeto implementa um sistema completo de venda de ingressos com uma arquitetura de microsserviços. O sistema permite gerenciar eventos, reservar lugares e processar a compra de ingressos.

## Componentes do Sistema

### 1. API Principal de Eventos (Golang)
Serviço principal responsável pelo gerenciamento de eventos, lugares e processamento de ingressos.
- **Tecnologias**: Go, MySQL
- **Padrão**: Domain-Driven Design (DDD)
- **Funcionalidades**: Criação de eventos, gerenciamento de lugares, venda de ingressos
- **Porta**: 8080
- **Documentação API**: Swagger disponível em http://localhost:8080/swagger/

### 2. APIs de Parceiros (NestJS)
Microsserviços que simulam parceiros externos que fornecem eventos e lugares.
- **Tecnologias**: NestJS, TypeScript, Prisma ORM, MySQL
- **Parceiros**: Partner1 (porta 3000) e Partner2 (porta 3001)
- **Funcionalidades**: Criação/atualização de eventos, reserva de lugares

### 3. Frontend (NextJS)
Interface de usuário para visualização de eventos, seleção de lugares e checkout.
- **Tecnologias**: Next.js, TypeScript, Tailwind CSS
- **Funcionalidades**: Listagem de eventos, seleção de lugares, checkout
- **Porta**: 3002

### 4. API Gateway (Kong)
Gateway para rotear requisições entre todos os serviços.
- **Tecnologia**: Kong Gateway
- **Configuração**: Declarativa via kong.yaml
- **Porta**: 8000

## Requisitos para Execução

- Docker e Docker Compose
- Node.js e npm (para desenvolvimento local)
- Go (para desenvolvimento local da API principal)
- Git

## Instruções de Execução

### Opção 1: Executar Todo o Sistema com Docker Compose

1. **Clone o repositório**:
   ```bash
   git clone [url-do-repositorio]
   cd sistema-venda-ingressos
   ```

2. **Inicie todos os serviços**:
   ```bash
   docker compose up -d
   ```

   Isso iniciará todos os quatro componentes e seus bancos de dados.

3. **Verifique se todos os serviços estão em execução**:
   ```bash
   docker compose ps
   ```

4. **Acesse o sistema**:
   - Frontend: http://localhost:3002
   - API Principal (Swagger): http://localhost:8080/swagger/
   - Kong API Gateway: http://localhost:8000
   - API Partner1 via Kong: http://localhost:8000/partner1
   - API Partner2 via Kong: http://localhost:8000/partner2

### Opção 2: Executar Componentes Individualmente (Para Desenvolvimento)

#### API Golang:
```bash
cd golang
docker compose up -d  # Inicia MySQL e a API Go
# Para executar manualmente a API:
docker compose up db -d  # Inicia apenas o banco
go run cmd/events/main.go

# Para executar testes:
go test ./internal/events/domain/event_test.go -run TestNewEvent
# Ou todos os testes:
go test ./...
```

#### APIs NestJS:
```bash
cd nestjs-partners-api
npm install
npm run start:dev   # Inicia ambos os parceiros

# Para executar apenas um parceiro específico:
npm run start:dev partner1
npm run start:dev partner2

# Para executar testes:
npm test -- libs/core/src/events/events.service.spec.ts
# Ou todos os testes:
npm test
```

#### Frontend NextJS:
```bash
cd nextjs
npm install
npm run dev   # Inicia o servidor na porta 3002

# Para verificar erros de lint:
npm run lint
```

#### Kong API Gateway:
```bash
cd kong-api-gateway
docker compose -f docker-compose.with-dbless.yaml up -d
```

## Configuração do Banco de Dados

### API Golang (MySQL)
- O esquema do banco é inicializado automaticamente pelo script em `golang/mysql-init/init.sql`
- Credenciais padrão: root/root

### APIs NestJS (MySQL via Prisma)
- O esquema é gerenciado pelo Prisma ORM
- Execute manualmente as migrações se necessário:
  ```bash
  cd nestjs-partners-api
  npx prisma migrate dev
  npx prisma db seed
  ```

## Testes e Desenvolvimento

### Lint e Formatação
- **Go**: `go fmt ./...` 
- **NestJS**: `npm run lint && npm run format`
- **NextJS**: `npm run lint`

### Arquivos de Teste HTTP
O repositório inclui arquivos `.http` para testes rápidos da API:
- `golang/tests/test.http`: Testes para a API Go
- `kong-api-gateway/api.http`: Testes via Kong Gateway
- `nestjs-partners-api/api.http`: Testes para as APIs NestJS

## Arquitetura do Sistema

```
┌──────────────┐      ┌──────────────┐
│   Frontend   │      │  Kong API    │
│   (NextJS)   │──────▶   Gateway    │
└──────┬───────┘      └──────┬───────┘
       │                     │
       │                     │
┌──────▼───────┐      ┌──────▼───────┐
│  API Events  │      │  Partners    │
│  (Golang)    │◀─────▶  API (NestJS)│
└──────┬───────┘      └──────┬───────┘
       │                     │
┌──────▼───────┐      ┌──────▼───────┐
│    MySQL     │      │    MySQL     │
│  (Events)    │      │  (Partners)  │
└──────────────┘      └──────────────┘
```

## Solução de Problemas

1. **Kong Gateway não roteia corretamente**:
   - Verifique se o arquivo `kong-api-gateway/kong/declarative/kong.yaml` está configurado
   - Reinicie o serviço Kong: `docker compose restart kong`

2. **Bancos de dados não inicializam corretamente**:
   - Remova os volumes e reinicie: `docker compose down -v && docker compose up -d`

3. **Problemas de conexão entre serviços**:
   - Certifique-se de que os serviços estão usando `host.docker.internal` para comunicação
   - Verifique se todas as portas estão expostas no Docker Compose

4. **Conflitos de porta**:
   - Altere as portas nos arquivos docker-compose.yaml se houver conflitos

## Contribuição

1. Siga as diretrizes de estilo de código em CLAUDE.md
2. Execute os testes antes de enviar pull requests
3. Mantenha a documentação atualizada

## Notas Importantes

- Este sistema é um exemplo educacional e não deve ser usado em produção sem revisões de segurança
- As credenciais de banco de dados são para desenvolvimento e devem ser substituídas em produção
- Para produção, considere usar variáveis de ambiente para configurações sensíveis