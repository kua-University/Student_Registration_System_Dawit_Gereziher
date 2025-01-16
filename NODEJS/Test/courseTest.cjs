
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust path to your server.js
const connectDB  = require('../config/database'); // Adjust based on your project structure

const { expect } = chai;
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE1NmM2NmFhNjliNzM1NjY0ZmY1NjYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzcwMTI3ODMsImV4cCI6MTczNzA5OTE4M30.bDrs1vuuQBCVqFtIBZo6xxYhXw1uzaXbBhXXgY6xHtA';

describe('User Controller Tests', () => {
  let userId = '67151d50336cf6336982c1fb';

  // Ensure database is connected before running tests

  it('should create a new user',async function(){
    this.timeout(30000); 
    const res = await chai
      .request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123'});

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    userId = res.body.id;
  });

  it('should retrieve all users',async function(){
    this.timeout(20000); 
    const res = await chai
      .request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should retrieve a user by ID', async function(){
    this.timeout(20000); 
    const res = await chai
      .request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', userId);
  });

  it('should update a user', async function(){
    this.timeout(20000); 
    const res = await chai
      .request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated User' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('name', 'Updated User');
  });

  it('should delete a user', async function() {
    this.timeout(20000); 
    const res = await chai
      .request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'User deleted successfully');
  });
});
