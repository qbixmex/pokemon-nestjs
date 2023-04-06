<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</div>

<h1 style="font-size:6rem;text-align:center;">NestJs Pokedex</h1>


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Docker

### Build

```bash
docker-compose -f docker-compose.prod.yaml \
--env-file .env.prod up --build
```

### Run

```bash
docker-compose -f docker-compose.prod.yaml \
--env-file .env.prod up -d
```

## Environment Variables

Copy ```.env.template``` to ```.env```

And fill the correct values within **.env**.

```bash
# Terminal
$ cp .env.template .env
```

## Seed Data

Just run the following endpoint to seed data:

```http://localhost:3000/api/v2/pokemon```

