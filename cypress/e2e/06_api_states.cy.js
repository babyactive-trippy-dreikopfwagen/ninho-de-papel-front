import { HomePage } from '../support/pages/HomePage';

describe('Tratamento de Estados da API (Carregamento, Erro e Vazio)', () => {
  const homePage = new HomePage();

  it('deve exibir o componente de Loading durante o carregamento dos dados da API', () => {
    // Intercepta com atraso de 1.5s
    cy.mockApiDelay(1500);
    homePage.visit();

    // Verifica que a mensagem de loading aparece enquanto aguarda
    cy.contains(/Carregando novidades da papelaria/i).should('be.visible');

    // Após o término do delay, a página é renderizada
    cy.contains('Sugestões', { timeout: 4000 }).should('be.visible');
  });

  it('deve exibir a mensagem de Erro e botão de Retry em caso de falha HTTP 500', () => {
    // Simula erro 500 no servidor
    cy.mockApiError(500);
    homePage.visit();

    // Deve exibir o componente de Erro
    cy.contains('Ops!').should('be.visible');
    cy.contains(/Não foi possível carregar os produtos/i).should('be.visible');
    cy.contains(/Tentar novamente/i).should('be.visible');

    // Ao clicar em "Tentar novamente" com a API restaurada, deve carregar com sucesso
    cy.mockApiSuccess();
    cy.contains(/Tentar novamente/i).click({ force: true });
    cy.contains('Sugestões', { timeout: 4000 }).should('be.visible');
  });

  it('deve exibir o estado de ausência de resultados quando a API retornar lista vazia', () => {
    // Simula API retornando lista vazia []
    cy.mockApiEmpty();
    homePage.visit();

    // Deve exibir o componente de EmptyState
    cy.contains(/Nenhum produto em destaque no momento/i).should('be.visible');
  });
});

