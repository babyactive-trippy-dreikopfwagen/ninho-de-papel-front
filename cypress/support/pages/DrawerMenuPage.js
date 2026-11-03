export class DrawerMenuPage {
  getDrawer() {
    return cy.get('[role="navigation"], div').contains('Todos os Produtos').parent();
  }

  getCloseBtn() {
    return cy.get('div').filter(':visible').contains(/✕|x/i);
  }

  clickClose() {
    return cy.get('div').filter(':visible').contains(/✕|x/i).click({ force: true });
  }

  getMenuItems() {
    return {
      home: () => cy.contains('Home'),
      todosOsProdutos: () => cy.contains('Todos os Produtos'),
      emDestaque: () => cy.contains('Em destaque'),
      carrinho: () => cy.contains('Carrinho'),
    };
  }

  clickMenuItem(name) {
    cy.contains(name).click({ force: true });
    return this;
  }
}

