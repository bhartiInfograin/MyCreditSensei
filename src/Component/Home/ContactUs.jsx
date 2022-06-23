import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaStreetView, FaEnvelopeOpen, FaPhoneAlt } from 'react-icons/fa';
import { Zoom, Roll } from "react-awesome-reveal";

export default function ContactUs() {
    return (
        <>
            <section className='contact_section'>

                <Container>
                    <Row>
                        <Col lg={12} md={12}>

                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={5} sm={12} className="px-0 ">
                            <div className='contact_img '>
                                <div className='contact_box1 '>
                                    <h5 className='contact_box1_heading'>REQUEST A CALL BACK</h5>
                                    {/* <div className='bb1'></div>
                                    <div className='bb2'></div> */}
                                    <div className='contact_box1_content mt-3'>


                                        <div className="phone_box">
                                            <p className="mb-3"><FaPhoneAlt className='phone_icon contactus_icon' /></p>
                                            <div className="phone">
                                                <p>Call Us</p>
                                                <p className='fw-4'>+(222) 999 - 3333</p>
                                            </div>
                                        </div>
                                        <div className="mail_box">
                                            <p className="mb-3"><FaEnvelopeOpen className='mail_icon contactus_icon' /></p>
                                            <div className="mail">
                                                <p>Mail Us</p>
                                                <p className='fw-4'>support@creditsensei.com</p>
                                            </div>
                                        </div>
                                        <div className="mb-3 address_box">
                                            <p><FaStreetView className='steetview contactus_icon' /></p>
                                            <div className="address">
                                                <p>Address</p>
                                                <p className='fw-4'>Street address</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8} md={7} sm={12} className="px-0">
                            <div className="contact_box ">
                                <h2 className='contactus_heading'>Contact Us</h2>
                                {/* <div className='bb1'></div>
                                    <div className='bb2'></div> */}
                                <div className='contactus_form '>

                                    <Form.Control type="text" placeholder="Your Name" className="mb-3" />
                                    <Form.Control type="text" placeholder="Your Email" className="mb-3" />
                                    <Form.Control type="text" placeholder="Your Number" className="mb-3" />
                                    <Form.Control as="textarea" rows={3} className="mb-3" placeholder="Your Message" />
                                    <button className='btn contactus_submit'>Submit</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </section>


        </>
    )
}



