import React from 'react';
import { Container, Row, Col,Image } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube,FaCalendarDay,FaEnvelopeOpen,FaPhoneAlt } from 'react-icons/fa';
// import logo from '../../asset/image/

export default function Footer() {
    return (
        <>
            <Container fluid style={{backgroundColor:"#333333" }}>
                <Row >

                    <Col lg={4} md={4} className='p-3'>
                        <div className="p-3">
                            {/* <Image className='footer_logo ' src={logo}/> */}
                            <p className='footer_content mt-3'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
                                error distinctio. Soluta blanditiis reprehenderit est cumque corrupti deleniti
                                sint cupiditate ab consequatur,
                                magnam ex, nihil similique nulla expedita? Possimus, numquam?
                            </p>
                        </div>
                    </Col>
                    <Col lg={4} md={4} className='p-3'>
                        <div className="footercol2 p-3">
                            <h1 className='companyHeading mt-3'>Company</h1>
                            <p><FaCalendarDay  className='m-2 '/>Mon - Fri 9am to 5pm PST</p>
                            <p><FaEnvelopeOpen  className='m-2'/><a className='footerLink' href='mailto:support@creditsensei.com'>support@creditsensei.com</a></p>
                            <p><FaPhoneAlt  className='m-2'/><a  className="footerLink" href='tel:+(832)270-4968'>+(832)270-4968 </a></p> 
                        </div>
                    </Col>
                    <Col lg={4} md={4} className='p-3'>
                        <div className="footercol2 p-3">
                            <h1 className='companyHeading mt-3'>Product</h1>
                            <ul className='footercompanylist'>
                                <li>Home</li>
                                <li>How It Work</li>
                                <li>Pricing</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} md={12}>
                        <ul className='socialicon'>
                            <li> <FaFacebook /></li>
                            <li>  <FaInstagram /></li>
                            <li>  <FaTwitter /></li>
                            <li>  <FaYoutube /></li>
                        </ul>
                    </Col>
                    <Col lg={12} md={12}>
                        <ul className='socialtext'>
                            <li>Terms Of Use</li>
                            <li>Privacy Policy</li>
                            <li>© 2020 MY CREDIT SENSEI, All rights reserved.</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
