import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Zoom } from "react-awesome-reveal";
import { FaUserClock, FaStickyNote, FaChartBar, FaPercentage, FaThumbsUp, FaChartPie } from 'react-icons/fa';



export default function CreditScore() {
    return (
        <>


            <section className='card_section'>
                <Container  >
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
                            <div><FaUserClock className='service_icon'/></div>
                                <div className='service_text'>
                                    <h6>FINANCIAL CONSULTATION</h6>
                                    <p>
                                    Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                         
                                           
                                    </p>
                                </div>
                            </div>

                            {/* <Card className="creditscore_card">
                                    <Card.Body className='cardcontanier'>
                                        <Card.Title> <div className='card_icon'><FaUserClock /></div> </Card.Title>
                                        <Card.Title >FINANCIAL CONSULTATION </Card.Title>
                                        <Card.Text className='card_text' >
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum amet veniam quo ducimus
                                            debitis consectetur vel in porro officiis corrupti sed molestiae maxime id, excepturi architecto optio
                                            sit alias tenetur!
                                        </Card.Text>
                                    </Card.Body>
                                </Card> */}
                        </Col>
                        <Col lg={4} md={4} sm={12}>

                        <div className='service'>
                            <div><FaStickyNote className='service_icon'/></div>
                                <div className='service_text'>
                                    <h6>CREDIT REPORTS</h6>
                                    <p>
                                    Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                         
                                           
                                    </p>
                                </div>
                            </div>
                            {/* <Card className="creditscore_card" >
                                <Card.Body className='cardcontanier'>
                                    <Card.Title> <div className='card_icon'><FaStickyNote /></div> </Card.Title>
                                    <Card.Title >CREDIT REPORTS </Card.Title>
                                    <Card.Text className='card_text'>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum amet veniam quo ducimus
                                        debitis consectetur vel in porro officiis corrupti sed molestiae maxime id, excepturi architecto optio
                                        sit alias tenetur!
                                    </Card.Text>
                                </Card.Body>
                            </Card> */}
                        </Col>

                        <Col lg={4} md={4} sm={12}>

                        <div className='service'>
                            <div><FaChartBar className='service_icon'/></div>
                                <div className='service_text'>
                                    <h6>PLANNING & CONDUCTING</h6>
                                    <p>
                                    Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                         
                                           
                                    </p>
                                </div>
                            </div>
                            {/* <Card className="creditscore_card" >
                                <Card.Body className='cardcontanier'>
                                    <Card.Title> <div className='card_icon'><FaChartBar /></div> </Card.Title>
                                    <Card.Title >PLANNING & CONDUCTING </Card.Title>
                                    <Card.Text className='card_text'>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum amet veniam quo ducimus
                                        debitis consectetur vel in porro officiis corrupti sed molestiae maxime id, excepturi architecto optio
                                        sit alias tenetur!
                                    </Card.Text>
                                </Card.Body>
                            </Card> */}
                        </Col>

                    </Row>

                    <Row  >
                        <Col lg={4} md={4} sm={12} >

                        <div className='service'>
                            <div><FaPercentage className='service_icon'/></div>
                                <div className='service_text'>
                                    <h6>TAX CLEARING</h6>
                                    <p>
                                    Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                         
                                           
                                    </p>
                                </div>
                            </div>

                            {/* <Card className="creditscore_card">
                                <Card.Body className='cardcontanier'>
                                    <Card.Title> <div className='card_icon'><FaPercentage /></div> </Card.Title>
                                    <Card.Title >TAX CLEARING</Card.Title>
                                    <Card.Text className='card_text' >
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum amet veniam quo ducimus
                                        debitis consectetur vel in porro officiis corrupti sed molestiae maxime id, excepturi architecto optio
                                        sit alias tenetur!
                                    </Card.Text>
                                </Card.Body>
                            </Card> */}
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                        <div className='service'>
                            <div><FaThumbsUp className='service_icon'/></div>
                                <div className='service_text'>
                                    <h6>BUSINESS FORECAST</h6>
                                    <p>
                                    Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                         
                                           
                                    </p>
                                </div>
                            </div>
                            {/* <Card className="creditscore_card" >
                                <Card.Body className='cardcontanier'>
                                    <Card.Title> <div className='card_icon'><FaThumbsUp /></div> </Card.Title>
                                    <Card.Title >BUSINESS FORECAST</Card.Title>
                                    <Card.Text className='card_text'>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum amet veniam quo ducimus
                                        debitis consectetur vel in porro officiis corrupti sed molestiae maxime id, excepturi architecto optio
                                        sit alias tenetur!
                                    </Card.Text>
                                </Card.Body>
                            </Card> */}
                        </Col>

                        <Col lg={4} md={4} sm={12}>

                        <div className='service'>
                            <div><FaChartPie className='service_icon'/></div>
                                <div className='service_text'>
                                    <h6>TECHNOLOGY ADVISING</h6>
                                    <p>
                                    Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                         
                                           
                                    </p>
                                </div>
                            </div>


                            {/* <Card className="creditscore_card" >
                                <Card.Body className='cardcontanier'>
                                    <Card.Title> <div className='card_icon'><FaChartPie /></div> </Card.Title>
                                    <Card.Title >TECHNOLOGY ADVISING</Card.Title>
                                    <Card.Text className='card_text'>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum amet veniam quo ducimus
                                        debitis consectetur vel in porro officiis corrupti sed molestiae maxime id, excepturi architecto optio
                                        sit alias tenetur!
                                    </Card.Text>
                                </Card.Body>
                            </Card> */}
                        </Col>

                    </Row>





                </Container>


            </section>

        </>
    )

}
