# API - Auth

Esta seção documenta os endpoints relacionados à autenticação de usuários no sistema **Elegant Sound**. A autenticação é baseada em **JWT (JSON Web Token)** e oferece endpoints para **registro** e **login**.

## Endpoint: POST /auth/register

Cria um novo usuário do tipo cliente.

### Requisição

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senhaSegura123",
  "confirmarSenha": "senhaSegura123"
}
```

### Regras de validação

- `nome`: obrigatório, mínimo 2 caracteres
- `email`: obrigatório, formato válido, único
- `senha`: obrigatório, mínimo 8 caracteres
- `confirmarSenha`: deve ser igual à `senha`

### Resposta de sucesso

```json
{
  "message": "Usuário registrado com sucesso"
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

## Endpoint: POST /auth/login

Realiza a autenticação de um usuário e retorna um JWT.

### Requisição

```json
{
  "email": "joao@email.com",
  "senha": "senhaSegura123"
}
```

### Resposta de sucesso

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-do-usuario",
    "nome": "João Silva",
    "email": "joao@email.com",
    "role": "cliente"
  }
}
```

### Erros possíveis

```json
{
  "statusCode": 401,
  "message": "Credenciais inválidas",
  "error": "Unauthorized"
}
```

---

## Segurança

- O token JWT deve ser enviado em requisições protegidas usando o header:

```http
Authorization: Bearer <seu_token_aqui>
```

- O token expira de acordo com a configuração do backend (ex: 1h, 24h)
- O backend utiliza `passport-jwt` para validar e extrair o usuário autenticado

---

> Última atualização: Abril/2025  
> Autor: Gabriel Natan
