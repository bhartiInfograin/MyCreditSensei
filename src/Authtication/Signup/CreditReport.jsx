import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AuthHeader from '../AuthCommon/AuthHeader';
import Footer from '../../Common/Footer';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import AOS from 'aos';
import "aos/dist/aos.css";

import Step2 from './Step2';

export default function CreditReport() {
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
    }, []);
    return (
        <>
            <AuthHeader text={"Already a member"} action={"Log In"}  url={"/login"} />
            <section>
                <Container >
                    <Row>
                        <Col lg={{span:10,offset:1}} md={12}>

                      
                <div className='creditreportmain my-3'>

               
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='creditReport_prgressbar'>
                                <Step2 progress={2} />
                            </div>

                            <div className='creditReport_content'>
                                <h4> Welcome Username , your Credit Sensei account is set up!</h4>
                                <p className='text-center'>Choose a plan to link your 3 bureau credit report.<br />This will not create an inquiry or lower your credit score.</p>
                            </div>

                            <div className='creditReport_sub_head '>
                                <h4>SKIP CREDIT REPORT STEP</h4>
                            </div>
                        </Col>
                    </Row>

            
                   

                    <Row className="mt-4 ">
                        <Col lg={6} md={6}>
                            <div className='basiccard'>
                                <div className='pricing_plan' >
                                    <h4>SmartCredit  BASIC</h4>
                                    <hr />
                                    <div className='line'></div>
                                    <p className='price'> $88 /mo</p>
                                    <p className='cancleText'>CANCEL ANY TIME</p>
                                    <hr />
                                    <div className='line'></div>
                                    <ul className='ml-15'>
                                        <li><FaCheckCircle className='checkicon' />Unlimited Credit Sensei Disutes</li>
                                        <li> <FaCheckCircle className='checkicon' />Monthlt 3 Bureaos Reports & Scores</li>
                                    </ul>
                                    <h3>SmartCredit</h3>
                                    <ul className='ml-27'>
                                        <li> <FaCheckCircle className='checkicon' />Identity Theft Insurance ($1m)</li>
                                        <li><FaCheckCircle className='checkicon' />Credit Monitoring & Alerts (TU)</li>
                                    </ul>
                                    <p className='text-center para'>Includes SmartCredit Money Manager with 2 monthly Transunion Report &  Score updates in SmartCredit.</p>
                                    <Link to="/basic" className='navmenubutton'><Button className='signBtn btn-dark' style={{background:"#004C4D" ,border:"none"}}  >Link</Button></Link>
                                </div>
                            </div>
                        </Col>

                        <Col lg={6} md={6}>
                            <div className='basicprimimum'>
                                <div className='pricing_plan' >
                                    <h4>SmartCredit  PREMIUM</h4>
                                    <hr />
                                    <div className='line'></div>
                                    <p className='price'> $99 /mo</p>
                                    <p className='cancleText'>CANCEL ANY TIME</p>
                                    <hr />
                                    <div className='line'></div>
                                    <ul className='ml-15'>
                                        <li> <FaCheckCircle className='checkicon' />Unlimited Credit Sensei Disutes</li>
                                        <li> <FaCheckCircle className='checkicon' />Monthlt 3 Bureaos Reports & Scores</li>
                                    </ul>
                                    <h3>SmartCredit</h3>
                                    <ul className='ml-27'>
                                        <li> <FaCheckCircle className='checkicon' />Identity Theft Insurance ($1m)</li>
                                        <li><FaCheckCircle className='checkicon' />Credit Monitoring & Alerts (TU)</li>
                                    </ul>
                                    <p className='text-center para'>Includes SmartCredit Money Manager with 2 monthly Transunion Report & Score updates in SmartCredit.</p>
                                    <Link to="/primium" className='navmenubutton'> <Button className='signBtn btn-dark ' style={{background:"#004C4D" ,border:"none"}}>Link </Button></Link>
                                </div>

                            </div>
                            <div className='mt-5'></div>
                        </Col>
                    </Row>
                    </div>
                    </Col>
                    </Row>
                </Container>

            </section>

            <Footer />

        </>
    )
}
