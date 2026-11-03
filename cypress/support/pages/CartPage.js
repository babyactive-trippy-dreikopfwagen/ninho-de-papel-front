export class CartPage {
  getScreenTitle() {
    return cy.contains(/Meu Carrinho/i);
  }

  getEmptyState() {
    return cy.contains(/Seu carrinho está vazio/i);
  }

  getShopNowButton() {
    return cy.contains(/Explorar Papéis/i);
  }

  getCartItems() {
    return cy.contains(/R\$/i);
  }

  getSubtotal() {
    return cy.contains('Subtotal').parent().contains(/R\$/i);
  }

  getTotal() {
    return cy.contains('Total').parent().contains(/R\$/i);
  }

  clickCheckout() {
    cy.contains(/Finalizar Pedido/i).click({ force: true });
    return this;
  }

  clickClearCart() {
    cy.contains(/Limpar/i).click({ force: true });
    return this;
  }
}

