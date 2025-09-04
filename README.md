# 🎬 TMDB Explorer

Aplicação web feita em **Next.js 15 + Tailwind CSS** que consome a [TMDB API](https://developer.themoviedb.org/) para explorar filmes, com funcionalidades de:

- 🔍 Busca por título  
- 🎭 Filtro por gênero  
- 📅 Filtro por ano de lançamento  
- ↕️ Ordenação por popularidade, nota e data (crescente/decrescente)  
- 🖼️ Listagem com pôster, título, ano, nota e sinopse  
- 📖 Página de detalhes de cada filme  

> **Aviso**: Este projeto é **não comercial** e tem finalidade educacional/portfólio.  
> Dados fornecidos pela [TMDB](https://www.themoviedb.org/) — “Powered by TMDB”.

---

## 🚀 Tecnologias

- [Next.js 15 (App Router)](https://nextjs.org/)  
- [React 18](https://react.dev/)  
- [Tailwind CSS v4](https://tailwindcss.com/)  
- [TypeScript](https://www.typescriptlang.org/)  

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (>= 18)  
- [pnpm](https://pnpm.io/) (recomendado) ou npm/yarn  

---

## 📥 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/SEU_USUARIO/tmdb-explorer.git
cd tmdb-explorer
pnpm install
```

## 🔑 Variáveis de Ambiente

Crie um arquivo .env.local na raiz do projeto com a sua chave da TMDB:

```bash
NEXT_PUBLIC_TMDB_API_KEY=COLE_SUA_CHAVE_AQUI
```
Você pode obter a chave gratuita em: [TMDB API Settings](https://www.themoviedb.org/settings/api)

## 🏃 Rodando em Dev

```bash
pnpm dev
```
Abra http://localhost:3000 no navegador.
