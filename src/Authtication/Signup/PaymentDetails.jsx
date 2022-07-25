import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, InputGroup, FormControl, Table, Spinner } from 'react-bootstrap';
import AuthHeader from '../AuthCommon/AuthHeader';
import Footer from '../../Common/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { FiPrinter } from 'react-icons/fi';
import Step2 from './Step2';
import axios from 'axios';
import publicIp from "public-ip";
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';
import {FaCheckCircle } from 'react-icons/fa';
import{COMPLETE,CREDIT_CARD} from '../../Url'



const PaymentDetails = () => {
    const form_data = JSON.parse(sessionStorage.getItem("form_data"));
    const address = JSON.parse(sessionStorage.getItem("address"));
    const userName = form_data.firstName + " " + form_data.lastName;
    const [cardNumber, setCardNumber] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvv, setCvv] = useState("");
    const [creditCardToken, setCreditCardToken] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("false")
    const [steetAddress, setSteetAddress] = useState("")
    const [zipAddress, setZipAddress] = useState("")
    const [city, setCity] = useState("");
    const [stateAddress, setStateAddress] = useState("");
    const [loading, setLoading] = useState(false);
    let Navigate = useNavigate()





    //********************** year dropdown *************************//
    let minOffset = 0, maxOffset = 20;
    let thisYear = (new Date()).getFullYear();

    let allYears = []

    for (let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear + x)
    }
    const yearList = allYears.map((x) => { return (<option key={x}>{x}</option>) });


    //********************** Month dropdown *************************//
    let allMonth = []
    let months = ["January(01)",
        "February(02)",
        "March(03)",
        "April(04)",
        "May(05)",
        "June(06)",
        "July(07)",
        "August(08)",
        "September(09)",
        "October(10)",
        "November(11)",
        "December(12)"];

    for (let y = 0; y < months.length; y++) {
        allMonth.push(months[y])
    }

    const monthlist = allMonth.map((x, i) => {
        return (
            <option key={x} value={i + 1}>
                {x}
            </option>)
    });


    //********************** Creditcard validation api *************************//
    useEffect(() => {
        if (cardNumber.length === 16) {
            axios.get(`https://www.smartcredit.com/api/signup/validate/credit-card-number?clientKey=${form_data.clientKey}&number=${cardNumber}&trackingToken=${form_data.trackingToken}`)
                .then(resp => {
                    // console.log("resp.data", resp.data)
                    setCreditCardToken(resp.data)
                })
                .catch(error => {
                    if (error) {
                        toast.error('Invalid credit card number', {
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
                })
        }

    }, [cardNumber])

    //********************** Get browser IP Address *************************//
    useEffect(() => {
        const getClientIp = async () => {
            await publicIp.v4({ fallbackUrls: ["https://ifconfig.co/ip"] })
                .then(resp => {
                    // console.log("resp",resp)
                    setIpAddress(resp)
                })
        }
        getClientIp();
    }, [])


    //********************** Get check value on billing address *************************//
    useEffect(() => {
        var t = document.getElementById("billingAddress").checked
        setBillingAddress(t)
    }, [])

    const handlecheck = () => {
        var f = document.getElementById("billingAddress").checked
        setBillingAddress(f)
    }
    //********************** complete api *************************//
    const complete = () => {
        var data = {
            clientKey: form_data.clientKey,
            trackingToken: form_data.trackingToken,
            customerToken: form_data.customerToken,
            confirmTermsBrowserIpAddress: ipAddress,
            isConfirmedTerms: true
        }
        setLoading(true)
        $.ajax({
            type: "POST",
            url: COMPLETE,
            data: data,
            success: function (response) {

                sessionStorage.setItem("complete", JSON.stringify(response.planType))
                console.log("response", response)
                Navigate("/membership");
                setLoading(false)

            },
            error: function (error) {
                console.log("errordfdf", error.responseJSON.errors[0].code);
            }
        });


    }

    //********************** function for credit_card api  *************************//
    $("#cardnumber").hide()
    $("#month").hide()
    $("#year").hide()
    $("#cvv").hide()

    $(".validate").focus(function () {
        $("#cardnumber").hide()
        $("#month").hide()
        $("#year").hide()
        $("#cvv").hide()

    })


    const submitHandler = () => {

        if (form_data.clientKey === "" || form_data.clientKey === undefined || form_data.clientKey === null) {
            return toast.error('Client Key required', {
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


        if (form_data.trackingToken === "" || form_data.trackingToken === undefined || form_data.trackingToken === null) {
            return toast.error('Client Key required', {
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


        if (form_data.customerToken === "" || form_data.customerToken === undefined || form_data.customerToken === null) {
            return toast.error('Customer Token required', {
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
        if (creditCardToken.creditCardToken === "" || creditCardToken.creditCardToken === undefined || creditCardToken.creditCardToken === null) {
            return $("#cardnumber").show()
        }
        if (month === "" || month === undefined || month === null) {
            return $("#month").show()
        }
        if (year === "" || year === undefined || year === null) {
            return $("#year").show()
        }
        if (cvv === "" || cvv === undefined || cvv === null) {
            return $("#cvv").show()
        }


        var checkplanType
        let premium = document.getElementById('checkplanType').checked;
        if (premium === true) {
            checkplanType = form_data.planType
        } else {
            checkplanType = "BASIC"
        }
        console.log("checkplanType", checkplanType)
        var termcheck = document.getElementById("term_condition").checked
        if (termcheck === true) {

            if (billingAddress === true) {

                var street1 = address["homeAddress.street"]
                var zip1 = address["homeAddress.zip"]
                var state1 = address["homeAddress.state"]
                var city1 = address["homeAddress.city"]

                var article = {
                    clientKey: form_data.clientKey,
                    trackingToken: form_data.trackingToken,
                    customerToken: form_data.customerToken,
                    "creditCard.name": userName,
                    "creditCard.address": street1,
                    "creditCard.state": state1,
                    "creditCard.city": city1,
                    "creditCard.zip": zip1,
                    "creditCard.token": creditCardToken.creditCardToken,
                    "creditCard.expirationMonth": month.padStart(2, 0),
                    "creditCard.expirationYear": year,
                    "creditCard.cvv": cvv,
                    planType: checkplanType,
                    "confirmTermsBrowserIpAddress": ipAddress,
                    isConfirmedTerms: true,
                }



                $.ajax({
                    type: "POST",
                    url: CREDIT_CARD,
                    data: article,
                    success: function (response) {

                        complete();
                        console.log("response", response)


                    },
                    error: function (error) {

                        console.log("errordfdf", error.responseJSON.errors[0].code);


                        if (error.responseJSON.errors[0].code === 'EXPIRED_EXPIRATION')

                            return toast.error('The expiration date has expired', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored"
                            });



                        if (error.responseJSON.errors[0].code === 'CVV_REQUIRED')
                            return toast.error('CVV is required', {
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
                });
            }

            if (billingAddress === false) {

                var article = {
                    clientKey: form_data.clientKey,
                    trackingToken: form_data.trackingToken,
                    customerToken: form_data.trackingToken,
                    "creditCard.name": userName,
                    "creditCard.address": steetAddress,
                    "creditCard.state": stateAddress,
                    "creditCard.city": city,
                    "creditCard.zip": zipAddress,
                    "creditCard.token": creditCardToken.creditCardToken,
                    "creditCard.expirationMonth": month.padStart(2, 0),
                    "creditCard.expirationYear": year,
                    "creditCard.cvv": cvv,
                    planType: checkplanType,
                    "confirmTermsBrowserIpAddress": ipAddress,
                    isConfirmedTerms: true,
                }

          
                $.ajax({
                    type: "POST",
                    url: CREDIT_CARD,
                    data: article,
                    success: function (response) {
                        complete();
                    },
                    error: function (error) {
                        if (error.responseJSON.errors[0].code === 'EXPIRED_EXPIRATION') {
                            alert("The expiration date has expired")
                        }
                        if (error.responseJSON.errors[0].code === 'CVV_REQUIRED') {
                            return toast.error('CVV is required', {
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

                        if (error.responseJSON.errors[0].code === 'EXPIRED_EXPIRATION')
                            return toast.error('The expiration date has expired', {
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
                });
            }

        } else {

            toast.error('accept term and condition', {
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

    }




    return (
        <div>
            <AuthHeader />

            {loading ?

                <div id="loader" className='Loader'  >
                    <div className='spinner'><ImSpinner9 /></div>
                </div>
                :
                <section className='my-5'>
                    <Container>
                        <Row>
                            <Col lg={7} md={7} sm={12}>
                                <div className="payment-box">
                                    <div className='creditReport_prgressbar'>
                                        <Step2 progress={3} />
                                    </div>
                                    <div className=''>
                                        <h4>SmartCredit Basic</h4>
                                        <p className="text-para">Please provide your payment details for membership</p>
                                    </div>

                                    <div className="msg-box">
                                        <p>Please enter a valid credit card. Valid credit card information is required to establish your account.
                                            <br></br> Your card information will never be shared.
                                            <br></br> We gladly accept the following credit cards.

                                        </p>
                                    </div>

                                    <div className="form-input pt-2">
                                        <div className="link">
                                            <Link to="#">have a sponsor code?</Link>
                                        </div>

                                        <div className="card-input mt-2">

                                            <Form.Group as={Row} className="mb-3" >
                                                <Form.Label column sm="3">
                                                    Card Holder Name
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" placeholder={userName} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Card Number
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control
                                                        type="text"
                                                        className='validate'
                                                        placeholder="Enter your card number"
                                                        name="social_security"
                                                        value={cardNumber}
                                                        onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/ig, ''))}
                                                        maxLength="16"
                                                        required
                                                    />
                                                    <p className='error' id="cardnumber">* Enter your card number</p>
                                                </Col>
                                            </Form.Group>


                                            <Form.Group as={Row} className="mb-3" >
                                                <Form.Label column sm="3">
                                                    Expiration Date
                                                </Form.Label>
                                                <Col sm="">
                                                    <Form.Select
                                                        className='validate'
                                                        id="exp_date"
                                                        name="exp_date"
                                                        onChange={(e) => setMonth(e.target.value)}
                                                    >
                                                        <option>Month</option>
                                                        {monthlist}
                                                    </Form.Select>
                                                    <p className='error' id="month">*This field is required</p>

                                                </Col>
                                                <Col sm="">
                                                    <Form.Select
                                                        className='validate'
                                                        id="month"
                                                        name="month"
                                                        onChange={(e) => setYear(e.target.value)}
                                                    >
                                                        <option>Year</option>
                                                        {yearList}
                                                    </Form.Select>
                                                    <p className='error' id="year">*This field is required </p>

                                                </Col>
                                            </Form.Group>




                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                <Form.Label column sm="3">
                                                    CVV
                                                </Form.Label>
                                                <Col sm="9">
                                                    <InputGroup className="mb-3">
                                                        <FormControl
                                                            type="text"
                                                            className='validate'
                                                            placeholder="Enter CVV "
                                                            name="cvv"
                                                            maxLength={3}
                                                            value={cvv}
                                                            onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/ig, ''))}
                                                            required
                                                        />
                                                        <InputGroup.Text>?</InputGroup.Text>

                                                    </InputGroup>
                                                    <p className='error' id="cvv" >*This field is required </p>
                                                </Col>
                                            </Form.Group>



                                        </div>





                                        <div className="check-para">
                                            <input
                                                type="checkbox"
                                                value="billingAddress"
                                                id="billingAddress"
                                                checked={billingAddress}
                                                onClick={handlecheck}
                                            />
                                            <label for="billingAddress">Billing address is same as home address</label>
                                        </div>

                                        {billingAddress ? <>  </> :
                                            <>
                                                <Form.Group >
                                                    <Form.Label className="mt-3">Steet Address</Form.Label>
                                                    <Form.Control
                                                        className='validate'
                                                        type="text"
                                                        placeholder="Enter your Steet Address"
                                                        name="steet_address"
                                                        onChange={(e) => setSteetAddress(e.target.value)}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label className="mt-3" >City</Form.Label>
                                                    <Form.Control
                                                        className='validate'
                                                        type="text"
                                                        placeholder="Your City"
                                                        name="city"
                                                        onChange={(e) => setCity(e.target.value)}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label className="mt-3">State</Form.Label>
                                                    <Form.Control
                                                        className='validate'
                                                        type="email"
                                                        placeholder="Your State"
                                                        name="state"
                                                        onChange={(e) => setStateAddress(e.target.value)}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Form.Group >
                                                    <Form.Label className="mt-3" >Zip Code</Form.Label>
                                                    <Form.Control
                                                        className='validate'
                                                        type="text"
                                                        placeholder="Zip"
                                                        name="zip"
                                                        onChange={(e) => setZipAddress(e.target.value)}
                                                        required
                                                    />
                                                </Form.Group>

                                            </>

                                        }
                                        <div className="check-para">
                                            <input
                                                id="checkplanType"
                                                type="checkbox"
                                                checked='false'

                                            /><label>Premium Membership with UNLIMITED Credit Reports,Scores & Actions</label>
                                        </div>
                                        <div className="check-para">
                                            <input type="checkbox" id="term_condition" /><label>I have read, agree to and accept all the terms, conditions and rights of my Membership</label>
                                        </div>


                                        <div className="payment-btn">
                                            <Button className='paymentBtn btn-dark' onClick={submitHandler} >Submit & Continue</Button>
                                        </div>
                                    </div>

                                    <div className="product-term mt-4">
                                        <h5>About our Product & Terms</h5>

                                        <div className="content">
                                            <div className="head">
                                                <p className='about-para'>
                                                    <span style={{ fontWeight: "bold" }}>Service Agreement</span> | <span>Terms of use</span> | <span>Privacy Policy</span> | <span>Consumer rights</span>
                                                </p>
                                                <p><FiPrinter /><span>Print</span></p>
                                            </div>
                                            <hr />
                                            <div className='about-text'>
                                                <p>The Terms & Conditions together with the <span style={{ color: "#0d8ae7" }}>Terms of Use & Privacy Policy </span>.Lorem ipsum dolor sit amet. Hic pariatur repudiandae vel voluptas temporibus ut accusantium amet eos dolores necessitatibus. Et similique animi id sint similique ab magnam dicta ab porro reiciendis et laboriosam corrupti qui tempora veritatis.

                                                    Eos quas aliquid est doloremque laborum eos dolorem accusantium est enim temporibus. Sed quia natus et quaerat expedita ut commodi molestiae et eaque nihil aut reiciendis autem ut repellendus quaerat! Et quaerat voluptate et nulla mollitia aut quia odit sed voluptatem dolorum. Fugiat galisum aut ullam harum a commodi autem eum iure quis.

                                                    Ea quisquam fugit et aspernatur numquam ut placeat voluptate ea perferendis iusto eum corporis distinctio. Et omnis ipsam vel mollitia aperiam qui galisum consequatur aut possimus et nesciunt eaque aut quam consequatur!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                            <Col lg={5} md={5} sm={12}>
                                {/* <div className="membership-table">
                                    <div className="heading">
                                        <p>BASIC MEMBERSHIP</p>
                                    </div>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <td>Smart Credit Report & Scores</td>
                                                <td>2 monthly updates</td>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ScoreTraker</td>
                                                <td>Unlimited</td>

                                            </tr>
                                            <tr>
                                                <td>ScoreBuilder</td>
                                                <td>Unlimited</td>

                                            </tr>
                                            <tr>
                                                <td>ScoreMaster</td>
                                                <td>Unlimited</td>

                                            </tr>
                                            <tr>
                                                <td>Actions</td>
                                                <td>5 per month</td>

                                            </tr>
                                            <tr>
                                                <td>Credit Monitering</td>
                                                <td>Unlimited</td>

                                            </tr>
                                            <tr>
                                                <td>Money Manager</td>
                                                <td>Unlimited</td>

                                            </tr>
                                            <tr>
                                                <td>3B Report & Scores</td>
                                                <td>a La Carte</td>

                                            </tr>
                                            <tr>
                                                <td>Subscription Start Date</td>
                                                <td>03/03/2022</td>

                                            </tr>
                                            <tr>
                                                <td>Trial Period</td>
                                                <td>--</td>

                                            </tr>
                                            <tr>
                                                <td>Monthly fee starting</td>
                                                <td className='payment-price'>39$</td>

                                            </tr>
                                        </tbody>
                                    </Table>
                                </div> */}


                                <div className='basiccard d-flex justify-content-center'>
                                    <div className='pricing_plan' >
                                        <h5>SmartCredit  PLAN</h5>
                                        <hr></hr>
                                        <div className='subprice'>
                                            <p className='price'> $39 /mo</p>
                                            <p className='cancleText'>CANCEL ANY TIME</p>
                                        </div>
                                        <hr></hr>
                                        <ul className='p-0'>
                                            <li><FaCheckCircle className='checkicon' />Unlimited My Credit Sensei Disputes</li>
                                            <li> <FaCheckCircle className='checkicon' />Monthly 3 Bureaus  Reports & Scores</li>
                                        </ul>
                                        <h5>SmartCredit</h5>
                                        <ul className='p-0'>
                                            <li> <FaCheckCircle className='checkicon' />Identity Theft Insurance ($1m)</li>
                                            <li><FaCheckCircle className='checkicon' />Credit Monitoring & Alerts (TU)</li>
                                        </ul>
                                        <p className='text-center cardtext'>Includes SmartCredit Money Manager with 2 monthly Transunion Report &  Score updates in SmartCredit.</p>
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
        </div>
    )
}

export default PaymentDetails