import { HomePage } from '../support/pages/HomePage';
import { DrawerMenuPage } from '../support/pages/DrawerMenuPage';

describe('Menu Lateral / Drawer Navigation (Wireframe 1)', () => {
  const homePage = new HomePage();
  const drawerPage = new DrawerMenuPage();

  beforeEach(() => {
    cy.mockApiSuccess();
    homePage.visit();
    // Abre o Drawer Menu
    homePage.getMenuDrawerBtn().click({ force: true });
  });

  it('deve exibir todos os itens do menu conforme Wireframe 1', () => {
    cy.contains('Home').should('be.visible');
    cy.contains('Todos os Produtos').should('be.visible');
    cy.contains('Em destaque').should('be.visible');
    cy.contains('Carrinho').should('be.visible');
  });

  it('deve navegar para "Todos os Produtos" ao clicar no item correspondente', () => {
    drawerPage.clickMenuItem('Todos os Produtos');
    cy.contains(/Catálogo Completo/i).should('be.visible');
  });

  it('deve navegar para "Em destaque" e exibir os produtos filtrados', () => {
    drawerPage.clickMenuItem('Em destaque');
    cy.contains(/Produtos em Destaque/i).should('be.visible');
  });

  it('deve navegar para a tela de "Carrinho" pelo menu', () => {
    drawerPage.clickMenuItem('Carrinho');
    cy.contains(/Meu Carrinho/i).should('be.visible');
  });

  it('deve fechar o menu ao clicar no botão "✕"', () => {
    drawerPage.clickClose();
    // Confirma que voltou para a Home
    cy.contains('Sugestões').should('be.visible');
  });
});

