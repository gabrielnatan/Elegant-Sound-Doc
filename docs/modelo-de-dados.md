# Modelo de Dados

Este documento apresenta o modelo de dados relacional utilizado no sistema **Elegant Sound**, incluindo a estrutura das tabelas, campos, tipos e principais relacionamentos.

O banco de dados foi modelado para suportar as principais funcionalidades de um e-commerce, como: usuários, produtos, carrinho, pedidos, favoritos e trocas.

---

## Observações gerais

- Banco: **PostgreSQL**
- ORM: **Prisma**
- Cada entidade está refletida no `schema.prisma` e versionada via migrations
- Relacionamentos foram definidos com base em práticas normalizadas

---

## users

Representa os usuários do sistema (clientes e administradores).

| Campo      | Tipo     | Descrição                          |
|------------|----------|-------------------------------------|
| id         | UUID     | Chave primária                     |
| nome       | string   | Nome completo                      |
| email      | string   | Único e obrigatório                |
| senha      | string   | Armazenada com hash (bcrypt)       |
| role       | enum     | `cliente` ou `admin`               |
| criado_em  | datetime | Timestamp automático               |

---

## products

Tabela de produtos disponíveis no e-commerce.

| Campo        | Tipo     | Descrição                          |
|--------------|----------|-------------------------------------|
| id           | UUID     | Chave primária                     |
| nome         | string   | Nome do produto                    |
| descricao    | text     | Descrição detalhada                |
| preco        | decimal  | Preço unitário                     |
| estoque      | int      | Quantidade disponível              |
| imagem_url   | string   | URL da imagem                      |
| categoria    | string   | Categoria (ex: "Fone", "Caixa")    |
| criado_em    | datetime | Timestamp automático               |

---

## cart_items

Itens adicionados ao carrinho de um usuário.

| Campo       | Tipo   | Relacionamento                |
|-------------|--------|-------------------------------|
| id          | UUID   | Chave primária                |
| user_id     | UUID   | FK → users                    |
| product_id  | UUID   | FK → products                 |
| quantidade  | int    | Quantidade selecionada        |

---

## orders

Representa os pedidos realizados por usuários.

| Campo      | Tipo     | Descrição                            |
|------------|----------|---------------------------------------|
| id         | UUID     | Chave primária                       |
| user_id    | UUID     | FK → users                           |
| total      | decimal  | Valor total calculado                |
| status     | enum     | `pendente`, `enviado`, `entregue`    |
| criado_em  | datetime | Timestamp automático                 |

---

## order_items

Produtos associados a um pedido.

| Campo        | Tipo     | Relacionamento                      |
|--------------|----------|-------------------------------------|
| id           | UUID     | Chave primária                     |
| order_id     | UUID     | FK → orders                        |
| product_id   | UUID     | FK → products                      |
| quantidade   | int      | Quantidade comprada                |
| preco_unit   | decimal  | Snapshot do preço no momento       |

---

## favorites

Tabela de produtos favoritados por um usuário.

| Campo       | Tipo   | Relacionamento                |
|-------------|--------|-------------------------------|
| id          | UUID   | Chave primária                |
| user_id     | UUID   | FK → users                    |
| product_id  | UUID   | FK → products                 |

---

## exchanges

Solicitações de troca feitas pelos clientes.

| Campo      | Tipo     | Descrição                              |
|------------|----------|------------------------------------------|
| id         | UUID     | Chave primária                         |
| user_id    | UUID     | FK → users                             |
| order_id   | UUID     | FK → orders                            |
| motivo     | text     | Descrição da solicitação               |
| status     | enum     | `pendente`, `analisando`, `resolvido`  |
| criado_em  | datetime | Timestamp automático                   |

---

## Exemplo de modelagem no Prisma

```prisma
model User {
  id        String   @id @default(uuid())
  nome      String
  email     String   @unique
  senha     String
  role      Role     @default(cliente)
  criadoEm  DateTime @default(now())
  pedidos   Order[]
  favoritos Favorite[]
}

model Product {
  id         String   @id @default(uuid())
  nome       String
  descricao  String
  preco      Decimal
  estoque    Int
  imagemUrl  String?
  categoria  String
  criadoEm   DateTime @default(now())
  itensCarrinho CartItem[]
}

enum Role {
  cliente
  admin
}
```

---

## Relacionamentos

- **users 1:N orders**
- **users 1:N cart_items**
- **users 1:N favorites**
- **orders 1:N order_items**
- **products 1:N cart_items, favorites, order_items**
- **users 1:N exchanges**

---

## Manutenção do Schema

- Atualização do schema:
```bash
npx prisma generate
```

- Criação de nova migration:
```bash
npx prisma migrate dev --name nome_da_migration
```

---

> Última atualização: Abril/2025  
> Autor: Gabriel Natan
