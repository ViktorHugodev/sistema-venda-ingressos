# CLAUDE.md - System Guidelines

## Build & Run Commands
- Go API: `cd golang && docker compose up`
  - Run single test: `go test ./internal/events/domain/event_test.go -run TestNewEvent`
- NestJS: `cd nestjs-partners-api && npm run start:dev`
  - Run single test: `npm test -- libs/core/src/events/events.service.spec.ts`
- NextJS: `cd nextjs && npm run dev`

## Lint & Format
- Go: `go fmt ./...` 
- NestJS: `npm run lint && npm run format`
- NextJS: `npm run lint`

## Code Style Guidelines
- **Go**: Use domain-driven design, testify for assertions, error handling via explicit returns
- **TypeScript**: Follow NestJS/Angular conventions, use Prettier config (singleQuote, trailingComma)
- **Naming**: camelCase for JS/TS, snake_case for Go variables, PascalCase for Go exports
- **Error Handling**: Early returns in Go, try/catch or async/await in TS
- **Testing**: Follow pattern matching test cases in _test.go and .spec.ts files
- **Imports**: Group by standard lib, external, internal; alphabetical order