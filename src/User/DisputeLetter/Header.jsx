import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Row, Col, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../asset/image/newlogo.png';
import { Link, useNavigate } from 'react-router-dom'

const Header = (props) => {
    let Navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear();
        Navigate("/login");


    }
    return (
        <>
            <section className='selectdipute_header p-0'>
                {/* <Container fluid>
                    <Row>
                        <Col lg={4}>
                            <div>
                                <Link to="/creditItem" className=''><img src={logo} className="headerlogo" /></Link>
                            </div>

                        </Col>
                        <Col lg={4}>
                            <div className='dispute_heading'>
                                {props.title}
                            </div>

                        </Col>
                        <Col lg={4}>
                            <div className='dispute_user'>
                                < FaUserCircle />
                            </div>
                        </Col>
                    </Row>
                </Container> */}


                <Navbar bg="light" expand="lg" sticky="top" className='navbarcontainer'>
                    <Container fluid>
                        <Navbar.Brand href="#">  <div className='navbarBrand'>
                            <Link to="/creditItem" className='navmenubutton'><img src={logo} className="d-inline-block align-top headerlogo " /></Link>
                        </div></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="m-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link>
                                    <div className='dispute_heading'>
                                        {props.title}
                                    </div>
                                </Nav.Link>
                            </Nav>
                            <Form className="d-flex">
                                <NavDropdown id="dropdown" className='profileDropdown' title={<FaUserCircle className='usericon' />}  >
                                    <NavDropdown.Item >Hi  </NavDropdown.Item>
                                    <NavDropdown.Item><Link to="/myaccount" className='navmenu'>My Account</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to="#" className='navmenu'>FAQ</Link></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4" onClick={logout}>Sign Out</NavDropdown.Item>
                                </NavDropdown>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </section>
        </>
    )
}



export default Header;