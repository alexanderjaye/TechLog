describe('===SEARCH REPORT TEST===', () => {

  // stubbed (mock api call) test with fixtures 
  it('should load reports on start', () => {
    cy.intercept('GET', 'http://localhost:3002/reports', { fixture: 'reports.json' }).as('getAllReports');
    cy.visit('http://localhost:3000/search');
    cy.wait('@getAllReports'); // wait for get request
    cy.get('.searchitem__container').should('have.length', 2);
  });

  // Testing actual db.
  it('should receive reports from the db', () => {
    const reportMock = {
      title: "Post Report",
      description: "test test test",
      tags: [
        "tag1",
        "tag2"
      ],
      steps: [
        "step1",
        "step2"
      ],
      images: [],
      reportId: 98765432,
      _id: "9876"
    }
    cy.request('POST', 'http://localhost:3002/reports', reportMock);
    cy.visit('http://localhost:3000/search');
    cy.get('.searchitem__container:last-of-type h3').should('contain', reportMock.title);
  });

});