# Comunicação entre Camadas

## API RESTful

A comunicação entre frontend e backend é feita via **API RESTful**, utilizando o padrão HTTP e troca de dados em formato **JSON**.

- URL base da API: `https://api.elegantsound.com`
- As requisições seguem os métodos padrão:
  - `GET`: leitura
  - `POST`: criação
  - `PUT`: atualização
  - `DELETE`: remoção

### Exemplo de chamada com Axios no frontend:

```ts
// Login
await api.post('/auth/login', {
  email: 'user@email.com',
  senha: '12345678'
});

// Buscar produtos
await api.get('/products');
```

---

## Autenticação com JWT

O sistema utiliza **tokens JWT** para autenticação do usuário.

### Fluxo completo:

1. O usuário realiza login via `/auth/login`
2. O backend gera um JWT assinado e o retorna
3. O frontend armazena o token (em `localStorage`, `cookie`, ou memory)
4. Todas as requisições protegidas enviam o token no header:

```http
Authorization: Bearer <token>
```

5. O backend valida o token usando um **Guard**
6. Se válido, permite o acesso e associa o `userId` à requisição

---

## Controle de Acesso (Roles)

As rotas protegidas exigem autenticação e, em alguns casos, um nível de permissão (`admin`, `cliente`).

No backend, o controle é feito com decorators:

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
```

No frontend, páginas como `/admin` são protegidas com hooks e redirecionamento baseado no perfil do usuário.

---

## Padrão de Requisições

### Headers comuns:

```http
Content-Type: application/json  
Authorization: Bearer <token>
```

### Exemplo de payload de cadastro:

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senhaSegura123"
}
```

---

## Tratamento de Erros

### Backend retorna erros padronizados:

```json
{
  "statusCode": 400,
  "message": "E-mail já cadastrado",
  "error": "Bad Request"
}
```

### Frontend interpreta a resposta e exibe mensagens para o usuário com base na chave `message`.

---

## Resposta de Sucesso

Exemplo de login:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "nome": "João",
    "email": "joao@email.com",
    "role": "cliente"
  }
}
```

---

## Testes e Simulações

Durante o desenvolvimento, o frontend utiliza:

- **Mocks** locais com dados fake
- Testes manuais usando **Postman** ou **Insomnia**
- Ambiente de staging opcional (ex: `/api-staging`)

---

> Última atualização: Abril/2025  
> Autor: Gabriel Natan
