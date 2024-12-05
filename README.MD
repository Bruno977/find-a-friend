# Daily Diet API

Desafio 03 - API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.
Desafio Ignite Rocketseat

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Tecnologias Utilizadas

- [Fastify](https://fastify.dev/)
- [Zod](https://github.com/colinhacks/zod)
- [Dotenv](https://github.com/motdotla/dotenv)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prisma](https://www.prisma.io/)
- [@faker-js/faker](https://github.com/faker-js/faker)
- [Supertest](https://github.com/ladjs/supertest)
- [Bcrypt/Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [@fastify/cookie](https://github.com/fastify/fastify-cookie)
- [@fastify/jwt](https://github.com/fastify/fastify-jwt)