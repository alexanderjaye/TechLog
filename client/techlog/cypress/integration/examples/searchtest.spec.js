/* eslint-disable jest/valid-expect-in-promise */
describe('===E2E TESTS===', () => {

  // stubbed (mock api call) test with fixtures 
  it('SEARCH 1 - should load reports on start', () => {
    cy.intercept('GET', 'http://localhost:3002/reports', { fixture: 'reports.json' }).as('getAllReports');
    cy.visit('http://localhost:3000/search');
    cy.wait('@getAllReports'); // wait for get request
    cy.get('.searchitem__container').should('have.length', 2);
  });

  // Testing actual db
  it('SEARCH 2 - should receive reports from the db', () => {
    const reportMock = {
      title: "Post Report X",
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
    }

    cy.request('POST', 'http://localhost:3002/reports', reportMock)
      .then((response) => {
        cy.visit('http://localhost:3000/search');
        cy.get('.searchitem__container:last-of-type h3').should('contain', reportMock.title);
        cy.request('DELETE', `http://localhost:3002/reports/${response.body._id}`);
        cy.visit('http://localhost:3000/search');
        cy.get('.searchitem__container:last-of-type h3').should('not.contain', reportMock.title);
      });
    
  });

  it('SEARCH 3 - should remove items manually through More Details modal', () => {
    const reportMock = {
      title: "Newest Deletable Report",
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
    }
    cy.request('POST', 'http://localhost:3002/reports', reportMock).then((response) => {
      
      cy.visit('http://localhost:3000/search');
      // cy.get('.searchitem__container:last-of-type h3').should('contain', reportMock.title)
      cy.get('.searchitem__container:last-of-type button')
        .click();
      cy.get('.modal__container button').contains(/delete/i)
        .click();
      cy.visit('http://localhost:3000/search');
      cy.get('.searchitem__container:nth-last-child(1) h3').should('not.contain', reportMock.title);

    })
    
  });

  it('EDIT should load report by id for edit', () => {
    const reportMock = {
      title: "Report For Edit",
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
      
    };
    
    cy.request('POST', 'http://localhost:3002/reports', reportMock).then((response) => {
      cy.visit('http://localhost:3000/edit');
      cy.get('.getform__input input').type(response.body.reportId);
      cy.get('.getform__input #get-report').click();
      cy.get('.form__container #report__title__input').should('have.value', reportMock.title);
      cy.request('DELETE', `http://localhost:3002/reports/${response.body._id}`);
      
    })
  });

  it('EDIT should update report on submit', () => {
    
    const reportMock = {
      title: "Report For Put",
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
      
    };
    
    cy.request('POST', 'http://localhost:3002/reports', reportMock).then((response) => {
      cy.visit('http://localhost:3000/edit');
      cy.get('.getform__input input').type(response.body.reportId);
      cy.get('.getform__input #get-report').click();
      const editedTitle = ' Edit'
      cy.get('.form__container #report__title__input').type(editedTitle)
      cy.get('.form__container .report__submit__btn').click();
  
      cy.visit('http://localhost:3000/edit');
      cy.get('.getform__input input').type(response.body.reportId);
      cy.get('.getform__input #get-report').click();
      cy.get('.form__container #report__title__input').should('have.value', response.body.title + editedTitle);
      cy.request('DELETE', `http://localhost:3002/reports/${response.body._id}`);
      
    });
  })
  

});
