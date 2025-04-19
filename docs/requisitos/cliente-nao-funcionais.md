# Requisitos Não Funcionais – Cliente

### RNF001 - Segurança
- Senhas armazenadas com hash seguro (bcrypt)
- Toda comunicação feita via HTTPS
- JWT para autenticação

### RNF002 - Performance
- Tempo de resposta da API inferior a 500ms (em 95% das requisições)
- Páginas otimizadas com SSG/ISR

### RNF003 - Usabilidade
- Layout responsivo (mobile-first)
- Navegação fluida com feedback visual
- Acessibilidade básica (ex: contraste, teclado)

### RNF004 - Disponibilidade
- Uptime mínimo de 99.9%
- Sistema de alertas em caso de erro

### RNF005 - Privacidade
- Dados do usuário não devem ser expostos
- RGPD e boas práticas de proteção de dados

### RNF006 - Escalabilidade
- Capaz de atender a mais de 500 usuários simultâneos
