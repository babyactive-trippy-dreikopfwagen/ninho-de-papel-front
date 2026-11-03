export class HomePage {
  visit() {
    cy.visit('/');
    return this;
  }

  getHeader() {
    return cy.get('header, [role="banner"], div').contains('Ninho de Papel').should('exist');
  }

  getSearchToggleBtn() {
    // Procura botão com ícone de busca no header
    return cy.get('[data-testid="search-toggle"], svg, i, div').filter(':visible').first();
  }

  getMenuDrawerBtn() {
    // Procura o botão hambúrguer
    return cy.contains(/menu/i).parent();
  }

  getCartBtn() {
    // Procura o botão de sacola / carrinho
    return cy.contains(/carrinho|shopping/i).parent();
  }

  getSuggestionsSection() {
    return cy.contains('Sugestões').should('be.visible');
  }

  getFeaturedSection() {
    return cy.contains('Em destaque').should('be.visible');
  }

  getPaperTypesSection() {
    return cy.contains('Tipos de Papéis').should('be.visible');
  }

  clickFeaturedArrow() {
    return cy.contains('Em destaque')
      .parent()
      .find('[role="button"], div')
      .last()
      .click({ force: true });
  }

  clickCategory(categoryName) {
    cy.contains(categoryName).click({ force: true });
    return this;
  }

  getFirstProductCard() {
    return cy.contains(/R\$/i).first().parentsUntil('[role="button"], div').last();
  }

  clickFirstProduct() {
    cy.contains(/Papel/i).first().click({ force: true });
    return this;
  }
}

