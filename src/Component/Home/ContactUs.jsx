import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaStreetView, FaEnvelopeOpen, FaPhoneAlt } from 'react-icons/fa';
import { CONTACTUS } from '../../Url';
import axios from 'axios';
import { useEffect } from 'react';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import {Link}  from 'react-router-dom'

export default function ContactUs() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        $("#name").hide()
        $("#email").hide()
        $("#number").hide()
        $("#msg").hide()
    }, [])

    $(".validate").focus(function () {
        $("#name").hide()
        $("#email").hide()
        $("#number").hide()
        $("#msg").hide()
    })


    const handleSubmit = () => {
        const article = {
            "name": name,
            "email": email,
            "number": phone,
            "message": message
        }

        const data = axios.post(CONTACTUS, article)
            .then((res) => {
                console.log(res)
                if (res.data.statusMsg === "name required") {
                    $("#name").show()
                }
                if (res.data.statusMsg === "email required") {
                    $("#email").show()
                }
                if (res.data.statusMsg === "number required") {
                    $("#number").show()
                }
                if (res.data.statusMsg === "message required") {
                    $("#msg").show()
                }
                if (res.data.statusMsg === "Email sent successfully") {

                    return toast.success('Message sent successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
                    

                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    }




    return (
        <>
            <section className='contact_section'>

                <Container>
                    <Row>
                        <Col lg={12} md={12}>

                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={5} sm={12} className="px-0 ">
                            <div className='contact_img '>
                                <div className='contact_box1 '>
                                    <h5 className='contact_box1_heading'>REQUEST A CALL BACK</h5>
                                    <div className='contact_box1_content mt-3'>


                                        <div className="phone_box">
                                            <p className="mb-3"><FaPhoneAlt className='phone_icon contactus_icon' /></p>
                                            <div className="phone">
                                                <p>Call Us</p>
                                                <p ><a href="tel:+(832)270-4968" className='fw-4'>+(832)270-4968</a></p>
                                            </div>
                                        </div>
                                        <div className="mail_box">
                                            <p className="mb-3"><FaEnvelopeOpen className='mail_icon contactus_icon' /></p>
                                            <div className="mail">
                                                <p>Mail Us</p>
                                                <p ><a href="mailto:support@mycreditsensei.com" className='fw-4'>support@mycreditsensei.com</a></p>
                                            </div>
                                        </div>
                                        <div className="mb-3 address_box">
                                            <p><FaStreetView className='steetview contactus_icon' /></p>
                                            <div className="address">
                                                <p>Address</p>
                                                <p className='fw-4'>7334 Antione,Dr Houston,TX 77088</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8} md={7} sm={12} className="px-0">
                            <div className="contact_box ">
                                <h2 className='contactus_heading'>Contact Us</h2>
                                <div className='contactus_form '>
                                    <p className='error1' id="name">* Enter your name</p>

                                    <Form.Control
                                        type="text"
                                        placeholder="Your Name"
                                        className="mb-3 validate"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />

                                    <p className='error1' id="email">* Enter valid email</p>

                                    <Form.Control
                                        type="email"
                                        placeholder="Your Email"
                                        className="mb-3 validate"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    <p className='error1' id="number">* Enter your phone number</p>

                                    <Form.Control
                                        type="text"
                                        placeholder="Your Number"
                                        className="mb-3 validate"
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                    <p className='error1' id="msg">* Enter your message</p>


                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        className="mb-3 validate"
                                        placeholder="Your Message"
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                    <button className='btn contactus_submit' onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


        </>
    )
}



