.PHONY: all build clean docker docker-up docker-down swag run

# Diretórios
SWAGGER_DIR = ./docs
CMD_DIR = ./cmd/events
HANDLER_DIR = ./internal/events/infra/http

# Nome do binário
BINARY_NAME = events

# Variáveis
DB_USER = test_user
DB_PASSWORD = test_password
DB_HOST = localhost
DB_PORT = 3306
DB_NAME = test_db

all: clean swag build

# Limpa os arquivos gerados
clean:
	rm -f $(BINARY_NAME)

# Gera os arquivos do Swagger
swag:
	swag init --output docs --dir ./cmd/events,./internal/events/infra/http,./internal/events/usecase

# Compila o código
build:
	go build -o $(BINARY_NAME) $(CMD_DIR)/main.go

# Executa o servidor
run: build
	./$(BINARY_NAME)

# Docker
docker:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

# Reinicia apenas o serviço Golang sem afetar o banco de dados
docker-restart-golang:
	docker-compose restart golang

# Testes
test:
	go test ./...