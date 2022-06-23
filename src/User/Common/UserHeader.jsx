import React from 'react';
import logo from '../../asset/image/newlogo.png';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export default function UserHeader() {
    const bundledata = JSON.parse(sessionStorage.getItem("BUNDLEDATA"));
    var transunionBorrowerName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.first


    let Navigate = useNavigate()

    const logout  = () => {
       sessionStorage.clear();
       Navigate("/login");


    }

    return (
        <>

            <Navbar bg="light" expand="lg" sticky="top" className='navbarcontainer'>
                <Container fluid>
                    <Navbar.Brand href="#">  <div className='navbarBrand'>
                        <Link to="/useHome" className='navmenubutton'><img src={logo} className="d-inline-block align-top headerlogo " /></Link>
                    </div></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                        <Nav className=" my-2 my-lg-0" navbarScroll  >
                            <Nav.Link className='navlink '><Link to="/useHome" className='navmenu'>HOME</Link></Nav.Link>
                            <Nav.Link className='navlink'><Link to="/creditItem" className='navmenu'>CREDIT ITEMS</Link></Nav.Link>
                            <Nav.Link className='navlink'><Link to="/history" className='navmenu'>MY HISTORY</Link></Nav.Link>
                           
                            <NavDropdown id="dropdown" className='profileDropdown' title={ <FaUserCircle className='usericon' />}  >
                                <NavDropdown.Item >Hi  {transunionBorrowerName}</NavDropdown.Item>
                                <NavDropdown.Item><Link to="/myaccount" className='navmenu'>My Account</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="#" className='navmenu'>FAQ</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4" onClick={logout}>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>




        </>
    )
}
