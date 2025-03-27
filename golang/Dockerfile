FROM golang:1.22.3-alpine3.20

WORKDIR /app

# Instalando ferramentas necessárias
RUN apk add --no-cache git make gcc musl-dev

# Copiando go.mod e go.sum
COPY go.mod go.sum* ./
RUN go mod download || true

# Copiando o restante dos arquivos
COPY . .

# Compilando a aplicação
RUN go build -o events ./cmd/events/main.go

# Portas
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["./events"]