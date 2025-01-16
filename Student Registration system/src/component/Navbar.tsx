import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Student Registration</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Search</Nav.Link>
            <Nav.Link as={Link} to="/user-form">User Form</Nav.Link>
            <Nav.Link as={Link} to="/course-form">Course Form</Nav.Link>
            <Nav.Link as={Link} to="/data-table">Data Table</Nav.Link>
            <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
            <Nav.Link as={Link} to="/showReport">Show Report</Nav.Link>
            <Nav.Link as={Link} to="/addReport">Add Report</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
