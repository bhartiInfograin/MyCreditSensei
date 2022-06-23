import React from 'react';
import Footer from '../../Common/Footer';
import UserHeader from '../Common/UserHeader';
import { Container, Row, Col, Button,Accordion } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import ProfileNav from './Common/ProfileNav';


export default function UserCreditReport() {
  return (
      <>
     <UserHeader/>
     <ProfileNav
                title="Myaccount"
                menu1="Profile"
                menu2="My Docs"
                menu3="Credit Report"
                url1="myaccount"
                url2="mydocs"
                url3="usercreditreport" />
     <Container className='creditreportmain mt-3'>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='creditReport_content'>
                                <h3> Choose a plan to link your 3 bureau credit report.</h3>
                                <p className='text-center'>This will not create an inquiry or lower your credit score.</p>

                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col lg={6} md={6}>
                            <div className='basiccard'>
                                <div className='pricing_plan'>
                                    <h4>SmartCredit  BASIC</h4>
                                    <div className='line'></div>
                                    <p className='price'> $88 /mo</p>
                                    <p className='cancleText'>CANCEL ANY TIME</p>
                                    <div className='line'></div>
                                    <ul className='ml-15'>
                                        <li><FaCheckCircle className='checkicon' />Unlimited Credit Sensei Disutes</li>
                                        <li> <FaCheckCircle className='checkicon' />Monthlt 3 Bureaos Reports & Scores</li>
                                    </ul>
                                    <h3>SmartCredit</h3>
                                    <ul className='ml-24'>
                                        <li> <FaCheckCircle className='checkicon' />Identity Theft Insurance ($1m)</li>
                                        <li><FaCheckCircle className='checkicon' />Credit Monitoring & Alerts (TU)</li>
                                    </ul>
                                    <p className='text-center'>Includes SmartCredit Money Manager with 2 monthly Transunion Report &  Score updates in SmartCredit.</p>
                                    <Link to="/basic" className='navmenubutton'><Button className='signBtn btn-dark mt-3'  style={{background:"#004C4D" ,border:"none"}}>Link</Button></Link>
                                </div>
                            </div>
                        </Col>

                        <Col lg={6} md={6}>
                            <div className='basicprimimum'>
                                <div className='pricing_plan'>
                                    <h4>SmartCredit  PREMIUM</h4>
                                    <div className='line'></div>
                                    <p className='price'> $99 /mo</p>
                                    <p className='cancleText'>CANCEL ANY TIME</p>
                                    <div className='line'></div>
                                    <ul className='ml-15'>
                                        <li> <FaCheckCircle className='checkicon' />Unlimited Credit Sensei Disutes</li>
                                        <li> <FaCheckCircle className='checkicon' />Monthlt 3 Bureaos Reports & Scores</li>
                                    </ul>
                                    <h3>SmartCredit</h3>
                                    <ul className='ml-24'>
                                        <li> <FaCheckCircle className='checkicon' />Identity Theft Insurance ($1m)</li>
                                        <li><FaCheckCircle className='checkicon' />Credit Monitoring & Alerts (TU)</li>
                                    </ul>
                                    <p className='text-center'>Includes SmartCredit Money Manager with 2 monthly Transunion Report & Score updates in SmartCredit.</p>
                                    <Link to="/primium" className='navmenubutton'> <Button className='signBtn btn-dark mt-3'  style={{background:"#004C4D" ,border:"none"}}>Link </Button></Link>
                                </div>
                            </div>
                            <div className='mt-5'></div>
                        </Col>
                    </Row>
                </Container>

                <Container>
                <Row>
                    <Col lg={12} md={12}>
                        <div className='mydoc_faq mt-5'>
                            <h1>FAQ’S</h1>
                        </div>
                    </Col>
                    <Col lg={12} md={12}>
                        <div className='mt-3 p-2'>
                            <Accordion >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Lorem epsum doller sit amet?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Lorem epsum doller sit amet?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Lorem epsum doller sit amet?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Lorem epsum doller sit amet?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Lorem epsum doller sit amet?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Col>
                </Row>
            </Container>




     <Footer/>

        
      </>
  )
}
