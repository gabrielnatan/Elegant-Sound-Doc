# API - Produtos

Esta seção documenta os endpoints da API relacionados aos produtos disponíveis na loja **Elegant Sound**.

---

## Endpoint: GET /products

Lista todos os produtos disponíveis no sistema.

### Parâmetros de query (opcional)

- `search`: string para busca por nome
- `categoria`: nome da categoria (ex: "Fone", "Caixa")
- `min`: preço mínimo
- `max`: preço máximo
- `sort`: `asc` ou `desc`

### Exemplo de requisição

```bash
GET /products?search=fone&min=100&max=500&sort=asc
```

### Resposta de sucesso

```json
[
  {
    "id": "uuid-produto",
    "nome": "Fone Bluetooth",
    "descricao": "Fone sem fio com cancelamento de ruído",
    "preco": 349.90,
    "estoque": 12,
    "imagem_url": "https://cdn.elegantsound.com/fone.jpg",
    "categoria": "Fone"
  }
]
```

---

## Endpoint: GET /products/:id

Retorna os dados de um produto específico.

### Parâmetro de rota

- `:id` → ID do produto

### Resposta de sucesso

```json
{
  "id": "uuid-produto",
  "nome": "Fone Bluetooth",
  "descricao": "Fone sem fio com cancelamento de ruído",
  "preco": 349.90,
  "estoque": 12,
  "imagem_url": "https://cdn.elegantsound.com/fone.jpg",
  "categoria": "Fone"
}
```

### Erros possíveis

```json
{
  "statusCode": 404,
  "message": "Produto não encontrado",
  "error": "Not Found"
}
```

---

## Endpoint: POST /products

Cria um novo produto. **Requer autenticação como admin.**

### Requisição (headers)

```http
Authorization: Bearer <token-do-admin>
```

### Corpo da requisição

```json
{
  "nome": "Fone Bluetooth",
  "descricao": "Fone sem fio com cancelamento de ruído",
  "preco": 349.90,
  "estoque": 12,
  "imagem_url": "https://cdn.elegantsound.com/fone.jpg",
  "categoria": "Fone"
}
```

### Resposta de sucesso

```json
{
  "message": "Produto criado com sucesso",
  "id": "uuid-do-produto"
}
```

---

## Endpoint: PUT /products/:id

Atualiza as informações de um produto existente. **Admin apenas.**

### Parâmetro de rota

- `:id` → ID do produto

### Requisição (headers)

```http
Authorization: Bearer <token-do-admin>
```

### Corpo da requisição (exemplo)

```json
{
  "nome": "Fone Bluetooth PRO",
  "estoque": 20
}
```

### Resposta de sucesso

```json
{
  "message": "Produto atualizado com sucesso"
}
```

---

## Endpoint: DELETE /products/:id

Remove um produto do catálogo (soft delete ou exclusão direta). **Admin apenas.**

### Parâmetro de rota

- `:id` → ID do produto

### Requisição (headers)

```http
Authorization: Bearer <token-do-admin>
```

### Resposta de sucesso

```json
{
  "message": "Produto removido com sucesso"
}
```

### Erros possíveis

```json
{
  "statusCode": 403,
  "message": "Acesso não autorizado",
  "error": "Forbidden"
}
```

---

> Última atualização: Abril/2025  
> Autor: Gabriel Natan
