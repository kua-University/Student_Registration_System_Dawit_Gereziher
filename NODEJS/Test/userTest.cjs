const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const app = require("../server"); // Adjust path as needed

chai.use(chaiHttp);

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE1NmM2NmFhNjliNzM1NjY0ZmY1NjYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg3NzYyMjUsImV4cCI6MTczODg2MjYyNX0.RX_bXG6I6yc29E5oA-LnnM82cedOpggOuRzgcwcYRj0";
describe("User Controller Tests", function () {
  this.timeout(40000); // Set timeout for all tests inside this block

  let userId = "667151bf7336cf6336982c1f3";
  //app();

  it("should create a new user", async function () {
    const res = await chai
      .request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test User",
        email: `test${Date.now()}@example.com`, // Unique email to avoid duplication
        password: "password123",
        role: "student",
      });

    expect(res.status).to.equal(201); // Ensure correct response status
    expect(res.body).to.have.property("_id"); // Use "_id" instead of "id"
    userId = res.body._id;
  });

  it("should retrieve all users", async function () {
    const res = await chai.request(app).get("/api/users").set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should retrieve a user by ID", async function () {
    const res = await chai.request(app).get(`/api/users/${userId}`).set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id", userId); // Use "_id" instead of "id"
  });

  it("should update a user", async function () {
    const res = await chai
      .request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated User" });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("name", "Updated User");
  });

  it("should delete a user", async function () {
    const res = await chai.request(app).delete(`/api/users/${userId}`).set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "User deleted successfully");
  });
});
