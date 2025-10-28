# Cubos Movies

Sistema completo para cadastro, listagem e gerenciamento de filmes, com autenticação de usuários e envio de e-mails. O projeto é dividido em duas aplicações: API (backend) e Web (frontend).

---

## Arquitetura do Projeto

### Web (Frontend)
- **Next.js + React + TypeScript**: Estrutura moderna, server components e client components.
- **shadcn/ui**: Biblioteca de componentes de UI baseada em Radix UI, altamente customizável, com design moderno e acessível. Os componentes ficam em `web/components/ui/` e incluem botões, cards, dropdowns, sheets, dialogs, badges, selects, checkboxes, skeletons, forms, labels, paginadores, entre outros. Todos são facilmente customizáveis via Tailwind CSS.
- **Radix UI**: Base para acessibilidade e comportamento dos componentes interativos.
- **Tailwind CSS**: Utilizado para estilização rápida e consistente.
- **TanStack React Query**: Gerenciamento de cache e requisições assíncronas.
- **React Hook Form + Zod**: Formulários tipados e validação robusta.
- **Context API e Providers**: Contextos globais para autenticação, tema, query client, etc. (em `web/contexts/` e `web/providers/`).
- **Hooks customizados**: Em `web/hooks/` para lógica reutilizável.
- **Serviços de API**: Em `web/services/`, centralizando chamadas HTTP e regras de negócio do frontend.
- **Organização modular**: Componentes reutilizáveis, páginas separadas, assets em `public/`.

### API (Backend)
- **Node.js + Fastify + TypeScript**: API REST performática e tipada.
- **Prisma ORM**: Abstração de banco de dados (PostgreSQL).
- **Arquitetura em camadas**:
  - `application/`: Entidades, contratos, casos de uso (use cases), validações.
  - `infra/`: Repositórios, gateways (S3, SES), clients, templates de e-mail.
  - `kernel/`: Injeção de dependências (DI), decorators.
  - `main/`: Server, rotas principais.
- **Validação com Zod**: Schemas para validação de entrada.
- **Envio de e-mails**: AWS SES + React Email para templates dinâmicos.
- **Armazenamento de arquivos**: AWS S3.
- **Autenticação JWT**: Tokens seguros para autenticação e autorização.
- **Variáveis de ambiente**: Centralizadas em `.env` (veja exemplo abaixo).

---

## Tecnologias Utilizadas

### API (Backend)
- Node.js, Fastify, TypeScript, Prisma ORM, PostgreSQL, AWS S3, AWS SES, Zod, JWT, React Email

### Web (Frontend)
- Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, React Hook Form, Zod, Axios, TanStack React Query, Nookies

---

## Estrutura do Projeto

```
├── api/         # Backend (API REST)
│   ├── src/
│   │   ├── application/   # Casos de uso, entidades, contratos
│   │   ├── infra/         # Repositórios, gateways, clients, emails
│   │   ├── kernel/        # Injeção de dependências
│   │   └── main/          # Server, rotas
│   ├── prisma.config.ts   # Configuração do Prisma
│   ├── package.json
│   └── ...
├── web/         # Frontend (Next.js)
│   ├── app/     # Páginas e rotas
│   ├── components/
│   │   ├── ui/  # Componentes shadcn/ui (baseados em Radix UI)
│   │   └── ...  # Outros componentes
│   ├── contexts/    # Contextos globais
│   ├── hooks/       # Hooks customizados
│   ├── providers/   # Providers globais
│   ├── services/    # Serviços de API
│   ├── utils/       # Utilitários
│   ├── public/      # Assets públicos
│   ├── package.json
│   └── ...
└── README.md
```

---

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)
- PostgreSQL

### 1. Clone o repositório
```bash
git clone https://github.com/EmanuelBacalhau/cubos-movie.git
cd cubos-movie
```

### 2. Configuração da API
```bash
cp .env.example .env # Preencha as variáveis de ambiente
pnpm install
pnpm prisma migrate dev # Em desenvolvimento
pnpm build
pnpm start # ou pnpm dev para modo desenvolvimento
```

### 3. Configuração do Web
```bash
pnpm install
pnpm dev # Acesse http://localhost:3000
```

---

## Variáveis de Ambiente (API)
Crie um arquivo `.env` na pasta `api/` com base no `.env.example`:

```
PORT=3333
JWT_SECRET=uma_senha_segura
DATABASE_URL=postgresql://usuario:senha@localhost:5432/banco
EMAIL=seu@email.com
AWS_REGION=sa-east-1
AWS_S3_BUCKET_NAME=nome-do-bucket
FRONTEND_URL=http://localhost:3000
AWS_ACCESS_KEY_ID=sua-key
AWS_SECRET_ACCESS_KEY=sua-secret
```

---

## Scripts Úteis

### API
- `pnpm build` — Build da API
- `pnpm start` — Inicia a API em produção
- `pnpm dev` — Inicia a API em modo desenvolvimento
- `pnpm typecheck` — Checagem de tipos TypeScript
- `pnpm email:dev` — Visualizar templates de e-mail

### Web
- `pnpm dev` — Inicia o frontend em modo desenvolvimento
- `pnpm build` — Build do frontend
- `pnpm start` — Inicia o frontend em produção

---

## Licença

Este projeto está licenciado sob a licença ISC.

---

> Desenvolvido por Emanuel Bacalhau.
