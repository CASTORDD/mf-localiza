# MF Localiza

Monorepo com arquitetura de microfrontends usando Vite + React + Module Federation.

## Visao geral

Este projeto possui duas aplicacoes principais:

- `apps/host`: aplicacao container (shell) que carrega o remoto de usuarios.
- `apps/users`: microfrontend remoto responsavel pela listagem de usuarios, filtros, paginacao e detalhes.

No modulo `users`, os dados sao consumidos de uma API mock com `json-server`.

## Stack

- `pnpm` workspaces
- `Vite`
- `React 18`
- `@originjs/vite-plugin-federation`
- `@tanstack/react-query`
- `Vitest` + `Testing Library`
- `Storybook`
- `Tailwind CSS` (no app `users`)

## Estrutura do repositorio

```text
.
├── apps/
│   ├── host/
│   └── users/
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Como funciona a federacao

- O `host` roda em `http://localhost:3000`.
- O `users` roda em `http://localhost:3001`.
- O `host` consome o remoto em `http://localhost:3001/assets/remoteEntry.js`.

Exposicoes do microfrontend `users`:

- `./UsersList` -> `src/components/UsersList`
- `./UsersApp` -> `src/App`

## Pre-requisitos

- Node.js `>= 18`
- `pnpm` instalado globalmente

## Instalacao

```bash
pnpm install
```

## Executando o projeto localmente

Para funcionamento completo, rode 2 processos:

1. Subir apps (`host` e `users`):

```bash
pnpm dev
```

2. Em outro terminal, subir a API mock do app `users`:

```bash
pnpm --filter @mf-localiza/users server
```

URLs locais:

- Host: `http://localhost:3000`
- Users remoto: `http://localhost:3001`
- Mock API: `http://localhost:5555`

## Scripts uteis

Na raiz:

- `pnpm dev`: roda os apps em paralelo.
- `pnpm build`: gera build de todos os workspaces.
- `pnpm preview`: faz preview dos apps em paralelo.

No app `users`:

- `pnpm --filter @mf-localiza/users test`: executa testes unitarios.
- `pnpm --filter @mf-localiza/users test:watch`: testes em watch mode.
- `pnpm --filter @mf-localiza/users test:coverage`: cobertura de testes.
- `pnpm --filter @mf-localiza/users storybook`: sobe Storybook em `http://localhost:6006`.
- `pnpm --filter @mf-localiza/users build-storybook`: build do Storybook.

## Variaveis de ambiente

Servico de usuarios (`apps/users/src/services/users-services.ts`):

- `VITE_API_URL`: URL base da API.

Padrao atual quando nao definida:

```text
http://localhost:5555
```

Exemplo de `.env` no app `users`:

```env
VITE_API_URL=http://localhost:5555
```

## Testes e cobertura

Os testes estao concentrados no app `users` com Vitest.

Cobertura minima configurada:

- `lines`: 80%
- `functions`: 80%
- `branches`: 80%
- `statements`: 80%

## Troubleshooting rapido

- Se o `host` nao carregar o remoto:
  - confira se `users` esta rodando na porta `3001`.
  - valide se existe `http://localhost:3001/assets/remoteEntry.js`.
- Se a lista de usuarios nao carregar:
  - confirme se o `json-server` esta ativo na porta `5555`.
  - teste `http://localhost:5555/users` no navegador.
