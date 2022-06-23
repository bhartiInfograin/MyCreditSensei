import React from 'react';
import AuthHeader from '../AuthCommon/AuthHeader';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Step2 from './Step2';
import Footer from '../../Common/Footer';
import { FaCheckCircle } from 'react-icons/fa';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link} from 'react-router-dom'



export default function VerifyReport() {


    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    }; 
    return (

        <>
            <AuthHeader />
            <section className='my-3'>
                <Container >
                    <Row>
                        <Col lg={{span:10,offset:1}}>

                    
                    <div className='creditreportmain '>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='creditReport_prgressbar'>
                                <Step2 progress={2} />
                            </div>
                            <div className='creditReport_content'>
                                <h3>SmartCredit  PREMIUM</h3>
                                <p className='text-center'>Review and fill in the fields below to begin your Smart Credit set up.</p>

                            </div>
                        </Col>
                    </Row>

                  
                    <Row>
                        <Col lg={6} md={6}>
                            <div className='personaldeatails mt-3'>
                                <h5>Personal Details</h5>
                                <Form.Control className="mt-3" placeholder="First name" />
                                <Form.Control className="mt-3" placeholder="Last name" />
                                <Form.Control className="mt-3" placeholder="Email (Username)" />
                                <Form.Control className="mt-3" placeholder="Phone Number" />
                                <Form.Control className="mt-3" placeholder="Address" />
                                <Form.Control className="mt-3" placeholder="City" />
                                <Form.Control className="mt-3" placeholder="State" />
                                <Form.Control className="mt-3" placeholder="Zip" />
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            <div className='verify_pricing_plan'>
                            <h4>SmartCredit  PREMIUM</h4>
                            <hr />
                                <div className='line'></div>
                                <p className='price'> $99 /mo</p>
                                <p className='cancleText'>CANCEL ANY TIME</p>
                                <hr />
                                <div className='line'></div>
                                <ul>
                                    <li> <FaCheckCircle className='checkicon' />Unlimited Credit Sensei Disutes</li>
                                    <li> <FaCheckCircle className='checkicon' />Monthlt 3 Bureaos Reports & Scores</li>
                                </ul>
                                <h3>SmartCredit</h3>
                                <ul className='ml-24'>
                                    <li> <FaCheckCircle className='checkicon' />Identity Theft Insurance ($1m)</li>
                                    <li><FaCheckCircle className='checkicon' />Credit Monitoring & Alerts (TU)</li>
                                </ul> 
                             <p className='text-center para'>Includes SmartCredit Money Manager with 2 monthly Transunion Report & Score updates in SmartCredit.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} md={6}>
                            <div className='personaldeatails mt-1'>
                                <h5>Change Password</h5>
                                <Form.Label className="mt-3 fromlabel">Create Password</Form.Label>
                                <Form.Control className="" placeholder="Create Password" />
                                <Form.Label className="mt-3 fromlabel">Security Question</Form.Label>
                                <FormControl fullWidth>
                                    <Select
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Lorem ipsum dolor, sit amet consectetur adipi?</MenuItem>
                                        <MenuItem value={20}>Lorem ipsum dolor, sit amet consectetur adipi?</MenuItem>
                                        <MenuItem value={30}>Lorem ipsum dolor, sit amet consectetur adipi?</MenuItem>
                                    </Select>
                                </FormControl>
                                <Form.Label className="mt-3 fromlabel">Security Answer</Form.Label>
                                <Form.Control className="" placeholder="Security Answer" />
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            <div className='Identity mt-1'>
                                <h5>Identity</h5>
                                <Form.Label className="mt-3 fromlabel">Social Security # (LAST 4 DIGITS)</Form.Label>
                                <Form.Control className="" placeholder="xxxx" />

                                <Form.Label className="mt-3 fromlabel">Date Of Birth</Form.Label>
                                <Form.Control type="date" placeholder="mm/dd/yyyy" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className="verifybutton">
                        <Link to = "/activateac"  className='navmenubutton'><Button className='signBtn btn-dark' >Next</Button></Link>
                        </div>
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
