// ***********************************************
// Comandos Customizados do Cypress para Ninho de Papel
// ***********************************************

/**
 * Intercepta as rotas da API simulando resposta de SUCESSO (200 OK)
 */
Cypress.Commands.add('mockApiSuccess', () => {
  cy.fixture('banners.json').then((banners) => {
    cy.intercept('GET', '**/banners*', {
      statusCode: 200,
      body: banners,
    }).as('getBanners');
  });

  cy.fixture('categories.json').then((categories) => {
    cy.intercept('GET', '**/categories*', {
      statusCode: 200,
      body: categories,
    }).as('getCategories');
  });

  cy.fixture('products.json').then((products) => {
    // Todos os produtos
    cy.intercept('GET', '**/products*', (req) => {
      const url = new URL(req.url);
      const featured = url.searchParams.get('featured');
      const category = url.searchParams.get('category');
      const q = url.searchParams.get('q');

      let result = products;

      if (featured === 'true') {
        result = result.filter((p) => p.featured);
      }
      if (category) {
        result = result.filter((p) => p.category === category);
      }
      if (q) {
        const term = q.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
      }

      req.reply({
        statusCode: 200,
        body: result,
      });
    }).as('getProducts');

    // Produto por ID
    cy.intercept('GET', '**/products/*', (req) => {
      const id = Number(req.url.split('/').pop());
      const item = products.find((p) => p.id === id);
      if (item) {
        req.reply({ statusCode: 200, body: item });
      } else {
        req.reply({ statusCode: 404, body: {} });
      }
    }).as('getProductById');
  });
});

/**
 * Intercepta as rotas da API simulando ERRO (ex: 500 Internal Server Error)
 */
Cypress.Commands.add('mockApiError', (statusCode = 500) => {
  cy.intercept('GET', '**/products*', {
    statusCode,
    body: { message: 'Erro interno no servidor' },
  }).as('getProductsError');

  cy.intercept('GET', '**/banners*', {
    statusCode,
    body: { message: 'Erro ao carregar banners' },
  }).as('getBannersError');

  cy.intercept('GET', '**/categories*', {
    statusCode,
    body: { message: 'Erro ao carregar categorias' },
  }).as('getCategoriesError');
});

/**
 * Intercepta as rotas da API com DELAY para validar o estado de Loading
 */
Cypress.Commands.add('mockApiDelay', (delayMs = 1500) => {
  cy.fixture('products.json').then((products) => {
    cy.intercept('GET', '**/products*', {
      statusCode: 200,
      body: products,
      delay: delayMs,
    }).as('getProductsDelayed');
  });
});

/**
 * Intercepta com lista VAZIA para testar estado de ausência de resultados
 */
Cypress.Commands.add('mockApiEmpty', () => {
  cy.intercept('GET', '**/products*', {
    statusCode: 200,
    body: [],
  }).as('getProductsEmpty');
});

