import { HomePage } from '../support/pages/HomePage';
import { CatalogPage } from '../support/pages/CatalogPage';

describe('Catálogo, Busca e Filtros de Categoria', () => {
  const homePage = new HomePage();
  const catalogPage = new CatalogPage();

  beforeEach(() => {
    cy.mockApiSuccess();
    homePage.visit();
    // Navega para o catálogo
    homePage.clickCategory('Papel Kraft');
  });

  it('deve listar os produtos da categoria selecionada', () => {
    cy.contains('Papel Kraft Natural A4').should('be.visible');
  });

  it('deve permitir buscar produtos em tempo real pelo campo de busca', () => {
    catalogPage.typeSearch('Sulfite');
    cy.contains('Papel Sulfite A4 Resma').should('be.visible');
    cy.contains('Papel Kraft').should('not.exist');
  });

  it('deve alternar entre categorias clicando nos chips de filtro', () => {
    catalogPage.clickFilterChip('Papel Cartão');
    cy.contains('Papel Cartão Branco A3').should('be.visible');
  });

  it('deve exibir mensagem de estado vazio quando nenhum produto for encontrado', () => {
    catalogPage.typeSearch('produto_inexistente_xyz_123');
    catalogPage.getEmptyState().should('be.visible');
  });
});

