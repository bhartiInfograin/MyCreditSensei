import React from 'react';
import AuthHeader from '../AuthCommon/AuthHeader';
import Footer from "../../Common/Footer"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Forgotpwd() {
    return (
        <>
        
            <AuthHeader text={"Don’t have an account?"} action={"Signup"} url={"/createAccount"} />
            <section className="login_section">
            <Container className='mt-3'>
                <Row>
                    <Col lg={{span:10, offset:1}} md={12}>

                   
                <Row>
                    <Col lg={4} md={4} className="px-0" >
                    <div className="singupform">
                            <h5>Credit Repair used to be hard</h5>
                            <p>We made it easy</p>
                            <h3>Your beginning to a better credit score !</h3>
                        </div>
                    </Col>
                    <Col lg={8} md={8} className="px-0">
                        <div className='mainform '>
                            <div className='Login_form '>
                                <h4>FORGOT PASSWORD</h4>
                                <p className='text-center'>Please enter your email address and we'll send you a link to reset your password.</p>
                                {/* <Form.Label className="mt-3 fromlabel"  >Email</Form.Label> */}
                                <Form.Control type="email" placeholder="Enter Your Email" />
                                <Link to="/resetpassword" className='navmenubutton'><Button className='signBtn mt-4 btn-dark fromlabel'> Send Otp </Button></Link> 
                                {/* <Button className='signBtn mt-4 btn-dark '> <Link to="/resetpassword" className='navmenubutton'>Send Otp</Link> </Button> */}
                            </div>
                        </div>
                    </Col>
                </Row>
                </Col>
                </Row>
            </Container>
          </section>
            <Footer />





        </>
    )
}

