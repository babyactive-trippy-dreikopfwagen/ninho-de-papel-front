export class CatalogPage {
  getScreenTitle() {
    return cy.contains(/Catálogo Completo|Produtos em Destaque/i);
  }

  getSearchInput() {
    return cy.get('input[placeholder*="Pesquisar"], input[type="text"]');
  }

  typeSearch(term) {
    this.getSearchInput().clear().type(term);
    return this;
  }

  clearSearch() {
    this.getSearchInput().clear();
    return this;
  }

  clickFilterChip(categoryName) {
    cy.contains(categoryName).click({ force: true });
    return this;
  }

  getProductCards() {
    return cy.contains(/R\$/i);
  }

  getEmptyState() {
    return cy.contains(/Nenhum papel encontrado|Nenhum produto/i);
  }

  clickFirstProduct() {
    cy.contains(/Papel/i).first().click({ force: true });
    return this;
  }
}

