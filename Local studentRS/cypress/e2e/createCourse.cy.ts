describe('Course Creation', () => {

  before(() => {
    // Visit the login page
    cy.visit('http://localhost:5173'); 

    // Perform login to get the auth token
    cy.get('input[name="email"]').type('admin@admin'); 
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();

    
    cy.contains('Student Registration Dashboard').should('be.visible');


    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/login',
      body: {
        email: 'admin@admin', 
        password: 'admin',    
      },
    }).then((response) => {
      const token = response.body.token; 
      Cypress.env('authToken', token); 
    });
  });

  it('Should create a new course', function () {
    const courseData = {
      title: 'New Course Title',
      description: 'This is a description of the new course.',
      credits: 4,
      instructor: 'Instructor Name',
      price: 100,
      duration: '3 months',
    };
 
    const authToken = Cypress.env('authToken'); 

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/courses', 
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: courseData,
    }).then((response) => {
      // Assert that the course was created successfully
      expect(response.status).to.eq(201);
      expect(response.statusText).to.eq('Created');
       expect(response.body).to.have.property('title', courseData.title);
      expect(response.body).to.have.property('description', courseData.description);
      expect(response.body).to.have.property('credits', courseData.credits);
      expect(response.body).to.have.property('instructor', courseData.instructor);
      expect(response.body).to.have.property('price', courseData.price);
      expect(response.body).to.have.property('duration', courseData.duration);
     console.log(response);
    });
  });
});
