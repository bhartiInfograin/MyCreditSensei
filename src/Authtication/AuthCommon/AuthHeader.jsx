import React from 'react';
import { Navbar, Container } from 'react-bootstrap'
import logo from '../../asset/image/newlogo.png';
import {Link} from 'react-router-dom'


export default function AuthHeader(props) {
    return (
        <>
           <Navbar  className='navbarcontainer'  collapseOnSelect expand="lg" bg="light" variant="light" sticky='top'>
                <Container fluid >
                
                    <Navbar.Brand href="#home">
                        <div className='navbarBrand'>
                        <Link to = "/" className='navmenubutton'><img src={logo} className="d-inline-block align-top headerlogo " /></Link>
                        </div>
                    </Navbar.Brand> 
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                        {props.text} <a href={props.url}>{props.action }</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </ Navbar >
        </>
    )
}
