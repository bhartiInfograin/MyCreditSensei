import React, { useEffect } from 'react';
import AuthHeader from '../AuthCommon/AuthHeader';
import Footer from "../../Common/Footer"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import $ from 'jquery';

export default function EmailRecovery() {


    useEffect(() => {
        $("#login_section2").hide()
    }, [])

    // api: https://stage-sc.consumerdirect.com/email-recovery/
    //   payload : 
    //   currentPage: step-1
    //   firstName: bharti
    //   lastName: lokhande


    // https://stage-sc.consumerdirect.com/email-recovery/
    //payload:
    // currentPage: step-2
    // ssn: 899-01-0015
    // ssn-fake: ***********
    // birthDate: 03/17/1999

    const submitHander = () => {
        $("#login_section2").show()
        $("#login_section").hide()

    }




    return (
        <>
            <AuthHeader text={"Don’t have an account?"} action={"Signup"} url={"/createAccount"} />
            <section className="login_section" id="login_section">
                <Container className='mt-3'>
                    <Row>
                        <Col lg={{ span: 10, offset: 1 }} md={12}>


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
                                            <h4>Email Recovery</h4>
                                            <p className='text-center'>Please complete the information requested below so that we may locate your account.</p>
                                            {/* <Form.Label className="mt-3 fromlabel"  >Email</Form.Label> */}
                                            <Form.Label className="mt-3 fromlabel"  >First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your first name"
                                                className='validate'
                                                name="firstname"
                                                // onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />

                                            <Form.Label className="mt-3 fromlabel"  >Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your Last name"
                                                className='validate'
                                                name="lastname"
                                                // onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <Button className='signBtn mt-4 btn-dark fromlabel' onClick={submitHander}>Submit</Button>

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section className="login_section2" id="login_section2">
                <Container className='mt-3'>
                    <Row>
                        <Col lg={{ span: 10, offset: 1 }} md={12}>


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
                                            <h4>Email Recovery</h4>
                                            <p className='text-center'>Please complete the information requested below so that we may locate your account.</p>
                                            {/* <Form.Label className="mt-3 fromlabel"  >Email</Form.Label> */}
                                            <Form.Label className="mt-3 fromlabel"  >Social Security Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your social security number"
                                                className='validate'
                                                name="firstname"
                                                // onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />

                                            <Form.Label className="mt-3 fromlabel"  >Birth Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Enter your birthdate"
                                                className='validate'
                                                name="lastname"
                                                // onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <Button className='signBtn mt-4 btn-dark fromlabel'>Submit</Button>

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
