import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

export default function Price_Table() {
    return (
        <>
            <section className='mt-5 p-3' >
                <Container>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='pricing_sec2_header '>
                                <h3>Out with the old…in with My Credit Sensei</h3>
                                <p className='sec2_content'>
                                    Big credit repair companies are better at deleting dollars from your pocket than negative accounts from your credit report. That’s why we created My Credit Sensei.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}  >
                            <div className='sec2_table' >

                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>My Credit Sensei</th>
                                            <th>Lexington law</th>
                                            <th> creditrepair.com®</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='table_count'>Cost</td>
                                            <td>$39
                                                per month</td>
                                            <td>$89 - $129
                                                per month</td>
                                            <td> $12-$19 per month</td>
                                        </tr>
                                        <tr>
                                            <td className='table_count'>Dispute per month</td>
                                            <td>Unlimited</td>
                                            <td>2-3</td>
                                            <td>2-3</td>
                                        </tr>
                                        <tr>
                                            <td className='table_count'>Bureaus can ignore disputes</td>
                                            <td>No</td>
                                            <td>Yes</td>
                                            <td>Yes</td>
                                        </tr>

                                    </tbody>
                                </Table>

                            </div>
                            <div className='sec2_button mt-3 mb-5'>

                                <Link to="/createAccount" className='navmenubutton'><Button className='btn-dark tablebutton' >Get Started</Button></Link>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}