import React from 'react';
import logo from '../asset/image/newlogo.png';
import { Navbar, Container, Nav,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'



export default function Header() {
    
    return (

        <>
            <Navbar bg="light" expand="lg" className='navbarcontainer' sticky="top">
                <Container fluid>
                    <Navbar.Brand href="#">  
                    <div className='navbarBrand'>
                        <Link to="/" className='navmenubutton'><img src={logo} className="d-inline-block align-top headerlogo " /></Link>
                    </div></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                        <Nav className=" my-2 my-lg-0" navbarScroll  >
                    
                            <Nav.Link className='navlink '><Link to="/" className='navmenu'>HOME</Link></Nav.Link>
                            <Nav.Link className='navlink'><Link to="/how_it_work" className='navmenu'>HOW IT WORKS</Link></Nav.Link>
                            <Nav.Link className='navlink'><Link to="/princing" className='navmenu'>PRICING</Link></Nav.Link>
                            <Link to="/login" className='navmenubutton'><Button className='loginBtn ' variant="dark">LOGIN </Button></Link>
                            <Link to="/createAccount" className='navmenubutton'> <Button className='signupBtn ' variant="outline-dark" >SIGNUP </Button></Link>  
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )

}
