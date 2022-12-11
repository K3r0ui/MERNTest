import React from 'react'
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
function Navbars() {
  return (
    <>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/">Pentabell</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  {localStorage.getItem('token') ? <>    <Nav className="me-auto">
      <Nav.Link href="/taskpage">TaskToDo</Nav.Link>
    </Nav>

    <Nav>
    <Nav.Link as={Link} to='/logout'>
      Logout
    </Nav.Link>
    </Nav></>: <>    <Nav>
      <Nav.Link href="/auth">S'authentifier</Nav.Link>
    </Nav></>}

  </Navbar.Collapse>
  </Container>
</Navbar>
</>
  )
}

export default Navbars