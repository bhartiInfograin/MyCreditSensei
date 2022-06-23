import React from 'react';
import AuthHeader from '../AuthCommon/AuthHeader';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import Step2 from './Step2';
import Footer from '../../Common/Footer';


export default function ActivateAc() {
    return (
        <>
            <AuthHeader />
            <section className='activeaccount'>
                <Container className=' my-3'>
                    <Row>
                      
                        <Col lg={{span:10, offset:1}} md={12} xs={12}>
                        <div className='creditreportmain '>
                            <div className='creditReport_prgressbar'>
                                <Step2 progress={2} />
                            </div>

                            <div className='activate_content '>
                                <h3> SmartCredit Account</h3>
                                <div className='acctivate_msg'>
                                    <h4>Successful connection! Reactivate your Smart Credit account to link your 3 bureau credit report.</h4>
                                </div>
                                <Link to="" ><Button className='activateBtn mt-3' style={{background:"#14684e", border:"none",fontSize:"15px",fontWeight: "bold"}}> ACTIVATE</Button></Link>
                                  
                                  <p className='unlink'>Unlink SmartCredit Account from Credit Sensei
                                  <hr/> 
                                  </p>
                                <p>
                                Need help ?  Call us  (222)999-333
                                Monday - Friday 9AM to 5PM 
                                </p>
                            </div>

                            <div className='activte_back_button'>
                            <Link to="/login" className='navmenubutton'> <Button className='signBtn btn-dark mt-3'>Back</Button></Link>
                            </div>
                            </div>
                        </Col>
                    </Row>

                  
                </Container>
            </section>
            <Footer />


        </>
    )
}
