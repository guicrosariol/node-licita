# Licita Backend

Backend service for the Licita application, built with a clean architecture approach and domain-driven design principles.

## Project Structure

The project follows a clean architecture pattern with the following main directories:

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

## Architecture

This project follows Clean Architecture principles with the following layers:

- **Domain Layer**: Contains the business logic, entities, and use cases
- **Core Layer**: Contains shared interfaces, base entities, and utilities
- **Test Layer**: Comprehensive test suite following the same structure as the source code

## Development

### Prerequisites

- Node.js (version specified in package.json)
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   
```bash
npm install
# or
yarn install
 ```

### Running Tests

```bash
npm test
# or
yarn test
```
