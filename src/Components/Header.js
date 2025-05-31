import React, { Component } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import logo from '../img/Icon_bag.png'
import '../CSS/navbar.css'
import { Routes, Route } from 'react-router-dom';
import Footer from '../Components/Footer'
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import History from '../Pages/History';
import Support from '../Pages/Support';
import Payment from '../Pages/Payment';

export default class Header extends Component {
    render() {
        return (
          <>
            <Navbar collapseOnSelect expand="md" className="gradient-navbar" variant="light">
                <Container>
                    <Navbar.Brand href="/" className="brand-group">
                      <img
                          src={logo}
                          className="head_image"
                          alt="Logo"
                      />
                      <h1 className="brand-group">BagCraft</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="ms-auto">
                            <Nav.Link href="/"> Главная </Nav.Link>
                            <Nav.Link href="/Pages/products"> Продукты </Nav.Link>
                            <Nav.Link href="/Pages/payment"> Оплата </Nav.Link>
                            <Nav.Link href="/Pages/history"> История </Nav.Link>
                            <Nav.Link href="/Pages/support"> Поддержка </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="separator-bar"  />

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Pages/products" element={<Products />} />
                <Route exact path="/Pages/payment" element={<Payment />} />
                <Route exact path="/Pages/history" element={<History />} />
                <Route exact path="/Pages/support" element={<Support />} />
            </Routes>

            <Footer />
          </>
        )
    }
}
