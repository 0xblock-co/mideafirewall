
import Image from "next/image";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function HeaderTop() {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} fixed="top" className="mdf__top_navbar">
          <Container>
            <Navbar.Brand href="#">
              <Image
                className="mdf__logo_modal"
                layout='fill'
                src="/images/logo.png"
                alt="A globe icon with filter and text."
              /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbarMediaFirewall-expand-lg`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbarMediaFirewall-expand-lg`}
              aria-labelledby={`offcanvasNavbarMediaFirewallLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarMediaFirewallLabel-expand-lg`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Products</Nav.Link>
                  <Nav.Link href="#action2">Demo </Nav.Link>
                  <Nav.Link href="#action3">Pricing </Nav.Link>
                  <Nav.Link href="#action4">Documentation </Nav.Link>
                  <Nav.Link href="#action5">Log In</Nav.Link>
                </Nav>
                <Button variant="outline-primary" className='rounded-pill fw-bold border-2'>Create Account</Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
