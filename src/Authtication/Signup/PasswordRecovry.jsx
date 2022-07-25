import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import AuthHeader from '../AuthCommon/AuthHeader';
import Footer from '../../Common/Footer';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { TREACKIN_TOKEN } from '../../Url';


function PasswordRecovry() {
    const [loading, setLoading] = useState(true);
    const [securityQuestion, setSecurityQuestion] = useState();
    const [answer, setAnswer] = useState("");
    const [trackingToken, setTrackingToken] = useState();
    let Navigate = useNavigate()
    const clientKey = "cf2bc25b-5eaa-407e-9783-ae6498db4eb4"


    useEffect(() => {
        try {
            const data = axios.get(TREACKIN_TOKEN)
                .then(resp => {
                    setTrackingToken(resp.data.trackingToken)
                })
                .catch(error => {
                    console.log("error", error)
                })

        } catch (error) {
            console.log("error", error)
        }
    }, []);



    useEffect(async () => {
        try {
            setLoading(true);
            await axios.get(`https://www.smartcredit.com/api/signup/security-questions?clientKey=${clientKey}&trackingToken=${trackingToken} `)
                .then(resp => {

                    var securityQuestion = resp.data.securityQuestions
                    if (securityQuestion) {
                        setSecurityQuestion(securityQuestion)
                        setLoading(false)
                    }
                })
                .catch(error => {
                    console.log("error", error)
                })

        } catch (error) {
            console.log("error", error)
        }
    }, [trackingToken]);


    const submitHander = () => {

        var securityQuestion = document.getElementsByClassName("securityQuestion")

        var questionarr
        for (let i = 0; i < securityQuestion.length; i++) {

            questionarr = securityQuestion[i].value
          
        }
        if (questionarr == "Choose Your Security Question") {
            return toast.error('Choose Your Security Question', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }

        if (answer === "" || answer === undefined || answer === null) {
            return toast.error('Enter Your Answer', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
        if (answer) {
            Navigate("/login")
        }


    }



    return (
        <>
            <AuthHeader />

            {loading ?

                <div className='Loader'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>

                :

                <section className='pwd_recovery'>
                    <Container className='py-5 '>
                        <Row>
                            <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }}>
                                <div className="pwd_box">

                                    <h4><span><FaLock /></span>One-Time Password Recovery Setup</h4>
                                    <p>To ensure the security of you account, please provide an answer to a security question of your choosing. Your security question is used to identify you in case accidently get locked out.
                                        Complete this once and never have to worry again!
                                    </p>

                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Security Question
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Select aria-label="Default select example" className='securityQuestion'>
                                                <option >Choose Your Security Question</option>
                                                {securityQuestion.map((e, index) => {

                                                    return (
                                                        <>
                                                            <option value={index} >{e.question}</option>
                                                        </>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Answer
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Your Answer"
                                                name="answer"
                                                onChange={(e) => setAnswer(e.target.value)}
                                                required
                                            />
                                        </Col>

                                    </Form.Group>



                                    <div className="pwd_recover_btn">
                                        <Button className="btn-dark" onClick={submitHander}>Submit</Button>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            }

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

            <Footer />
        </>
    )
}

export default PasswordRecovry