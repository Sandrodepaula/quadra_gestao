# Quadra Gestão

Sistema de gestão para quadras esportivas, desenvolvido com backend em Node.js/Express e frontend em React + Vite. O projeto permite controlar clientes, reservas, disponibilidades, pagamentos, bloqueios e relatórios da operação.

## Visão geral

A aplicação foi pensada para facilitar a administração de uma quadra ou complexo esportivo, com foco em:

- cadastro e gestão de clientes
- registro de reservas e disponibilidade
- controle de quadras e horários
- pagamentos e bloqueios
- geração de relatórios operacionais

## Stack tecnológica

- Backend: Node.js, Express, PostgreSQL
- Frontend: React, Vite, Bootstrap
- Comunicação: Axios
- Autenticação: não implementada nesta versão

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
└── README.md
```

## Funcionalidades

### Backend

Endpoints principais:

- `/api/clientes`
- `/api/reservas`
- `/api/quadras`
- `/api/pagamentos`
- `/api/bloqueios`
- `/api/relatorios`
- `/api/disponibilidade`

### Frontend

A interface do cliente inclui páginas para:

- calendário de reservas
- cadastro de clientes
- registro de novas reservas
- visualização de reservas e clientes
- gerenciamento de disponibilidade

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js 18+
- npm ou yarn
- PostgreSQL

## Configuração do banco de dados

O backend está configurado para conectar a um banco PostgreSQL local com as seguintes configurações:

```js
user: 'postgres'
host: 'localhost'
database: 'quadra_gestao'
password: 'admin'
port: 5433
```

Arquivo responsável:

- `backend/src/config/database.js`

Crie o banco `quadra_gestao` no PostgreSQL e confirme que a conexão está funcionando antes de iniciar o servidor.

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

O servidor ficará disponível em:

```text
http://localhost:3000
```

### 3) Instalar dependências do frontend

```bash
cd ../frontend
npm install
```

### 4) Iniciar o frontend em modo de desenvolvimento

```bash
npm run dev
```

A aplicação frontend será aberta em uma porta local do Vite, normalmente:

```text
http://localhost:5173
```

## Variáveis e ambiente

Atualmente, a configuração do banco está hardcoded no projeto. Se futuramente forem adicionados arquivos `.env`, a recomendação é centralizar as credenciais e a porta em variáveis de ambiente para evitar dados fixos no código.

## Observações

- O arquivo `backend/server.js` inicia a aplicação e tenta conectar ao PostgreSQL antes de subir o servidor.
- A estrutura segue arquitetura em camadas, com controllers, services, repositories e routers.
- O aplicativo ainda pode estar em evolução e pode exigir ajustes adicionais para ambiente de produção.

## Licença

Este projeto utiliza a licença ISC.
