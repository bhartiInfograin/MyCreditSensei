import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaFacebook, FaInstagram,FaCalendarDay, FaEnvelopeOpen, FaPhoneAlt } from 'react-icons/fa';
import logo from '../asset/image/newWhiteLogo.png';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <section className='footersec'>
                <Container fluid>
                    <Row>
                        <Col lg={4} md={4}>
                            <div className="footerlogocontainer">
                                <Link to="/" className='navmenubutton'> <Image className='footer_logo ' src={logo} /></Link>
                                <p className='footer_text'>Fixing your own credit used to require a ton of work and a bit of luck. But now, My Credit Sensei makes fixing your credit and increasing your credit score fast and easy.</p>
                            </div>
                        </Col>
                        <Col lg={4} md={4} className='mt-3'>
                            <div className="footercol2 mt-3 ">
                                <div className='company'>
                                    <h6 className='companyHeading '>Company</h6>
                                    <p><FaCalendarDay className=' footericon' />Mon - Fri 9am to 5pm PST</p>
                                    <p><FaEnvelopeOpen className='footericon' /><a  className="footerLink" href='mailto:support@mycreditsensei.com'>support@mycreditsensei.com</a></p>
                                    <p><FaPhoneAlt className='footericon' /><a  className="footerLink" href='tel:+(832)270-4968'>+(832)270-4968</a></p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={4} className='mt-3'>
                            <div className="footerProduct mt-3  ">
                                <div>
                                    <h6 className='companyHeading'>Follow us</h6>
                                    <ul className='socialicon'>
                                        <li><a href="http://www.facebook.com/mycreditsensei"><FaFacebook className="contactus_icon" /></a></li>
                                        <li><a href="https://instagram.com/mycreditsensei"><FaInstagram className="contactus_icon" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={7} md={5} sm={12}>
                            <div className='footer_tag' >
                                <p>© 2022 MY CREDIT SENSEI, All rights reserved.</p>
                            </div>
                        </Col>
                        <Col lg={5} md={7} sm={12}>
                            <div className="bootom_footerProduct">
                                <ul className='footercompanylist'>
                                    <li><Link to="/" >Home</Link></li>
                                    <li><Link to="/how_it_work" >How It Work</Link></li>
                                    <li><Link to="/princing" >Pricing</Link></li>
                                    <li><Link to="/termscondition" >Terms Of Use</Link></li>
                                    <li><Link to="/privacypolicy">Privacy Policy</Link></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}



