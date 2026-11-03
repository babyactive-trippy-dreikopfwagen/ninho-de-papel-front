import { HomePage } from '../support/pages/HomePage';

describe('Home Screen (Wireframe 2)', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    // Intercepta requisições com dados mockados de sucesso
    cy.mockApiSuccess();
    homePage.visit();
  });

  it('deve carregar a tela inicial e aguardar a resposta da API', () => {
    cy.wait('@getBanners');
    cy.wait('@getCategories');
    cy.wait('@getProducts');
  });

  it('deve exibir a seção "Sugestões" com carrossel de banners', () => {
    homePage.getSuggestionsSection();
    cy.contains('Promoção de Papéis').should('be.visible');
  });

  it('deve exibir a seção "Em destaque" com produtos e botão de seta', () => {
    homePage.getFeaturedSection();
    cy.contains('Papel Kraft Natural A4').should('be.visible');
  });

  it('deve exibir a seção "Tipos de Papéis" com as categorias de papelaria', () => {
    homePage.getPaperTypesSection();
    cy.contains('Papel Kraft').should('be.visible');
    cy.contains('Papel Cartão').should('be.visible');
    cy.contains('Papel Vegetal').should('be.visible');
    cy.contains('Papel Sulfite').should('be.visible');
    cy.contains('Papel de Seda').should('be.visible');
    cy.contains('Papel Couché').should('be.visible');
  });

  it('deve navegar para a listagem ao clicar na categoria "Papel Kraft"', () => {
    homePage.clickCategory('Papel Kraft');
    cy.contains(/Catálogo Completo|Papel Kraft/i).should('be.visible');
  });

  it('deve navegar para a tela de detalhes ao clicar em um card de produto', () => {
    homePage.clickFirstProduct();
    cy.contains(/Sobre este papel|Adicionar ao Carrinho/i).should('be.visible');
  });
});

