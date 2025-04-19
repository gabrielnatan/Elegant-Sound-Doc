# Requisitos Não Funcionais – Admin

### RNF101 - Acesso Seguro
- Autenticação via JWT com roles (admin, staff)
- Proteção contra brute-force (rate limit)

### RNF102 - Logs e Auditoria
- Todas ações devem ser registradas (log de alteração)

### RNF103 - Performance
- Dashboard deve carregar em até 1 segundo
- Listagens paginadas para melhor performance

### RNF104 - Escalabilidade
- Arquitetura modular que permita adicionar novos módulos administrativos

### RNF105 - Usabilidade
- Interface intuitiva e adaptada para desktop
- Feedback visual para ações (toast, loading, erro)

### RNF106 - Disponibilidade
- Acesso contínuo para admins (99.9% SLA)
