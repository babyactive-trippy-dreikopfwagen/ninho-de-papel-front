import { HomePage } from '../support/pages/HomePage';
import { ProductDetailPage } from '../support/pages/ProductDetailPage';

describe('Detalhes do Produto (Wireframe 3)', () => {
  const homePage = new HomePage();
  const detailPage = new ProductDetailPage();

  beforeEach(() => {
    cy.mockApiSuccess();
    homePage.visit();
    homePage.clickFirstProduct();
  });

  it('deve exibir o cabeçalho com a logo e a linha divisória (Wireframe 3)', () => {
    detailPage.getHeaderLogo();
    detailPage.getDividerLine();
  });

  it('deve exibir os detalhes do produto e suas especificações', () => {
    detailPage.getProductTitle().should('be.visible');
    detailPage.getProductPrice().should('be.visible');
    cy.contains(/Sobre este papel/i).should('be.visible');
  });

  it('deve incrementar e decrementar a quantidade desejada', () => {
    detailPage.increaseQuantity();
    detailPage.getQuantityValue().should('contain', '2');
    detailPage.decreaseQuantity();
    detailPage.getQuantityValue().should('contain', '1');
  });

  it('deve adicionar o produto ao carrinho', () => {
    // Escuta evento de alerta nativo do navegador
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    detailPage.clickAddToCart();
    cy.contains(/Adicionar ao Carrinho/i).should('be.visible');
  });

  it('deve retornar para a tela inicial ao clicar no botão "Ir para Home" (Wireframe 3)', () => {
    detailPage.clickGoHomeBtn();
    // Confirma que voltou para a Home
    cy.contains('Sugestões').should('be.visible');
  });
});

