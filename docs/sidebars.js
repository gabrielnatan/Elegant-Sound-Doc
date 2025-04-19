module.exports = {
    docs: [
      'Introducao',
      {
        type: 'category',
        label: 'Requisitos',
        collapsed: false,
        items: [
          'requisitos/visao-geral',
          'requisitos/cliente-funcionais',
          'requisitos/cliente-nao-funcionais',
          'requisitos/admin-funcionais',
          'requisitos/admin-nao-funcionais',
        ],
      },
      {
        type: 'category',
        label: 'Arquitetura',
        collapsed: false,
        items: [
          'arquitetura/frontend',
          'arquitetura/backend',
          'arquitetura/banco-de-dados',
          'arquitetura/comunicacao-entre-camadas',
        ],
      },
      'modelo-de-dados',
      {
        type: 'category',
        label: 'API',
        collapsed: false,
        items: [
          'api/auth',
          'api/usuarios',
          'api/produtos',
          'api/pedidos',
        ],
      },
    ],
  };
  