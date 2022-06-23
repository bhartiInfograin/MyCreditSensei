import React, { useEffect, useState } from 'react';
import UserHeader from '../Common/UserHeader';
import { Container, Row, Col, Button, Modal, Accordion } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Footer from '../../Common/Footer';
import { textAlign } from '@mui/system';


export default function DisputeLetter() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   


    return (
        <>
            <UserHeader />


            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> Create Dispute Letter</Modal.Title>
                    <FaTimes onClick={handleClose} />
                </Modal.Header  >
                <Modal.Body>
                    <div className='usename_modal'>
                        <h5>Create a dispute letter for each bureau.
                            Select a credit bureau to begin:</h5>
                        <Button className='usename_modal1_btn'>TRANSUNION</Button>
                        <Button className='usename_modal1_btn'>EXPERIAN</Button>
                        <Button className='usename_modal1_btn'>EQUIFAX</Button>
                    </div>
                </Modal.Body>
            </Modal>

            <div>
                <h1  className="text-center"style={{color:"red"}}>Work in progress</h1>
            </div>
            <Container>
                <Row>
                    <Col lg={{span:10,offset:1}} md={12}>
                        <div className='mt-5 disputeletter_btn'>
                            <Button onClick={handleShow} >CREATE TRANSUNION DISPUTE</Button>
                        </div>
                    </Col>
                </Row>
                </Container>
                <section className='mb-5'>
                <Container>
                <Row>
                    <Col lg={{span:10, offset:1}} md={12}>
                        <Accordion className='mt-3'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>CREATED <span className='accordianspan'>0</span></Accordion.Header>
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
                                <Accordion.Header>SENT<span className='accordianspan'>0</span></Accordion.Header>
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
                                <Accordion.Header>COMPLETED<span className='accordianspan'>0</span></Accordion.Header>
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
                    </Col>
                </Row>
                </Container>
                </section>
               
            <Footer/>
        </>
    )
}
