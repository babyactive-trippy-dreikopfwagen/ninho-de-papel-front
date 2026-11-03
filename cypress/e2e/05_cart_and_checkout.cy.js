import { HomePage } from '../support/pages/HomePage';
import { ProductDetailPage } from '../support/pages/ProductDetailPage';
import { CartPage } from '../support/pages/CartPage';

describe('Fluxo de Carrinho e Finalização de Pedido', () => {
  const homePage = new HomePage();
  const detailPage = new ProductDetailPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.mockApiSuccess();
    homePage.visit();
  });

  it('deve exibir o estado de carrinho vazio quando não houver itens', () => {
    // Navega para o carrinho vazio
    homePage.visit();
    cy.visit('/Cart');
    cartPage.getEmptyState().should('be.visible');
    cartPage.getShopNowButton().should('be.visible');
  });

  it('deve adicionar produto ao carrinho, visualizar valores e finalizar compra', () => {
    // 1. Entra no detalhe do primeiro produto
    homePage.clickFirstProduct();

    // 2. Adiciona 2 unidades
    detailPage.increaseQuantity();
    detailPage.clickAddToCart();

    // 3. Acessa o carrinho
    cy.visit('/Cart');
    cartPage.getScreenTitle().should('be.visible');

    // 4. Verifica subtotal e cálculo de frete
    cartPage.getSubtotal().should('be.visible');
    cartPage.getTotal().should('be.visible');

    // 5. Finaliza o pedido
    cartPage.clickCheckout();
  });
});

