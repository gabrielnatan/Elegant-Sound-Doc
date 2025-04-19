# Arquitetura – Banco de Dados (PostgreSQL + Prisma)

## Modelo de Dados

O sistema utiliza um banco de dados relacional **PostgreSQL**, gerenciado por meio do ORM **Prisma**. O modelo foi projetado para cobrir funcionalidades comuns de um e-commerce.

### Diagrama ER

> [Clique aqui para visualizar o diagrama no dbdiagram.io](https://dbdiagram.io)  
> (adicione o link real quando estiver pronto)

---

## Entidades e Relacionamentos

### 🧍 `users`

| Campo     | Tipo     | Restrições              |
|-----------|----------|--------------------------|
| id        | UUID     | PK                       |
| nome      | string   | not null                 |
| email     | string   | unique, not null         |
| senha     | string   | hash (bcrypt), not null  |
| role      | enum     | `cliente` ou `admin`     |
| criado_em | datetime | default: now()           |

---

### `products`

| Campo       | Tipo     | Restrições              |
|-------------|----------|--------------------------|
| id          | UUID     | PK                       |
| nome        | string   | not null                 |
| descricao   | text     |                          |
| preco       | decimal  | not null                 |
| estoque     | int      | default: 0               |
| imagem_url  | string   |                          |
| categoria   | string   | ex: “Fone”, “Caixa”      |
| criado_em   | datetime | default: now()           |

---

### `cart_items`

| Campo       | Tipo     | Relacionamento           |
|-------------|----------|--------------------------|
| id          | UUID     | PK                       |
| user_id     | UUID     | FK → users               |
| product_id  | UUID     | FK → products            |
| quantidade  | int      | default: 1               |

---

### `orders`

| Campo       | Tipo     |                           |
|-------------|----------|---------------------------|
| id          | UUID     | PK                        |
| user_id     | UUID     | FK → users                |
| total       | decimal  | calculado                 |
| status      | enum     | `pendente`, `enviado`, `entregue`, `trocado` |
| criado_em   | datetime | default: now()            |

---

### `order_items`

| Campo        | Tipo     | Relacionamento           |
|--------------|----------|--------------------------|
| id           | UUID     | PK                       |
| order_id     | UUID     | FK → orders              |
| product_id   | UUID     | FK → products            |
| quantidade   | int      |                          |
| preco_unit   | decimal  | snapshot do preço        |

---

### `favorites`

| Campo       | Tipo     | Relacionamento           |
|-------------|----------|--------------------------|
| id          | UUID     | PK                       |
| user_id     | UUID     | FK → users               |
| product_id  | UUID     | FK → products            |

---

### `exchanges`

| Campo       | Tipo     | Descrição                 |
|-------------|----------|---------------------------|
| id          | UUID     | PK                        |
| user_id     | UUID     | FK → users                |
| order_id    | UUID     | FK → orders               |
| motivo      | text     | motivo da troca           |
| status      | enum     | `pendente`, `analisando`, `resolvido` |
| criado_em   | datetime | default: now()            |

---

## Migrations e Versionamento

- ORM: **Prisma**
- Comando para gerar:
```bash
npx prisma migrate dev --name nome_da_migration
```

- Comando para aplicar:
```bash
npx prisma migrate deploy
```

- Arquivos versionados em `/prisma/migrations`

---

## Seeds (Dados Iniciais)

- Usuário admin criado automaticamente no seed
- Produtos e categorias de exemplo
- Comando para rodar:
```bash
npx prisma db seed
```

---

## Testes com Banco

- Banco em memória para testes automatizados (com SQLite ou PostgreSQL em Docker)
- Seeds específicos para ambiente de testes

---

## Segurança no Banco

- Senhas nunca armazenadas em texto puro
- Tokens JWT não são salvos no banco
- Políticas de integridade referencial com `onDelete: CASCADE` onde aplicável

---

> Última atualização: Abril/2025  
> Autor: Gabriel Natan
