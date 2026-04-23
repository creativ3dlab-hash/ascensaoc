# Ascensão Criativa

Site institucional construído com Vite + React + TypeScript + Tailwind + shadcn/ui.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:8080

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy na Vercel

Este projeto já vem pronto para deploy na Vercel.

### Opção 1 — via dashboard (recomendado)
1. Crie um repositório no GitHub e suba os arquivos deste projeto.
2. Acesse https://vercel.com/new e importe o repositório.
3. A Vercel detecta automaticamente o framework **Vite**. As configurações já estão no `vercel.json`:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: `vite`
4. Clique em **Deploy**. Pronto.

### Opção 2 — via CLI
```bash
npm install -g vercel
vercel
vercel --prod
```

### SPA Routing
O `vercel.json` já contém o rewrite necessário para o React Router funcionar em deep links e refresh de página.

## Stack
- Vite 5 + React 18 + TypeScript 5
- Tailwind CSS 3 + shadcn/ui (Radix)
- React Router 6 + TanStack Query
