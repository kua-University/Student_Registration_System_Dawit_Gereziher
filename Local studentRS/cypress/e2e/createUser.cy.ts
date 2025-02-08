describe('Admin User Creation', () => {

  before(() => {
    cy.visit('http://localhost:5173');

    cy.get('input[name="email"]').type('admin@admin');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();


    cy.contains('Dashboard').should('be.visible');

    
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/login',
      body: {
        email: 'admin@admin',
        password: 'admin'
      }
    }).then((response) => {

      const token = response.body.token; 
      Cypress.env('authToken', token); 

    });
  });

  it('Should create a new user', function () {
    const authToken = Cypress.env('authToken'); 

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/users',
      headers: {
        Authorization: `Bearer ${authToken}` 
      },
      body: {
        name: 'John Doe',
        email: 'johnd1@example.com',
        password: 'User@123',
        role: 'student'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
     expect(response.statusText).to.include("Created");
    });
  });
});
