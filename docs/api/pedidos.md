# API - Pedidos

Esta seção documenta os endpoints relacionados aos **pedidos (orders)** feitos pelos clientes no sistema **Elegant Sound**.

---

## Endpoint: POST /orders

Cria um novo pedido com base nos itens do carrinho do usuário autenticado.

### Requisição

Não é necessário corpo na requisição. O sistema calcula automaticamente os produtos, quantidades e total com base no carrinho do usuário logado.

### Requisição (headers)

```http
Authorization: Bearer <token-do-usuario>
```

### Resposta de sucesso

```json
{
  "id": "order-uuid",
  "user_id": "user-uuid",
  "status": "pendente",
  "total": 349.90,
  "criado_em": "2025-04-19T14:23:00.000Z"
}
```

### Erros possíveis

```json
{
  "statusCode": 400,
  "message": "Carrinho vazio",
  "error": "Bad Request"
}
```

---

## Endpoint: GET /orders

Retorna o histórico de pedidos do usuário autenticado.

### Requisição (headers)

```http
Authorization: Bearer <token-do-usuario>
```

### Resposta de sucesso

```json
[
  {
    "id": "order-uuid",
    "status": "entregue",
    "total": 219.99,
    "criado_em": "2025-03-01T10:15:00.000Z"
  },
  {
    "id": "order-uuid-2",
    "status": "pendente",
    "total": 89.90,
    "criado_em": "2025-04-18T08:30:00.000Z"
  }
]
```

---

## Endpoint: PUT /orders/:id/status

Atualiza o status de um pedido. **Apenas para administradores.**

### Requisição

Parâmetro de rota:
- `:id` → ID do pedido

Corpo da requisição:

```json
{
  "status": "enviado"
}
```

Valores aceitos para `status`:
- `pendente`
- `enviado`
- `entregue`
- `trocado`

### Requisição (headers)

```http
Authorization: Bearer <token-do-admin>
```

### Resposta de sucesso

```json
{
  "message": "Status do pedido atualizado com sucesso"
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
