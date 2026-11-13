# Quadra Gestão

Sistema de gestão para quadras esportivas com backend em Node.js/Express e frontend em React + Vite.

## Visão geral

O projeto foi pensado para facilitar a administração de quadras esportivas, permitindo:

- cadastro e gestão de clientes
- registro de reservas
- controle de disponibilidade e horários
- gestão de quadras e bloqueios
- registros de pagamentos
- geração de relatórios da operação

## Stack tecnológica

- Backend: Node.js, Express, PostgreSQL
- Frontend: React, Vite, Bootstrap
- Comunicação: Axios
- Autenticação: estrutura inicial disponível, sem login real implementado

## Estrutura do projeto

```text
quadra_gestao/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── domain/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routers/
│   │   └── services/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── package.json
├── README.md
└── .gitignore
```

## Status atual

O projeto já está funcionando em desenvolvimento:

- backend inicia corretamente e conecta ao PostgreSQL
- frontend compila e sobe via Vite sem erros de build
- as rotas da API estão montadas em `backend/src/routers/index.js`
- o módulo de autenticação foi inicializado para evitar erro de router vazio

## Funcionalidades implementadas

### Backend

Rotas principais:

- `/api/auth`
- `/api/clientes`
- `/api/reservas`
- `/api/quadras`
- `/api/pagamentos`
- `/api/bloqueios`
- `/api/relatorios`
- `/api/disponibilidade`

### Frontend

Páginas da interface:

- autenticação
- cadastro de clientes
- nova reserva
- listagem de reservas
- calendário
- painel principal/dashboard

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js 18+
- npm
- PostgreSQL

## Configuração do banco

O backend usa `pg` para conectar ao PostgreSQL. A configuração aceita variáveis de ambiente e também possui valores padrão para facilitar o desenvolvimento local.

Arquivo responsável:

- `backend/src/config/database.js`

Exemplo de variáveis esperadas:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=quadra_gestao
DB_PASSWORD=admin
DB_PORT=5433
```

Se as variáveis não forem definidas, o sistema usa estes valores padrão:

```js
user: 'postgres'
host: 'localhost'
database: 'quadra_gestao'
password: 'admin'
port: 5433
```

Crie o banco `quadra_gestao` no PostgreSQL antes de subir o backend.

## Como executar

### 1) Instalar dependências do backend

```bash
cd backend
npm install
```

### 2) Iniciar o backend

```bash
npm start
```

O backend ficará disponível em:

```text
http://localhost:3000
```

### 3) Instalar dependências do frontend

```bash
cd ../frontend
npm install
```

### 4) Iniciar o frontend

```bash
npm run dev -- --host 0.0.0.0
```

O frontend ficará disponível em:

```text
http://localhost:5173
```

## Variáveis e ambiente

A aplicação foi ajustada para suportar `dotenv`, mas também mantém valores de fallback para desenvolvimento local. Isso reduz erros quando o arquivo `.env` ainda não foi criado.

## Observações

- o arquivo `backend/server.js` inicia a aplicação e tenta conectar ao PostgreSQL antes de levantar o servidor
- o Express usa `app.use('/api', routers)` para centralizar as rotas da aplicação
- o frontend foi validado com build de produção com sucesso
- o projeto ainda está em evolução e pode receber ajustes adicionais em regras de negócio e autenticação

## Licença

Este projeto utiliza a licença ISC.
