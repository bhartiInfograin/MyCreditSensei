import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AuthHeader from '../AuthCommon/AuthHeader';
import { Spinner, Container, Row, Col, Table, Button } from 'react-bootstrap';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import { ID_VERIFICATION } from '../../Url';
import { ToastContainer, toast } from 'react-toastify';
import Step2 from './Step2';
import { ImSpinner9 } from 'react-icons/im';



export default function SecurityQuestin() {
    const [question, setQuestion] = useState([]);
    const form_data = JSON.parse(sessionStorage.getItem("form_data"));
    let Navigate = useNavigate()

  console.log("question",question)

    //********************** Id-verification api  *************************//
    useEffect(async () => {
        console.log("form_data.trackingToken",form_data.trackingToken)
        console.log("form_data.customerToken",form_data.customerToken)
        try {
            $("#loader").show();
            $("#question").hide();
            await axios.get(`https://stage-sc.consumerdirect.com/api/signup/id-verification?clientKey=${form_data.clientKey}&trackingToken=${form_data.trackingToken}&customerToken=${form_data.customerToken}`)
                .then(resp => {
                    var a = resp.data.idVerificationCriteria
                    sessionStorage.setItem("securityquestion", JSON.stringify(a))
                    var tifOptions = Object.keys(a).map(function (key) { return a[key] });
                    setQuestion(tifOptions)
                    console.log("tifOptions", tifOptions)
                    $("#loader").hide();
                    $("#question").show();
                })
                .catch(error => {
                    console.log("error", error)
                })

        } catch (error) {
            console.log("error", error)
        }
    }, []);



    //********************** answer verification api  *************************//
    const checkButton = () => {

        const article = {
            clientKey: form_data.clientKey,
            customerToken: form_data.customerToken,
            trackingToken: form_data.trackingToken,
            "idVerificationCriteria.referenceNumber": question[0],
        }

        let myRadio = document.getElementsByClassName('customRadio');
        var questionarr = []
        for (let i = 0; i < myRadio.length; i++) {
            var myRadioVal = myRadio[i]
            if (myRadioVal.checked === true) {
                var newobj = {
                    optionVal: myRadioVal.value,
                    key: myRadioVal.name
                }
                questionarr.push(newobj)
            }
        }

        let que = document.getElementsByClassName('questionQue');
        for (let i = 0; i < que.length; i++) {
            const element = que[i];
            var a = i + 1
            var key = "idVerificationCriteria.answer" + a
            questionarr.forEach(item => {
                if (Number(item.key) === a) {
                    article[key] = item.optionVal
                }
            })
        }

        console.log("article", article)
        $("#loader").show();
        $("#question").hide();
        $.ajax({
            type: "POST",
            url: ID_VERIFICATION,
            data: article,
            success: function (response) {

                console.log("response", response)
                if (response) {
                    Navigate("/paymentdetails")
                    $("#loader").hide();
                    $("#question").show();
                }
            },
            error: function (error) {
                $("#loader").hide();
                $("#question").show();

                console.log("errordfdf", error.responseJSON.errors[0].code)

                if (error.responseJSON.errors[0].code === "500") {
                    return toast.error('Internal Server Error - Please contact your support representative', {
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

                if (error.responseJSON.errors[0].code === "FAILED") {
                    return toast.error('Sorry, we were unable to verify your identity based on your answers', {
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

                if (error.responseJSON.errors[0].code === "ID_ALREADY_VERIFIED") {
                    return toast.error('Identity of customer has previously been verified', {
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

                if (error.responseJSON.errors[0].code === "ID_VERIFICATION_REFERENCE_NUMBER_INVALID") {
                    return toast.error('The ID verification reference number is invalid. No questions found or a new set is required.', {
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
                if (error.responseJSON.errors[0].code === "ID_VERIFICATION_ANSWER_REQUIRED") {
                    return toast.error('The ID verification reference number is invalid. No questions found or a new set is required.', {
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
        });

    }


    return (
        <>
            <AuthHeader text={"Already a member"} action={"Log In"} url={"/login"} />

            <div id="loader" className='Loader'  >
                <div className='spinner'><ImSpinner9 /></div>
            </div>

            <> 
                <section className=' question' id="question" >
                <Container>
                    <Row className=''>
                        <Col lg={12}>
                        <Step2 progress={1} />
                        </Col>
                        <Col lg={7}>
                      
                        <div style={{ fontSize: "13px" }} className="securityquestn" >
                    
                                    <h6 className='mt-5'>Complete The Identity Question Below</h6>
                                    {question.map((e, number) => {
                                        if (typeof (e) === "object") {
                                            return (
                                                <>
                                                    <div className='mt-3'>
                                                        <b className='questionQue'>  Q{number} {e.displayName}</b>
                                                    </div>
                                                    <div >
                                                        {e.choiceList.choice.map((element) => {
                                                            return (
                                                                <>
                                                                    {['radio'].map((type) => (
                                                                        <div key={`inline-${type}`} className="mt-3">

                                                                            <div className="form-check">
                                                                                <input className="form-check-input customRadio" value={element.display} key={element.display} type="radio" name={number} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" for="flexRadioDefault1">
                                                                                    {element.display}
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            )
                                        }
                                    })}
                                </div>

                                <div className='activte_back_button p-3'>
                                    <Button className='signBtn btn-dark mt-3' onClick={checkButton} >Submit</Button>
                                </div>

                        </Col>
                        
                    </Row>
                </Container>



{/*                
                    <Container>
                        <Row>
                            <Col lg={7} md={7} sm={12}>
                            <Step2 progress={1} />
                                <div style={{ fontSize: "13px" }} >
                                    <h6 className='mt-5'>Complete The Identity Question Below</h6>
                                    {question.map((e, number) => {
                                        if (typeof (e) === "object") {
                                            return (
                                                <>
                                                    <div className='mt-3'>
                                                        <b className='questionQue'>  Q{number} {e.displayName}</b>
                                                    </div>
                                                    <div >
                                                        {e.choiceList.choice.map((element) => {
                                                            return (
                                                                <>
                                                                    {['radio'].map((type) => (
                                                                        <div key={`inline-${type}`} className="mt-3">

                                                                            <div className="form-check">
                                                                                <input className="form-check-input customRadio" value={element.display} key={element.display} type="radio" name={number} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" for="flexRadioDefault1">
                                                                                    {element.display}
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            )
                                        }
                                    })}
                                </div>

                                <div className='activte_back_button p-3'>
                                    <Button className='signBtn btn-dark mt-3' onClick={checkButton} >Submit</Button>
                                </div>
                            </Col>
                            <Col lg={5} md={5} sm={12}>

                            </Col>
                        </Row>
                    </Container> */}
                </section>
            </>



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
