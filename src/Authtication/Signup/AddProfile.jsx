import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import Footer from '../../Common/Footer';
import AuthHeader from '../AuthCommon/AuthHeader';
import Step2 from './Step2';
import { UPDATE_IDENTITY } from '../../Url';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';



export default function Carosel() {
    const [socialSecurity, setSocialSecurity] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [steetAddress, setSteetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const form_data = JSON.parse(sessionStorage.getItem("form_data"));
    const userName = form_data.firstName + " " + form_data.middleName + " " + form_data.lastName;
    let Navigate = useNavigate()


    //********************** convert socialSecurity Format  *************************//
    var newph1 = socialSecurity.slice(0, 2);
    var newph2 = socialSecurity.slice(2, 5);
    var newph3 = socialSecurity.slice(5, 9);
    var newph = newph1 + "-" + newph2 + "-" + newph3;
    // console.log("newph", newph)
    const partial = newph.split('-');
    const newpartialssn = partial[2]

    //********************** convert Birthdate Format  *************************//
    var newdt = birthDate.split('-')
    const newdtformant = newdt[1] + "/" + newdt[2] + "/" + newdt[0]
    // console.log("newdtformant", newdtformant)

    //********************** Error handling  *************************//
    useEffect(() => {
        $("#socialsecurity").hide();
        $("#birthdate").hide();
        $("#steetaddress").hide();
        $("#city").hide();
        $("#state").hide();
        $("#zip").hide();
        $("#phonenumber").hide();
        $("#BIRTHDATE_INVALID").hide()
        $("#BIRTHDATE_FORMAT").hide()
        $("#SSN_USED").hide();
        $("#FIELD_LENGTH_EXCEEDED").hide();
        $("#FIELD_LENGTH_EXCEEDED").hide();
        $("#INVALID_ZIP").hide();
        $("#ZIP_LOOKUP_FAILED").hide();
        $("#INVALID_HOME_PHONE").hide();
        $("#INVALID_PARTIAL_SSN").hide();
        $("#FIELD_INVALID_CHARACTERS").hide()
        $("#loader").hide();
        $("#login_section").show();
    }, []);

    $(".validate").focus(function () {
        $("#socialsecurity").hide();
        $("#birthdate").hide();
        $("#steetaddress").hide();
        $("#city").hide();
        $("#state").hide();
        $("#zip").hide();
        $("#phonenumber").hide();
        $("#BIRTHDATE_INVALID").hide()
        $("#BIRTHDATE_FORMAT").hide()
        $("#SSN_USED").hide();
        $("#FIELD_LENGTH_EXCEEDED").hide();
        $("#FIELD_LENGTH_EXCEEDED").hide();
        $("#INVALID_ZIP").hide();
        $("#ZIP_LOOKUP_FAILED").hide();
        $("#INVALID_HOME_PHONE").hide();
        $("#INVALID_PARTIAL_SSN").hide();
        $("#FIELD_INVALID_CHARACTERS").hide()
    })


    //********************** Update Identity api  *************************//
    const submitHander = () => {

        const article = {
            clientKey: form_data.clientKey,
            trackingToken: form_data.trackingToken,
            customerToken: form_data.customerToken,
            firstName: form_data.firstName,
            middleName: form_data.middleName,
            lastName: form_data.lastName,
            homePhone: phoneNumber,
            "identity.ssn": newph,
            "identity.ssnPartial": newpartialssn,
            "identity.birthDate": newdtformant,
            "homeAddress.state": state,
            "homeAddress.city": city,
            "homeAddress.street": steetAddress,
            "homeAddress.zip": zip,
        }

        console.log(article);

        var address = {
            "identity.ssn": newph,
            "identity.ssnPartial": newpartialssn,
            "identity.birthDate": newdtformant,
            "homeAddress.state": state,
            "homeAddress.city": city,
            "homeAddress.street": steetAddress,
            "homeAddress.zip": zip,
        }


        sessionStorage.setItem("address", JSON.stringify(address))

        if (article.clientKey === undefined || article.clientKey === null || article.clientKey === "") {
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
        if (article.trackingToken === undefined || article.trackingToken === null || article.trackingToken === "") {
            return toast.error('Tracking Token required', {
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
        if (article["identity.ssn"] === undefined || article["identity.ssn"] === null || article["identity.ssn"] === "" || article["identity.ssn"] === "--") {
            return $("#socialsecurity").show()
        }
        if (article["identity.birthDate"] === "undefined/undefined/" || article["identity.birthDate"] === null || article["identity.birthDate"] === "") {
            return $("#birthdate").show()
        }
        if (article["homeAddress.street"] === undefined || article["homeAddress.street"] === null || article["homeAddress.street"] === "") {
            return $("#steetaddress").show()
        }
        if (article["homeAddress.city"] === undefined || article["homeAddress.city"] === null || article["homeAddress.city"] === "") {
            return $("#city").show()
        }
        if (article["homeAddress.state"] === undefined || article["homeAddress.state"] === null || article["homeAddress.state"] === "") {
            return $("#state").show()
        }
        if (article["homeAddress.zip"] === undefined || article["homeAddress.zip"] === null || article["homeAddress.zip"] === "") {
            return $("#zip").show()
        }
        if (article.homePhone === undefined || article.homePhone === null || article.homePhone === "") {
            return $("#phonenumber").show()
        }

        $("#loader").show();
        $("#login_section").hide();
        $.ajax({
            type: "POST",
            url: UPDATE_IDENTITY,
            data: article,
            success: function (response) {

                console.log(response);
                Navigate("/securityquestion")
                $("#loader").hide();
                $("#login_section").show();
            },
            error: function (error) {
                console.log("errordfdf", error.responseJSON.errors[0].code);
                $("#loader").hide();
                $("#login_section").show();
                if (error.responseJSON.errors[0].code === 'BIRTHDATE_INVALID') {
                    return $("#BIRTHDATE_INVALID").show()
                }
                if (error.responseJSON.errors[0].code === 'BIRTHDATE_FORMAT') {
                    return $("#BIRTHDATE_FORMAT").show()
                }
                if (error.responseJSON.errors[0].code === 'SSN_USED') {
                    return $("#SSN_USED").show()
                }
                if (error.responseJSON.errors[0].code === 'SSN_NO_MATCH') {

                    document.getElementById("nextbtn").click()

                }
                if (error.responseJSON.errors[0].code === 'CITY_REQUIRED') {
                    return $("#city").show()
                }
                if (error.responseJSON.errors[0].code === 'STATE_REQUIRED') {
                    return $("#state").show()

                }
                if (error.responseJSON.errors[0].code === 'FIELD_INVALID_CHARACTERS') {
                    return $("#FIELD_INVALID_CHARACTERS").show()


                }
                if (error.responseJSON.errors[0].code === 'FIELD_LENGTH_EXCEEDED') {
                    return $("#FIELD_LENGTH_EXCEEDED").show()
                }
                if (error.responseJSON.errors[0].code === 'INVALID_ZIP') {
                    return $("#INVALID_ZIP").show()
                }
                if (error.responseJSON.errors[0].code === 'ZIP_REQUIRED') {
                    return $("#zip").show()

                }
                if (error.responseJSON.errors[0].code === 'ZIP_LOOKUP_FAILED') {
                    return $("#ZIP_LOOKUP_FAILED").show()
                }
                if (error.responseJSON.errors[0].code === 'INVALID_HOME_PHONE') {
                    return $("#INVALID_HOME_PHONE").show()


                }
                if (error.responseJSON.errors[0].code === 'INVALID_PARTIAL_SSN') {
                    return $("#INVALID_PARTIAL_SSN").show()
                }
                if (error.responseJSON.errors[0].code === 'INVALID_SSN') {
                    return $("#socialsecurity").show()
                }
                if (error.responseJSON.errors[0].code === 'PARTIAL_SSN_REQUIRED') {
                    return $("#socialsecurity").show()

                }
            }
        });
    }



    // const inputlength = () => {
    //     console.log("socialSecurity",socialSecurity.length)
    //     if(socialSecurity.length === 9){
    //         return false;
    //     }
    // }
    return (
        <>
            <AuthHeader text={"Already a member"} action={"Log In"} url={"/login"} />

            <div id="loader" className='Loader'  >
                <div className='spinner'><ImSpinner9 /></div>
            </div>

            <section className="login_section" id="login_section">
                <Container className='mt-3'>
                    <Row>
                        <Col lg={{ span: 10, offset: 1 }} md={12}>
                            <Row>
                                <Col lg={4} md={4} className="px-0">
                                    <div className="singupform">
                                        <h4>Great job,
                                            Username!</h4>
                                        <p>You're almost done.</p>
                                        <p>What contact info would you like the credit bureaus to use?</p>
                                    </div>
                                </Col>
                                <Col lg={8} md={8} className="px-0">
                                    <div className='sigup_form'>
                                        <Step2 progress={1} />
                                        <div className="p-3">



                                            <Form.Group >
                                                <Form.Label className="mt-3" >Name</Form.Label>
                                                <Form.Control maxLength={0} placeholder={userName} />
                                            </Form.Group>



                                            <Form.Group >
                                                <Form.Label className="mt-3">Social Security#</Form.Label>
                                                <Form.Control
                                                    className='validate'
                                                    type="text"
                                                    // onKeyPress={inputlength}
                                                    // max="9"
                                                    // min="9"
                                                    maxlength="9"
                                                    value={socialSecurity}
                                                    placeholder="Enter 9 digit social security number"
                                                    name="social_security"

                                                    onChange={(e) => setSocialSecurity(e.target.value.replace(/[^0-9]/ig, ''))}
                                                    required
                                                />
                                            </Form.Group>
                                            <p className='error' id="socialsecurity"> *Enter Your 9 digit social security number</p>
                                            <p className='error' id="SSN_USED"> *An account already exists with the SSN you entered. Please login to view your credit report and scores.</p>
                                            <p className='error' id="INVALID_PARTIAL_SSN"> *An invalid partial SSN field was encountered.</p>

                                            <Form.Group >
                                                <Form.Label className="mt-3">Birth date</Form.Label>
                                                <Form.Control
                                                    className='validate'
                                                    type="date"
                                                    placeholder="MM/DD/YYYY"
                                                    max="3000-12-31"
                                                    name="birth_date"
                                                    id="birth_date"
                                                    onChange={(e) => setBirthDate(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <p className='error' id="birthdate"> *Enter Your Birthdate</p>
                                            <p className='error' id="BIRTHDATE_INVALID"> *Please check that birth date is correct. You must be at least 18 to be a member.</p>
                                            <p className='error' id="BIRTHDATE_FORMAT"> *Please enter birth date of the format MM/DD/YYYY.</p>


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
                                            <p className='error' id="steetaddress"> *Enter your Steet Address</p>


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
                                            <p className='error' id="city"> *Enter your City</p>


                                            <Form.Group>
                                                <Form.Label className="mt-3">State</Form.Label>
                                                <Form.Control
                                                    className='validate'
                                                    type="email"
                                                    placeholder="Your State"
                                                    name="state"
                                                    onChange={(e) => setState(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <p className='error' id="state"> *Enter your State</p>
                                            <p className='error' id="FIELD_INVALID_CHARACTERS"> *This field contains invalid characters.</p>
                                            <p className='error' id="FIELD_LENGTH_EXCEEDED"> *The data is too long for state field'.</p>


                                            <Form.Group >
                                                <Form.Label className="mt-3" >Zip Code</Form.Label>
                                                <Form.Control
                                                    className='validate'
                                                    type="text"
                                                    maxLength="6"
                                                    placeholder="Zip"
                                                    name="zip"
                                                    value={zip}
                                                    onChange={(e) => setZip(e.target.value.replace(/[^0-9]/ig, ''))}
                                                    required
                                                />
                                            </Form.Group>
                                            <p className='error' id="zip"> *You must enter a zip.</p>
                                            <p className='error' id="INVALID_ZIP"> *Invalid ZIP code, must be 5 digits'.</p>
                                            <p className='error' id="ZIP_LOOKUP_FAILED"> *We could not match the zip code you entered to a valid City/State combination.</p>


                                            <Form.Group>
                                                <Form.Label className="mt-3">Phone Number</Form.Label>
                                                <Form.Control
                                                    className='validate'
                                                    type="phone"
                                                    placeholder="Your phone number"
                                                    name="phone_number"
                                                    maxLength={10}
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/ig, ''))}
                                                    required
                                                />
                                            </Form.Group>
                                            <p className='error' id="phonenumber"> *Enter your Phone Number</p>
                                            <p className='error' id="INVALID_HOME_PHONE"> *Invalid phone format, must be 10 digits.</p>

                                            <div className='activte_back_button'>
                                                <Button className='signBtn btn-dark mt-3' id="nextbtn" onClick={submitHander}> Next  </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
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


            <Footer />
        </>
    )
}