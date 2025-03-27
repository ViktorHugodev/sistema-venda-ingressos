package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/go-sql-driver/mysql"

	httpSwagger "github.com/swaggo/http-swagger"
	_ "github.com/viktorhugodev/sistema-venda-ingressos/golang/docs" // Import the generated docs
	httpHandler "github.com/viktorhugodev/sistema-venda-ingressos/golang/internal/events/infra/http"
	"github.com/viktorhugodev/sistema-venda-ingressos/golang/internal/events/infra/repository"
	"github.com/viktorhugodev/sistema-venda-ingressos/golang/internal/events/infra/service"
	"github.com/viktorhugodev/sistema-venda-ingressos/golang/internal/events/usecase"
)

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// @title Events API
// @version 1.0
// @description This is a server for managing events. Imersão Full Cycle
// @host localhost:8080
// @BasePath /
func main() {
	// Configuração do banco de dados usando variáveis de ambiente
	dbUser := getEnv("DB_USER", "test_user")
	dbPassword := getEnv("DB_PASSWORD", "test_password")
	dbHost := getEnv("DB_HOST", "golang-mysql")
	dbPort := getEnv("DB_PORT", "3306")
	dbName := getEnv("DB_NAME", "test_db")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	log.Printf("Conectando ao banco de dados: %s", dsn)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Adicionar verificação de conexão
	err = db.Ping()
	if err != nil {
		log.Printf("Erro ao conectar ao banco de dados: %v. Tentando novamente...", err)
		// Tentativas de reconexão
		for i := 0; i < 30; i++ {
			time.Sleep(2 * time.Second)
			err = db.Ping()
			if err == nil {
				log.Println("Conectado ao banco de dados com sucesso após tentativas.")
				break
			}
			log.Printf("Tentativa %d falhou: %v", i+1, err)
		}
		if err != nil {
			log.Fatalf("Não foi possível conectar ao banco de dados após várias tentativas: %v", err)
		}
	}

	// Repositório
	eventRepo, err := repository.NewMysqlEventRepository(db)
	if err != nil {
		log.Fatal(err)
	}

	// URLs base específicas para cada parceiro
	partnerBaseURLs := map[int]string{
		1: "http://host.docker.internal:8000/partner1",
		2: "http://host.docker.internal:8000/partner2",
	}

	listEventsUseCase := usecase.NewListEventsUseCase(eventRepo)
	getEventUseCase := usecase.NewGetEventUseCase(eventRepo)
	createEventUseCase := usecase.NewCreateEventUseCase(eventRepo)
	partnerFactory := service.NewPartnerFactory(partnerBaseURLs)
	buyTicketsUseCase := usecase.NewBuyTicketsUseCase(eventRepo, partnerFactory)
	createSpotsUseCase := usecase.NewCreateSpotsUseCase(eventRepo)
	listSpotsUseCase := usecase.NewListSpotsUseCase(eventRepo)

	// Handlers HTTP
	eventsHandler := httpHandler.NewEventsHandler(
		listEventsUseCase,
		getEventUseCase,
		createEventUseCase,
		buyTicketsUseCase,
		createSpotsUseCase,
		listSpotsUseCase,
	)

	r := http.NewServeMux()
	r.HandleFunc("/swagger/", httpSwagger.WrapHandler)
	r.HandleFunc("/events", eventsHandler.ListEvents)
	r.HandleFunc("/events/{eventID}", eventsHandler.GetEvent)
	r.HandleFunc("/events/{eventID}/spots", eventsHandler.ListSpots)
	r.HandleFunc("POST /events", eventsHandler.CreateEvent)
	r.HandleFunc("POST /checkout", eventsHandler.BuyTickets)
	r.HandleFunc("POST /events/{eventID}/spots", eventsHandler.CreateSpots)

	server := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	// Canal para escutar sinais do sistema operacional
	idleConnsClosed := make(chan struct{})
	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, syscall.SIGINT, syscall.SIGTERM)
		<-sigint

		// Recebido sinal de interrupção, iniciando o graceful shutdown
		log.Println("Recebido sinal de interrupção, iniciando o graceful shutdown...")

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		if err := server.Shutdown(ctx); err != nil {
			log.Printf("Erro no graceful shutdown: %v\n", err)
		}
		close(idleConnsClosed)
	}()

	// Iniciando o servidor HTTP
	log.Println("Servidor HTTP rodando na porta 8080")
	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatalf("Erro ao iniciar o servidor HTTP: %v\n", err)
	}

	<-idleConnsClosed
	log.Println("Servidor HTTP finalizado")
}