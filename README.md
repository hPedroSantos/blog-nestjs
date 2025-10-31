<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


# 📰 Blog Pessoal — NestJS

Aplicação desenvolvida em **NestJS** que simula um **blog pessoal básico**, com autenticação via **JWT**, persistência com **MariaDB** e **TypeORM**, e estrutura configurada para **ambientes de desenvolvimento e produção**.

---

## 🚀 Tecnologias Utilizadas

- **NestJS** — Framework modular para Node.js
- **TypeORM** — ORM para acesso e manipulação de dados
- **MariaDB** — Banco de dados relacional
- **JWT (JSON Web Token)** — Autenticação e autorização
- **WireGuard** — Comunicação segura entre serviços
- **Docker** — Containerização da aplicação

---

## ⚙️ Estrutura e Configuração

O projeto possui configuração dinâmica baseada na variável de ambiente `NODE_ENV`.Isso permite alternar automaticamente entre ambientes de **desenvolvimento** e **produção**, sem precisar alterar o código.

- `NODE_ENV=development` → usa `.env.dev` e `DevService`
- `NODE_ENV=production` → usa `.env.prod` e `ProdService`

Essa abordagem garante separação de contexto, segurança e praticidade no deploy.

---

## 💻 Como Executar

### 1. Clonar o repositório

git clone https://github.com/hPedroSantos/blog-nestjs.git
cd blog-nestjs

2. Instalar dependências

npm install

3. Rodar o projeto

Ambiente de desenvolvimento

NODE_ENV=development npm run start:dev

Ambiente de produção

NODE_ENV=production npm run start:prod

A aplicação será iniciada em:
👉 http://localhost:3000
🧱 Executar com Docker

O projeto inclui um Dockerfile que permite o build e execução em container.

# Build da imagem

docker build -t blog-nestjs .

# Executar o container

docker run -d -p 3000:3000 --name blog-nestjs blog-nestjs

📚 Endpoints Principais

    POST /auth/login — Autenticação e geração de token JWT

    POST /posts — Criação de posts (autenticado)

    GET /posts — Listagem pública de posts

    GET /posts/:id — Detalhes de um post específico

🔄 CI/CD

O projeto utiliza GitHub Actions para integração contínua e entrega contínua, realizando:
- Execução automática de testes unitários e e2e
- Verificação de lint
- Build do projeto
- Armazenamento do artefato de build

🧩 Futuras Implementações - Features

    🔁 Cacheamento com Redis

    🧠 Controle de permissões avançado (roles)

    📊 Monitoramento e métricas com Prometheus + Grafana
