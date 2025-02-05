const chai = require('chai');
const { expect } = require("chai");
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust path as needed

chai.use(chaiHttp);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE1NmM2NmFhNjliNzM1NjY0ZmY1NjYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg3NzM1MTQsImV4cCI6MTczODg1OTkxNH0.aRfi0QlXe6gwXezN6N2zeaTiGemjpv-whJ1QaD0ynu0";

describe('Payment Controller Tests', function() {
    this.timeout(40000); 
    let paymentId = "676c5008d3fb79c6d520d605";

    it('should create a new payment', async () => {
        const res = await chai
            .request(app)
            .post('/api/payments')
            .set("Authorization", `Bearer ${token}`) // Add token
            .send({ amount: 100, paymentMethod: 'card' });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('paymentId'); // Adjusted based on controller response
        paymentId = res.body.paymentId;
    });

    it('should retrieve all payments', async () => {
        const res = await chai.request(app)
            .get('/api/payments')
            .set("Authorization", `Bearer ${token}`); // Add token

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should retrieve a payment by ID', async () => {
        const res = await chai.request(app)
            .get(`/api/payments/${paymentId}`)
            .set("Authorization", `Bearer ${token}`); // Add token

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('_id', paymentId); // Adjusted for MongoDB's "_id"
    });

    it('should update a payment', async () => {
        const res = await chai
            .request(app)
            .put(`/api/payments/${paymentId}`)
            .set("Authorization", `Bearer ${token}`) // Add token
            .send({ status: 'completed' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'completed');
    });

    it('should delete a payment', async () => {
        const res = await chai.request(app)
            .delete(`/api/payments/${paymentId}`)
            .set("Authorization", `Bearer ${token}`); // Add token

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Payment deleted successfully');
    });
});
