# API - Usuários

Esta seção documenta os endpoints relacionados aos usuários no sistema **Elegant Sound**, incluindo dados do perfil, atualização de informações e listagem de usuários (admin).

---

## Endpoint: GET /users/me

Retorna os dados do usuário autenticado.

### Requisição (headers)

```http
Authorization: Bearer <token-do-usuario>
```

### Resposta de sucesso

```json
{
  "id": "uuid",
  "nome": "João Silva",
  "email": "joao@email.com",
  "role": "cliente",
  "criado_em": "2025-04-10T15:30:00.000Z"
}
```

---

## Endpoint: PUT /users/update

Atualiza os dados de perfil do usuário logado.

### Requisição (headers)

```http
Authorization: Bearer <token-do-usuario>
```

### Corpo da requisição (exemplo)

```json
{
  "nome": "João S. da Silva",
  "email": "joaosilva@email.com"
}
```

### Regras de validação

- `nome`: mínimo 2 caracteres
- `email`: formato válido, único

### Resposta de sucesso

```json
{
  "message": "Dados atualizados com sucesso"
}
```

### Erros possíveis

```json
{
  "statusCode": 400,
  "message": "E-mail já está em uso",
  "error": "Bad Request"
}
```

---

## Endpoint: GET /users

Retorna todos os usuários cadastrados. **Requer autenticação como admin.**

### Requisição (headers)

```http
Authorization: Bearer <token-do-admin>
```

### Resposta de sucesso

```json
[
  {
    "id": "uuid",
    "nome": "João Silva",
    "email": "joao@email.com",
    "role": "cliente"
  },
  {
    "id": "uuid2",
    "nome": "Admin User",
    "email": "admin@email.com",
    "role": "admin"
  }
]
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
