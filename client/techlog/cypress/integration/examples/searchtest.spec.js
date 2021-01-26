describe('===SEARCH REPORT TEST===', () => {

  it.only('should load reports on start', () => {
    cy.intercept('GET', 'http://localhost:3002/reports', { fixture: 'reports.json' }).as('getAllReports');
    cy.visit('http://localhost:3000/search');
    cy.wait('@getAllReports');

    cy.get('.searchitem__container').should('have.length', 2);
  })

});