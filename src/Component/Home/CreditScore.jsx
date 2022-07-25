import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserClock, FaStickyNote, FaChartBar, FaPercentage, FaThumbsUp, FaChartPie } from 'react-icons/fa';



export default function CreditScore() {
    return (
        <>
            <section className='card_section'>

                <Container>
                    <Row>
                        <Col  lg={12} md={12}>
                        <div className='cardsection_heading'>
                                <h2>Our Service</h2>
                            </div>
                        </Col>

                        <Col lg={12} md={12} sm={12}>
                            <div className='service'>
                                <div><FaStickyNote className='service_icon' /></div>
                                <div className='service_text'>
                                    <h6>CREDIT REPORTS</h6>
                                    <p>
                                        The credit report is created by combining data from multiple banks and financial organisations into one complete document. It is a collection of data on the complete spectrum of the customer's credit related activity, including repayment record, credit card limit, prior loan or credit card application, any settled or written off loans, and any other credit related activity.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {/* <Container  >
                    <Row>
                        <Col lg={12} md={12} >
                            <div className='cardsection_heading'>
                                <h2>Our Services</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row  >
                        <Col lg={4} md={4} sm={12} >
                            <div className='service'>
                                <div><FaUserClock className='service_icon' /></div>
                                <div className='service_text'>
                                    <h6>FINANCIAL CONSULTATION</h6>
                                    <p>
                                        When you go through important life changes or events, it is a good idea to get counsel from a financial adviser. Speaking with a professional can assist you in navigating these changes and making modifications to your overall financial strategy.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                            <div className='service'>
                                <div><FaStickyNote className='service_icon' /></div>
                                <div className='service_text'>
                                    <h6>CREDIT REPORTS</h6>
                                    <p>
                                        The credit report is created by combining data from multiple banks and financial organisations into one complete document. It is a collection of data on the complete spectrum of the customer's credit related activity, including repayment record, credit card limit, prior loan or credit card application, any settled or written off loans, and any other credit related activity.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                            <div className='service'>
                                <div><FaChartBar className='service_icon' /></div>
                                <div className='service_text'>
                                    <h6>PLANNING & CONDUCTING</h6>
                                    <p>
                                    Responsible for organising, carrying out, and supervising the analysis of the credit reporting systems and the handling of disputes to ensure the integrity and correctness of the data.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row  >
                        <Col lg={4} md={4} sm={12} >

                            <div className='service'>
                                <div><FaPercentage className='service_icon' /></div>
                                <div className='service_text'>
                                    <h6>TAX CLEARING</h6>
                                    <p>
                                    If you wish to dispute and remove the tax liability from the credit bureaus records, we are here to help you with removing all your tax liabilities and get tax clearance certificate by yourself.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                            <div className='service'>
                                <div><FaThumbsUp className='service_icon' /></div>
                                <div className='service_text'>
                                    <h6>BUSINESS FORECAST</h6>
                                    <p>
                                    Business forecasting is the projection of future developments of a business or sector based on previous and present data trends and patterns. This business technique aids in the allocation of resources and the strategic planning of prospective initiatives, activities, and expenses.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                            <div className='service'>
                                <div><FaChartPie className='service_icon' /></div>
                                <div className='service_text'>
                                    <h6>TECHNOLOGY ADVISING</h6>
                                    <p>
                                    My Credits Sensei offers technology consultants years of expertise, knowledge, and insight gained from working in a variety of IT organisations.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container> */}
            </section>
        </>
    )
}
