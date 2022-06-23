import React from 'react'
import { Container, Row, Col,Navbar,Nav } from 'react-bootstrap';
export default function ProfileNav(props) {
    return (
        <>
           
            <div className='mt-3'>
            <Container className='py-3'>
                <Row>
                    <Col lg={12} md={12}>
                  <div className="profile_nav">
                  <Navbar.Brand href="#">{props.title}</Navbar.Brand>
                    <Nav>
                            <Nav.Link href={props.url1} className='navmenu' >{props.menu1}</Nav.Link>
                            <Nav.Link href={props.url3} className='navmenu' >
                            {props.menu3}
                            </Nav.Link>
                        </Nav>
                  </div>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}
