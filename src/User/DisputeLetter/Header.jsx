import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Row, Col, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../asset/image/newlogo.png';
import { Link, useNavigate } from 'react-router-dom'

const Header = (props) => {
    const bundledata = JSON.parse(sessionStorage.getItem("BUNDLEDATA"));
    var transunionBorrowerName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.first
    let Navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear();
        Navigate("/login");


    }
    return (
        <>
            <section className='selectdipute_header p-0'>
              
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
                                    <NavDropdown.Item >Hi {transunionBorrowerName}  </NavDropdown.Item>
                                    <NavDropdown.Item><Link to="/myaccount" className='navmenu'>My Account</Link></NavDropdown.Item>
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