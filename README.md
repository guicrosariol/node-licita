# Licita Backend

Serviço backend da aplicação Licita, construído com base em princípios de Clean Architecture e Domain-Driven Design (DDD).

## Estrutura do Projeto

O projeto segue o padrão de Clean Architecture com os seguintes diretórios principais:


```
src/
├── core/           # Core domain entities and interfaces
│   ├── entities/   # Base entities and shared domain models
│   ├── either.ts   # Error handling utility
│   └── hasher.ts   # Hashing interface
│
├── domain/         # Domain layer
│   ├── entities/   # Domain entities
│   └── application/# Application use cases and business logic
│
test/
├── core/          # Tests for core functionality
├── factories/     # Test factories
├── repositories/  # Repository tests
└── use-cases/     # Use case tests
```

## Arquitetura

Este projeto segue os princípios da Clean Architecture, organizando o código nas seguintes camadas:

- **Camada de Domínio**: Contém a lógica de negócio, entidades e casos de uso
- **Camada Core**: Contém interfaces compartilhadas, entidades base e utilitários
- **Camada de Testes**: Suíte de testes abrangente seguindo a mesma estrutura do código-fonte

## Desenvolvimento

### Pré-requisitos

- Node.js (versão especificada no `package.json`)
- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:
   
```bash
npm install
# ou
yarn install
```

### Rodar Testes

```bash
npm test
# or
yarn test
```
