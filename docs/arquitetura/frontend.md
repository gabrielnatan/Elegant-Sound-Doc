# Arquitetura – Frontend (Next.js)

## Stack e Tecnologias

- **Next.js**: framework React com SSR e geração estática (SSG/ISR)
- **Tailwind CSS**: utilitário de estilização
- **React Hook Form + Zod**: formulários com validação
- **Axios**: requisições HTTP para a API
- **Next Auth ou JWT customizado**: autenticação (dependendo do que você usar)
- **Context API ou Zustand**: gerenciamento de estado (carrinho, auth)
- **ESLint + Prettier**: padronização de código

---

## Estrutura de Pastas

```bash
/frontend
├── pages/                 # Rotas Next.js (SPA + SSR)
│   ├── index.tsx          # Home
│   ├── login.tsx          # Login
│   ├── cadastro.tsx       # Cadastro
│   ├── produtos/          # Lista e detalhes
│   ├── carrinho.tsx
│   └── ...
├── components/            # Componentes reutilizáveis (UI)
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── ...
├── features/              # Lógicas por domínio
│   ├── auth/
│   ├── cart/
│   └── produtos/
├── services/              # Axios + API endpoints
│   └── api.ts
├── hooks/                 # Custom React Hooks
├── styles/                # Tailwind + globals
└── utils/                 # Funções utilitárias (formato de preço, etc)
```

## Rota | Descrição
/ | Página inicial
/produtos | Catálogo
/produto/[id] | Detalhe do produto
/carrinho | Carrinho de compras
/login | Login
/cadastro | Cadastro de novo usuário
/favoritos | Produtos favoritados
/perfil | Perfil e dados pessoais


## Componentes Principais
Navbar: menu de navegação (acesso a login, carrinho, etc)

ProductCard: card individual com imagem, preço, botão

CartSidebar: carrinho em sidebar ou página

FormInput, Button, RatingStars, etc

## Formulários
Login / Cadastro com validações de:

Email válido

Senha com mínimo de 8 caracteres

Confirmação de senha igual

Validação com Zod + React Hook Form

Mensagens de erro visíveis logo abaixo dos inputs

## Autenticação
Login gera token JWT

Token armazenado em localStorage ou cookie

Rotas protegidas com hook useAuth()

Requisições autenticadas enviam Authorization: Bearer token

## Comunicação com Backend
Requisições via Axios em services/api.ts

Cada feature consome seu endpoint REST

```
// Exemplo: login
api.post('/auth/login', { email, senha })
```


## Gerenciamento de Estado
Context API ou Zustand usado para:

Autenticação

Estado do carrinho

Lista de favoritos

## Responsividade
Layout mobile-first

Tailwind facilita adaptação para desktop/tablet/mobile

## Boas Práticas
Componentes pequenos e reutilizáveis

Separação clara entre UI, lógica e dados

ESLint + Prettier configurados

Tipagem forte com TypeScript

Última atualização: Abril/2025
Autor: Gabriel Natan