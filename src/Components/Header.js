import React, { Component } from 'react'
import { Container, Navbar, Nav, NavbarCollapse, NavbarToggle } from 'react-bootstrap'
import logo from '../img/Icon_bag.png'
import '../CSS/navbar.css'

export default class Header extends Component {
  render() {
    return (
        
     <Navbar collapseOnSelect expand="md" className="gradient-navbar" variant='light'>
        <Container>
            <Navbar.Brand href="/" className="brand-group">
                <img
                    src={logo}
                    height="100"
                    width="100"
                    className="d-inline-block align-top"
                    alt="Logo"
                />
                <h1 className="brand-group">BagCraft</h1>
            </Navbar.Brand>

            <NavbarToggle aria-controls="responsive-navbar-nav"  />
            <NavbarCollapse id="responsive-navbar-nav" >
                <Nav className="ms-auto">
                    <Nav.Link href="/"> Главная </Nav.Link>
                    <Nav.Link href="/Pages/products"> Продукты </Nav.Link>
                    <Nav.Link href="/Pages/history"> История </Nav.Link>
                    <Nav.Link href="/Pages/support"> Поддержка </Nav.Link>
                    <Nav.Link href="/Pages/payment"> Оплата </Nav.Link>
                </Nav>
            </NavbarCollapse >
        </Container>
      </Navbar>
    )
  }
}
