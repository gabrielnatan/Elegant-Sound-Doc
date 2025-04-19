# Arquitetura – Backend (NestJS)

## Stack Principal

- **NestJS**: framework backend baseado em Node.js com arquitetura modular
- **TypeScript**: tipagem forte e segurança em tempo de desenvolvimento
- **Prisma**: ORM para PostgreSQL com migrations versionadas
- **JWT**: autenticação stateless
- **bcrypt**: hash de senhas
- **Class Validator**: validação automática via decorators
- **dotenv**: gerenciamento de variáveis de ambiente

---

## Estrutura de Pastas

```bash
/backend/src
├── main.ts                  # Bootstrap da aplicação
├── app.module.ts            # Módulo principal
├── auth/                    # Login, registro, JWT
├── users/                   # CRUD de clientes/admins
├── products/                # Catálogo de produtos
├── cart/                    # Carrinho de compras
├── orders/                  # Pedidos
├── favorites/               # Produtos favoritados
├── exchange/                # Trocas
├── database/                # PrismaService, seed, migrations
├── common/                  # Filtros, interceptors, decorators
└── config/                  # Configurações gerais (ex: JWT, env)
```

## Autenticação

O sistema utiliza autenticação baseada em **JWT** com a estratégia `passport-jwt`.

- Tokens são gerados no login e enviados pelo header `Authorization: Bearer <token>`.
- A validação de acesso às rotas protegidas é feita com **Guards** e decorators como `@UseGuards`, `@Roles`.

### 🧾 Perfis/Roles de Usuário

- `cliente`: usuário comum
- `admin`: usuário com acesso ao painel administrativo

### Rotas de Autenticação

| Método | Rota             | Descrição                         |
|--------|------------------|------------------------------------|
| POST   | `/auth/register` | Cria um novo cliente              |
| POST   | `/auth/login`    | Realiza login e retorna JWT       |

**Nota:** As senhas são armazenadas com `bcrypt` (hash seguro).

---

## Módulos do Backend

### `auth`

| Método | Rota             | Descrição                         |
|--------|------------------|------------------------------------|
| POST   | `/auth/register` | Registro de cliente                |
| POST   | `/auth/login`    | Login e geração de token JWT       |

---

### `users`

| Método | Rota           | Descrição                                    |
|--------|----------------|-----------------------------------------------|
| GET    | `/users/me`    | Retorna dados do usuário logado              |
| PUT    | `/users/update`| Atualiza dados do perfil                      |
| GET    | `/users`       | (admin) Lista todos os usuários cadastrados  |

---

### `products`

| Método | Rota              | Descrição                              |
|--------|-------------------|-----------------------------------------|
| GET    | `/products`       | Lista de produtos com filtros           |
| GET    | `/products/:id`   | Detalhes de um produto                  |
| POST   | `/products`       | Criar novo produto (admin)              |
| PUT    | `/products/:id`   | Editar produto existente (admin)        |
| DELETE | `/products/:id`   | Remover produto (admin)                 |

---

### `cart`

| Método | Rota                     | Descrição                              |
|--------|--------------------------|-----------------------------------------|
| GET    | `/cart`                  | Visualiza o carrinho atual              |
| POST   | `/cart/add`              | Adiciona produto ao carrinho            |
| DELETE | `/cart/remove/:productId`| Remove produto do carrinho              |

---

### `orders`

| Método | Rota                 | Descrição                                   |
|--------|----------------------|----------------------------------------------|
| POST   | `/orders`            | Realiza compra a partir do carrinho         |
| GET    | `/orders`            | Histórico de pedidos do cliente             |
| PUT    | `/orders/:id/status` | Atualiza o status de um pedido (admin)      |

---

### `favorites`

| Método | Rota                         | Descrição                            |
|--------|------------------------------|---------------------------------------|
| POST   | `/favorites/:productId`      | Adiciona produto aos favoritos        |
| DELETE | `/favorites/:productId`      | Remove produto dos favoritos          |
| GET    | `/favorites`                 | Lista os favoritos do usuário         |

---

### `exchange`

| Método | Rota           | Descrição                                  |
|--------|----------------|---------------------------------------------|
| POST   | `/exchange`    | Solicitação de troca de produto             |
| GET    | `/exchange`    | (admin) Visualiza todas as solicitações     |



## Serviços e Camadas
- Controller: recebe e responde requisições

- Service: lógica de negócio

- Repository (via Prisma): comunicação com banco

Fluxo típico:
```bash
    Controller → Service → Prisma → DB
```


## Testes (planejados)

A aplicação foi estruturada com suporte para testes utilizando o framework **Jest**, padrão no ecossistema NestJS.

### Tipos de Testes

- **Testes unitários**:
  - Foco nos serviços (`*.service.ts`)
  - Mock de dependências como repositórios e serviços externos
  - Verificação de regras de negócio isoladamente

- **Testes de integração / end-to-end (e2e)**:
  - Simulação da aplicação completa usando `@nestjs/testing`
  - Testes baseados em requisições HTTP
  - Inclui autenticação, headers e fluxo real de uso da API

### Estrutura sugerida de testes

```bash
/backend/test/
├── auth.e2e-spec.ts
├── users.e2e-spec.ts
├── products.service.spec.ts
└── setup.ts
```

## Middleware e Filtros
Exception Filters
Responsáveis por capturar exceções e padronizar as respostas de erro da API.

Todos os erros inesperados são tratados por um filtro global

Respostas seguem o formato:

```json
{
    "statusCode": 400,
    "message": "Campo obrigatório não informado",
    "error": "Bad Request"
}
```


## Guards
Utilizados para proteger rotas com base na autenticação e roles do usuário.

- JwtAuthGuard: verifica se o token JWT é válido

- RolesGuard: permite acesso com base em permissões específicas (admin, cliente)

- Utilização com decorators:

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
```

## Interceptors
Interceptam requisições e respostas para adicionar funcionalidades extras como:

- Logging: registrar dados da requisição

- Transformação de resposta: exemplo, remover campos sensíveis

- Delay artificial ou simulação de loading (para testes)

Exemplo de uso:
```ts
@UseInterceptors(ClassSerializerInterceptor)
```


Última atualização: Abril/2025
Autor: Gabriel Natan