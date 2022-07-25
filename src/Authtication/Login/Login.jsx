import React, { useState, useEffect } from 'react';
import AuthHeader from '../AuthCommon/AuthHeader';
import Footer from "../../Common/Footer"
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from "../../Url"
import axios from 'axios';
import { ImSpinner9 } from 'react-icons/im';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    let Navigate = useNavigate()

    useEffect(() => {
        $("#email").hide()
        $("#password").hide()
    }, [])

    $(".validate").focus(function () {
        $("#email").hide();
        $("#password").hide();
    })


    const submitHandler = async () => {

        if (email === undefined || email === null || email === "") {
            return $("#email").show()
        }
        if (password === undefined || password === null || password === "") {
            return $("#password").show()
        }

        const article = {
            j_username: email,
            j_password: password
        }

        setLoading(true)
        await axios({
            method: "post",
            url: LOGIN,
            data: article
        })
            .then((res) => {
                if (res.data.statusMsg === "Request failed with status code 401") {
                    setLoading(false)
                    return toast.error('Invalid Email or Password', {
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
                if (res.data) {
                    var trackingToken = res.data.trackingToken
                    var report = res.data.data.split(">")[8].split("<")[0]
                    var report_data = JSON.parse(report);
                    var bundledata = report_data.BundleComponents
                    var transunion = bundledata.BundleComponent[3].CreditScoreType.riskScore
                    var equifax = bundledata.BundleComponent[4].CreditScoreType.riskScore
                    var experian = bundledata.BundleComponent[5].CreditScoreType.riskScore
                    var summary = bundledata.BundleComponent[6].TrueLinkCreditReportType.Summary
                    sessionStorage.setItem("TRANSUNION", transunion)
                    sessionStorage.setItem("EQUIFAX", equifax)
                    sessionStorage.setItem("EXPERIAN", experian)
                    sessionStorage.setItem("SUMMARY", JSON.stringify(summary))
                    sessionStorage.setItem("BUNDLEDATA", JSON.stringify(bundledata))
                    sessionStorage.setItem("TRACKINGTOKEN", trackingToken)
                    Navigate("/useHome")
                    setLoading(false)
                }

            })
    }


    return (
        <>
            <AuthHeader text={"Don’t have an account?"} action={"Signup"} url={"/createAccount"} />
            <section className="login_section">
                {loading
                    ?
                    <Container>
                       <Row>
                           <Col lg={12} md={12}>
                                <div className='Loader '>
                                   <div className='spinner'><ImSpinner9 /></div>
                             
                                 </div>
                        
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Container className='mt-3'>
                        <Row>
                            <Col lg={{ span: 10, offset: 1 }} md={12}>
                                <Row>
                                    <Col lg={4} md={4} className="px-0" >

                                        <div className="singupform">
                                            <h5>Credit Repair used to be hard</h5>
                                            <p>We made it easy</p>
                                            <h3>Your beginning to a better credit score !</h3>
                                        </div>
                                    </Col>
                                    <Col lg={8} md={8} className="px-0">
                                        <div className='mainform'>
                                            <div className='Login_form '>
                                                <Form.Label className="mt-3 fromlabel"  >Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Your Email"
                                                    className='validate'
                                                    name="email" 
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <p className='error' id="email" style={{ alignSelf: "flex-start" }} >*Enter Valid Email</p>
                                                {/* <Link to="/emailrecovery" className='forgotpwd'><p className='forgotpwd' >Forgot Email?</p></Link> */}
                                                <Form.Label className="mt-3 fromlabel">Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Your Password"
                                                    className='validate'
                                                    name="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <p className='error' id="password" style={{ alignSelf: "flex-start" }} >*Enter Password</p>
                                                {/* <Link to="/forgotpwd" className='forgotpwd'>  <p className='forgotpwd' >Forgot Password?</p></Link> */}
                                                <Button className='signBtn btn-dark fromlabel mt-3' onClick={submitHandler}> Login </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                }


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

            <Footer />
        </>
    )
}
