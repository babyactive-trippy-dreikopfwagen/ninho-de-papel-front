export class ProductDetailPage {
  getHeaderLogo() {
    return cy.get('img[src*="logo"], div').should('exist');
  }

  getDividerLine() {
    return cy.get('div').filter(':visible').should('exist');
  }

  getProductTitle() {
    return cy.contains(/Papel Kraft|Papel Cartão|Papel Vegetal|Papel Sulfite|Papel de Seda|Papel Couché/i);
  }

  getProductPrice() {
    return cy.contains(/R\$\s*\d+,\d{2}/i);
  }

  getQuantityValue() {
    return cy.contains('Quantidade').parent().contains(/\d+/);
  }

  increaseQuantity() {
    cy.contains('Quantidade').parent().find('div, button').last().click({ force: true });
    return this;
  }

  decreaseQuantity() {
    cy.contains('Quantidade').parent().find('div, button').first().click({ force: true });
    return this;
  }

  clickAddToCart() {
    cy.contains(/Adicionar ao Carrinho/i).click({ force: true });
    return this;
  }

  clickGoHomeBtn() {
    cy.contains(/Ir para Home/i).click({ force: true });
    return this;
  }
}

