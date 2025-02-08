describe('User Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
  });

  it('should log in successfully with valid credentials', () => {
    cy.get('input[name="email"]').type('admin@admin'); 
    cy.get('input[name="password"]').type('admin'); 
    cy.get('button[type="submit"]').click(); 

   
    cy.url().should('include', '/');
    cy.contains('Student Registration Dashboard').should('be.visible');
  });

  it('should show an error with invalid credentials', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email or password.').should('be.visible');
  });
});
