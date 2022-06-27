import React, { useEffect, useState, useRef } from 'react'
import logo from '../../asset/image/newlogo.png';
import { Link,useNavigate } from 'react-router-dom'
import { Container, Row, Col, Accordion, Table, Button, Modal, Form } from 'react-bootstrap'
import { FaUserCircle, FaSlidersH, FaPlusSquare } from 'react-icons/fa';
import $ from 'jquery';
import DisputeStepper from "../DisputeLetter/DisputeStepper"
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import axios from 'axios';
import {EQUIFAX_DISPUTE_LETTER} from "../../Url";
import Header from './Header';

export default function EquifaxDispute() {
    const bundledata = JSON.parse(sessionStorage.getItem("BUNDLEDATA"));
    const TrackingToken = sessionStorage.getItem("TRACKINGTOKEN");
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);
    const [showDispute, setShowDispute] = useState(false);
    const [custom, setCustom] = useState(false)
    const [never, setNever] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [balance, setBalance] = useState(false)
    const [charged, setCharged] = useState(false)
    const [collection, setCollection] = useState(false)
    const [victim, setVictim] = useState(false)
    const [disputed, setDisputed] = useState(false)
    const [daysLate, setDaysLate] = useState()
    const [highBalance, setHighBalance] = useState()
    const [payStatus, setPayStatus] = useState()
    const [pastDue, setPastDue] = useState()
    const [remark, setRemark] = useState()
    const [worstRating, setWorstRating] = useState()
    const [accountName, setAccountName] = useState()
    const [accountType, setAccountType] = useState()
    const [openDate, setOpenDate] = useState()
    const [accountNumber, setAccountNumber] = useState()
    const [finish, setFinish] = useState(false)
    const [progress, setProgress] = useState()
    let Navigate = useNavigate()

    var socialSecurityNumber = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.SocialSecurityNumber
    var equifaxBorrowerName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[2].Name.first + " " + bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.last
    var equifaxBorrowerAddress = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[2].CreditAddress
    var equifaxBorrowerBirthdate = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.Birth[2].date
    var tradeLinePartition = bundledata.BundleComponent[6].TrueLinkCreditReportType.TradeLinePartition
    var InquiryPartition = bundledata.BundleComponent[6].TrueLinkCreditReportType.InquiryPartition
    var d = new Date()
    var fulldate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()


    //******************/ all *****************************//
    var equifax = [];
    //******************/ Positive *****************************//
    var positive_equifax = [];
    //******************/ Negative *****************************//
    var negative_equifax = [];
    //******************/ Inquiry *****************************//
    const equifaxInquiry = [];


    if (tradeLinePartition) {
        tradeLinePartition.map((e) => {
            if (e.Tradeline.length > 0) {
                e.Tradeline.map(item => {
                    if (item.bureau === "Equifax") {
                        equifax.push(item)
                    }
                })
            } else {
                if (e.Tradeline.bureau === "Equifax") {
                    equifax.push(e.Tradeline)
                }
            }
        })
    }



    if (equifax) {
        equifax.map((e) => {
            if (e.PayStatus.description === "Current" && e.GrantedTrade.WorstPayStatus.description === "Current") {
                positive_equifax.push(e)
            } else {
                negative_equifax.push(e)
            }
        })
    }



    //******************* */ InquiryPartition *************************************
    if (InquiryPartition) {
        InquiryPartition.map((e) => {
            if (e.Inquiry.bureau === "Equifax") {
                equifaxInquiry.push(e)
            }
        })

    }

    const handleCheckCount = (e) => {
        const { checked } = e.target;
        if (checked === true) {
            setCount(count + 1)
            console.log(count)
        } else {
            setCount(count - 1)
        }
    }

    useEffect(() => {
        $(".disputeReason").css("visibility", "hidden");
    }, [])


    const handleDisputeReason = () => {
        const check = document.getElementsByClassName("mycheckbox")
        for (let i = 0; i < check.length; i++) {
            if (check[i].checked === true) {
                document.getElementsByClassName("disputeReason")[i].style.visibility = "visible"
            }
        }

        setShowDispute(true)
    }

    const first = useRef(null)


    useEffect(() => {

        first.current = handleClose;
        var letterObject = []
        
        function handleClose() {
            setShow(false);
            setFinish(true);
            setProgress(2)

            const customReason = document.getElementById("customReason")
            const modalaccountName = document.getElementsByClassName("modalaccountName")[0].innerText
            const modalaccountType = document.getElementsByClassName("modalaccountType")[0].innerText
            const modalaccountNumber = document.getElementsByClassName("modalaccountNumber")[0].innerText
            const modalOpenDate = document.getElementsByClassName("modalOpenDate")[0].innerText
            const detailsReasons = document.getElementsByClassName("detailsReasons")[0].innerText
            const modalhighbalance = document.getElementsByClassName("modalBalance")[0].innerText
            var reasons = ''
            if (customReason) {
                reasons = customReason.value
            }
            if (detailsReasons) {
                reasons = detailsReasons
            }
            const NewObject = {
                "acName": modalaccountName,
                "actype": modalaccountType,
                "acNumber": modalaccountNumber,
                "openDate": modalOpenDate,
                "balance": modalhighbalance,
                "reasons": reasons
            }
            letterObject.push(NewObject)
            sessionStorage.setItem("LetterObject", JSON.stringify(letterObject))
        }
    }, [])




    const showcustom = (e) => {
        const suggestion = e.target.value
        console.log("suggestion", suggestion);
        switch (suggestion) {
            case 'custom': setCustom(true);
                setNever(false);
                setIncorrect(false);
                setBalance(false);
                setCharged(false);
                setCollection(false);
                setVictim(false);
                setDisputed(false);

                break;
            case 'never': setNever(true);
                setCustom(false);
                setIncorrect(false);
                setBalance(false);
                setCharged(false);
                setCollection(false);
                setVictim(false);
                setDisputed(false);
                break;
            case 'incorrect': setIncorrect(true);
                setCustom(false);
                setNever(false);
                setBalance(false);
                setCharged(false);
                setCollection(false);
                setVictim(false);
                setDisputed(false);

                break;
            case 'balance': setBalance(true);
                setCustom(false);
                setNever(false);
                setIncorrect(false);
                setCharged(false);
                setCollection(false);
                setVictim(false);
                setDisputed(false);
                break;
            case 'charged': setCharged(true);
                setCustom(false);
                setNever(false);
                setIncorrect(false);
                setBalance(false);
                setCollection(false);
                setVictim(false);
                setDisputed(false);
                break;
            case 'collection': setCollection(true);
                setCustom(false);
                setNever(false);
                setIncorrect(false);
                setBalance(false);
                setCharged(false);
                setVictim(false);
                setDisputed(false);
                break;
            case 'victim': setVictim(true);
                setCustom(false);
                setNever(false);
                setIncorrect(false);
                setBalance(false);
                setCharged(false);
                setCollection(false);
                setDisputed(false);
                break;
            case 'disputed': setDisputed(true);
                setCustom(false);
                setNever(false);
                setIncorrect(false);
                setBalance(false);
                setCharged(false);
                setCollection(false);
                setVictim(false);
                break;
        }
    }


    const handleClose1 = () => {
        setShow(false);
    }



    const handleShow = (e) => {
        setShow(true)
        var button_value = document.getElementsByClassName("disputeReason")
        for (let i = 0; i < button_value.length; i++) {
            button_value[i].setAttribute("myVal", `${i}`)
        }

        setDaysLate(document.getElementsByClassName("DaysLate")[e.target.attributes.myVal.nodeValue].innerText)
        setHighBalance(document.getElementsByClassName("highBalance")[e.target.attributes.myVal.nodeValue].innerText)
        setPayStatus(document.getElementsByClassName("PayStatus")[e.target.attributes.myVal.nodeValue].innerText)
        setPastDue(document.getElementsByClassName("PastDue")[e.target.attributes.myVal.nodeValue].innerText)
        setRemark(document.getElementsByClassName("Remark")[e.target.attributes.myVal.nodeValue].innerText)
        setWorstRating(document.getElementsByClassName("worstRating")[e.target.attributes.myVal.nodeValue].innerText)
        setAccountName(document.getElementsByClassName("accountName")[e.target.attributes.myVal.nodeValue].innerText)
        setAccountType(document.getElementsByClassName("accountType")[e.target.attributes.myVal.nodeValue].innerText)
        setOpenDate(document.getElementsByClassName("openDate")[e.target.attributes.myVal.nodeValue].innerText)
        setAccountNumber(document.getElementsByClassName("accountNumber")[e.target.attributes.myVal.nodeValue].innerText)

    }



    const sendEmail = () => {
        var mailbody = []
        const LetterObject = JSON.parse(sessionStorage.getItem("LetterObject"));

        if (LetterObject) {
            LetterObject.map((e) => {
                var g = `${e.actype}<span style="visibility:hidden">1</span>${e.acName} with account ${e.acNumber} opended on ${e.openDate} and a balance of ${e.balance} .</br>${e.reasons}`
                mailbody.push(g)
            })


            var doc = new jsPDF("p", "pt", "a4");
            doc.html(` <div id="content">
           <div id='userdetails'>
           <div>
           <p>${equifaxBorrowerName}</p>
           <p>${equifaxBorrowerAddress.unparsedStreet}</p>
           <p>${equifaxBorrowerAddress.city + "," + equifaxBorrowerAddress.stateCode + " " + equifaxBorrowerAddress.postalCode}</p>
           <p> SSN : ${socialSecurityNumber}</p>
            <p>Date of Birth : ${equifaxBorrowerBirthdate}</p>
        </div>
               <div>
                   ${fulldate}
               </div>
           </div>

           <div id='burus_address'>
               <p>Equifax Consumer Solutions </p>
               <p>P.O.Box 2000</p>
               <p>Chester,PA 19016</p>
           </div>
           <div id="letterbody">
               <p>Dear Transunion,</p>
               <p>I am writing to dispute the following information that appears on my Transunion report  from ${fulldate}:</p>
              ${mailbody.map((e) => {
                return (
                    `<div>
                        <p>${e}</p>
                    </div>
                    `
                )
            })}

           </div>
           <div id='letterfooter'>
               <p>Regards,</p>
               <p>${equifaxBorrowerName}</p>
           </div>
       </div>`, {
                callback: function (pdf) {
                    var demo = pdf.output("datauristring");
                    pdf.save("equifax.pdf")
                    var disputedate = new Date()
                    var _disputeDate = disputedate.getDate() + "/" + (disputedate.getMonth() + 1) + "/" + disputedate.getFullYear()
                    
                    const article = {
                        trackingToken: TrackingToken,
                        equifax_create_date: _disputeDate,
                        equifax_pdf: demo
                    };

                    axios.post( EQUIFAX_DISPUTE_LETTER, article)
                    .then((response) => {

                        if (response.data.statusCode === 400) {
                            toast.error('Dispute letter already sent', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored"
                            });

                            // Navigate("/useHome")

                        }
                        if (response.data.statusCode === 200) {
                            Navigate("/equifaxround_1")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            })
        }

    }

    return (
        <>
            <Header title="EQUIFAX DISPUTE" />
            <div className='mt-5'>
                <DisputeStepper progress={progress} />
            </div>

            <section className='creditItem' id="creditItem" >

                <Container className='mt-5 disputebox '>
                    <Row>
                        <Col lg={12}>
                            <div className='transUnion_filter'>
                                <div className='filter_icon'>
                                    <p className='filter_text'>FILTERS</p>
                                    <p className=""><FaSlidersH /></p>
                                </div>
                                <div>
                                <Link to="/creditItem" className=' btn backbtton' type="button">BACK</Link>
                                    {finish ?

                                        <button className='btn selectbtton' onClick={sendEmail}>FINISH</button>
                                        :
                                        count === 0
                                            ?
                                            <button className=' btn selectbtton'> NO ITEM SELECTED </button>
                                            :
                                            <button className=' btn selectbttonnext' onClick={handleDisputeReason} > {count} &nbsp;ITEM SELECTED - NEXT </button>
                                    }
                                </div>
                            </div>


                            <Row>
                                <Col lg={2} md={3} className="d-flex justify-content-center">
                                    <div className="nav  verticaLnav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <p className='accountstatus'>Account Status</p>
                                        <button className="nav-link verticalLink active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#positive" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Positive</button>
                                        <button className="nav-link verticalLink" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#negative" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Negative</button>
                                        <button className="nav-link verticalLink" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#all" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">All</button>
                                    </div>
                                </Col>
                                <Col lg={10} md={9}>
                                    <div className="tab-content" id="v-pills-tabContent">
                                        {/* ---------------------------------positive----------------------------------------------------- */}
                                        <div className="tab-pane fade show active" id="positive" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            {/* *************  horizatanl navbar positive ******************* */}

                                            <Col lg={12}>
                                                <div className="tab-content" id="pills-tabContent">
                                                    {/* ************************ transunion report ************************ */}
                                                    <div className="tab-pane fade show active" id="transunion" role="tabpanel" aria-labelledby="pills-home-tab">
                                                        <Col lg={12}>
                                                            <div className="accordian_content mt-3">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header className='accordinbtn'>ACCOUNTS</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12}>
                                                                                        {positive_equifax ?
                                                                                            positive_equifax.map((e, index) => {
                                                                                                var remark = e.Remark
                                                                                                var remark_value = Array.isArray(remark)
                                                                                                return (
                                                                                                    <>
                                                                                                        <Table size="sm" className='maintable' responsive>
                                                                                                            <tr>
                                                                                                                <td className='credit_checkbox'>
                                                                                                                    <div className="form-check" >
                                                                                                                        <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox" type="checkbox" value={index} id="flexCheckChecked"  style={{marginLeft:"0px",marginRight: "10px"}}/>
                                                                                                                        <label className="form-check-label " for="flexC  heckChecked">
                                                                                                                            <span className="accountName">{e.GrantedTrade.AccountType.description}</span>
                                                                                                                            <br></br>
                                                                                                                            <b className="accountType">{e.creditorName}</b>
                                                                                                                        </label>
                                                                                                                    </div>
                                                                                                                </td>
                                                                                                                <td>BALANCE
                                                                                                                    <br></br>
                                                                                                                    <b>${e.highBalance}</b>
                                                                                                                </td>
                                                                                                                <td>ACCOUNT STATUS
                                                                                                                    <br></br>
                                                                                                                    <b>Positive</b>
                                                                                                                </td>

                                                                                                                <td className="disputeReason" id={index} onClick={e => handleShow(e)} value={index} name="dispute" style={{ color: "red" }}>Add Dispute Reason </td>
                                                                                                                <td type="button" className='pulsbutton' data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                                                                            </tr>
                                                                                                        </Table>
                                                                                                        <div className="collapse" id={`collapse${index}`}>
                                                                                                            <div className="card card-body">
                                                                                                                <Container>
                                                                                                                    <Row>
                                                                                                                        <Col lg={6}>
                                                                                                                            <Table striped bordered hover size="sm" className='table_content' responsive>
                                                                                                                                <tbody className='table_details'>
                                                                                                                                    <tr>
                                                                                                                                        <td>Account</td>
                                                                                                                                        <td className='accountNumber'>{e.accountNumber}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Status</td>
                                                                                                                                        <td>{e.OpenClosed.description}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Credit Limit</td>
                                                                                                                                        <td>${e.GrantedTrade.CreditLimit}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Hight Balance</td>
                                                                                                                                        <td className='highBalance'>${e.highBalance}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Payment Amount</td>
                                                                                                                                        <td>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Last Payment</td>
                                                                                                                                        <td>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Term</td>
                                                                                                                                        <td>{e.GrantedTrade.TermType.description}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Description</td>
                                                                                                                                        <td>{e.AccountDesignator.description}</td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </Table>
                                                                                                                        </Col>
                                                                                                                        <Col lg={6}>
                                                                                                                            <Table striped bordered hover size="sm" className='table_content'  responsive>
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td>Open Date</td>
                                                                                                                                        <td className='openDate'>{e.dateOpened}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Closed Date</td>
                                                                                                                                        <td>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Last Reported</td>
                                                                                                                                        <td>{e.dateReported}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Days Late</td>
                                                                                                                                        <td className='DaysLate'>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Payment Status</td>
                                                                                                                                        <td className='PayStatus'>{e.PayStatus.description}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td >Past Due</td>
                                                                                                                                        <td className='PastDue'>{e.GrantedTrade.amountPastDue}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Worst Rating</td>
                                                                                                                                        <td className='worstRating'>{e.GrantedTrade.WorstPayStatus.description}</td>


                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Remarks</td>
                                                                                                                                        <td style={{ color: "red" }} className="Remark">
                                                                                                                                            {remark_value ?
                                                                                                                                                remark.map((i) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <td style={{ color: "red" }}>
                                                                                                                                                                {i.RemarkCode.description}
                                                                                                                                                            </td> <br />
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                                :
                                                                                                                                                <>
                                                                                                                                                    {e.Remark == undefined ?
                                                                                                                                                        "--------"
                                                                                                                                                        :
                                                                                                                                                        e.Remark.RemarkCode.description
                                                                                                                                                    }
                                                                                                                                                </>
                                                                                                                                            }

                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>

                                                                                                                            </Table>
                                                                                                                        </Col>
                                                                                                                    </Row>
                                                                                                                </Container>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </>
                                                                                                )
                                                                                            })
                                                                                            :
                                                                                            <div><h1>Loading............</h1></div>
                                                                                        }
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>

                                                                    {/************************ ************** INQUIRIES ***************************************************************/}
                                                                    <Accordion.Item eventKey="2">
                                                                        <Accordion.Header className='accordinbtn'>INQUIRIES</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12}>
                                                                                        {equifaxInquiry ?
                                                                                            equifaxInquiry.map((e) => {
                                                                                                console.log("e", e)
                                                                                                return (
                                                                                                    <Table size="sm" className='maintable ' responsive>
                                                                                                        <tr>
                                                                                                            <td className='credit_checkbox'>
                                                                                                                <div className="form-check">
                                                                                                                    <label className="form-check-label" for="flexCheckChecked">
                                                                                                                        Business Name
                                                                                                                        <br></br>
                                                                                                                        <b>{e.Inquiry.subscriberName}</b>
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td style={{ width: "236px" }}>Business Type
                                                                                                                <br></br>
                                                                                                                <b>{e.Inquiry.IndustryCode.description}</b>
                                                                                                            </td>
                                                                                                            <td>Inquiry For
                                                                                                                <br></br>
                                                                                                                {e.Inquiry.inquiryType === "I" ?
                                                                                                                    <b>Individual</b>
                                                                                                                    :
                                                                                                                    <b></b>
                                                                                                                }

                                                                                                            </td>


                                                                                                            <td>DATE
                                                                                                                <br></br>
                                                                                                                <b>{e.Inquiry.inquiryDate}</b>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </Table>
                                                                                                )
                                                                                            })
                                                                                            :
                                                                                            <>
                                                                                                Loading.........................
                                                                                            </>}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>

                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>




                                        {/* ---------------------------------negative----------------------------------------------------- */}

                                        <div className="tab-pane fade" id="negative" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                            {/* *************  horizatanl navbar negative ******************* */}
                                            <Col lg={12}>
                                                <div className="tab-content" id="pills-tabContent">
                                                    {/* ************************ transunion report ************************ */}
                                                    <div className="tab-pane fade show active" id="transunion1" role="tabpanel" aria-labelledby="pills-home-tab">
                                                        <Col lg={12}>
                                                            <div className="accordian_content mt-3">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header className='accordinbtn'  >ACCOUNTS</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12}>
                                                                                        {negative_equifax ?
                                                                                            negative_equifax.map((e, index) => {
                                                                                                var remark = e.Remark
                                                                                                var remark_value = Array.isArray(remark)
                                                                                                return (
                                                                                                    <>
                                                                                                        <Table size="sm" className='maintable' responsive>
                                                                                                            <tr>
                                                                                                                <td className='credit_checkbox'>
                                                                                                                    <div className="form-check">
                                                                                                                        <input onChange={e => handleCheckCount(e)} className="form-check-input mycheckbox" type="checkbox" value="" id="flexCheckChecked"   style={{marginLeft:"0px",marginRight: "10px"}}/>
                                                                                                                        <label className="form-check-label" for="flexCheckChecked">
                                                                                                                            <span className="accountName">{e.GrantedTrade.AccountType.description}</span>
                                                                                                                            <br></br>
                                                                                                                            <b className="accountType">{e.creditorName}</b>
                                                                                                                        </label>
                                                                                                                    </div>
                                                                                                                </td>
                                                                                                                <td>BALANCE
                                                                                                                    <br></br>
                                                                                                                    <b>${e.highBalance}</b>
                                                                                                                </td>
                                                                                                                <td>ACCOUNT STATUS
                                                                                                                    <br></br>
                                                                                                                    <b>Negative</b>
                                                                                                                </td>

                                                                                                                <td className="disputeReason" id={index} onClick={e => handleShow(e)} value={index} name="dispute" style={{ color: "red" }}>Add Dispute Reason </td>
                                                                                                                <td type="button" className='pulsbutton' data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                                                                            </tr>
                                                                                                        </Table>
                                                                                                        <div className="collapse" id={`collapse${index}`}>
                                                                                                            <div className="card card-body">
                                                                                                                <Container>
                                                                                                                    <Row>
                                                                                                                        <Col lg={6}>
                                                                                                                            <Table striped bordered hover size="sm" className='table_content' responsive>
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td>Account</td>
                                                                                                                                        <td className="accountNumber">{e.accountNumber}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Status</td>
                                                                                                                                        <td>{e.OpenClosed.description}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Credit Limit</td>
                                                                                                                                        <td>${e.GrantedTrade.CreditLimit}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Hight Balance</td>
                                                                                                                                        <td className='highBalance'>${e.highBalance}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Payment Amount</td>
                                                                                                                                        <td>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Last Payment</td>
                                                                                                                                        <td>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Term</td>
                                                                                                                                        <td>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Description</td>
                                                                                                                                        <td>{e.AccountDesignator.description}</td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </Table>
                                                                                                                        </Col>
                                                                                                                        <Col lg={6}>
                                                                                                                            <Table striped bordered hover size="sm" className='table_content' responsive>
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td>Open Date</td>
                                                                                                                                        <td className='openDate'>{e.dateOpened}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Closed Date</td>
                                                                                                                                        <td>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Last Reported</td>
                                                                                                                                        <td>{e.dateReported}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Days Late</td>
                                                                                                                                        <td className='DaysLate'>daylate</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Payment Status</td>
                                                                                                                                        <td className='PayStatus'>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Past Due</td>
                                                                                                                                        <td className='PastDue'>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Worst Rating</td>
                                                                                                                                        <td className='worstRating'>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Remarks</td>
                                                                                                                                        <td style={{ color: "red" }} className="Remark">
                                                                                                                                            {remark_value ?
                                                                                                                                                remark.map((i) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <td style={{ color: "red" }}>
                                                                                                                                                                {i.RemarkCode.description}
                                                                                                                                                            </td> <br />
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                                :
                                                                                                                                                <>
                                                                                                                                                    {e.Remark == undefined ?
                                                                                                                                                        "--------"
                                                                                                                                                        :
                                                                                                                                                        e.Remark.RemarkCode.description
                                                                                                                                                    }
                                                                                                                                                </>
                                                                                                                                            }

                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>

                                                                                                                            </Table>
                                                                                                                        </Col>
                                                                                                                    </Row>
                                                                                                                </Container>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </>
                                                                                                )
                                                                                            })
                                                                                            :
                                                                                            <div><h1>Loading............</h1></div>
                                                                                        }
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>




                                                                    {/************************ ************** INQUIRIES ***************************************************************/}
                                                                    <Accordion.Item eventKey="2">
                                                                        <Accordion.Header className='accordinbtn'>INQUIRIES</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12}>
                                                                                        {equifaxInquiry ?
                                                                                            equifaxInquiry.map((e) => {
                                                                                                console.log("e", e)
                                                                                                return (
                                                                                                    <Table size="sm" className='maintable ' responsive>
                                                                                                        <tr>
                                                                                                            <td className='credit_checkbox'>
                                                                                                                <div className="form-check">
                                                                                                                    <label className="form-check-label" for="flexCheckChecked">
                                                                                                                        Business Name
                                                                                                                        <br></br>
                                                                                                                        <b>{e.Inquiry.subscriberName}</b>
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td style={{ width: "236px" }}>Business Type
                                                                                                                <br></br>
                                                                                                                <b>{e.Inquiry.IndustryCode.description}</b>
                                                                                                            </td>
                                                                                                            <td>Inquiry For
                                                                                                                <br></br>
                                                                                                                {e.Inquiry.inquiryType === "I" ?
                                                                                                                    <b>Individual</b>
                                                                                                                    :
                                                                                                                    <b></b>
                                                                                                                }

                                                                                                            </td>


                                                                                                            <td>DATE
                                                                                                                <br></br>
                                                                                                                <b>{e.Inquiry.inquiryDate}</b>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </Table>
                                                                                                )
                                                                                            })
                                                                                            :
                                                                                            <>
                                                                                                Loading.........................
                                                                                            </>}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>

                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>



                                        {/* ---------------------------------All----------------------------------------------------- */}

                                        <div className="tab-pane fade" id="all" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                            {/* *************  horizatanl navbar positive ******************* */}


                                            <Col lg={12}>
                                                <div className="tab-content" id="pills-tabContent">
                                                    {/* ************************ transunion report ************************ */}
                                                    <div className="tab-pane fade show active" id="transunion4" role="tabpanel" aria-labelledby="pills-home-tab">
                                                        <Col lg={12}>
                                                            <div className="accordian_content mt-3">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header className='accordinbtn'  >ACCOUNTS</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12}>
                                                                                        {equifax ?
                                                                                            equifax.map((e, index) => {
                                                                                                // console.log("remark", e.Remark.RemarkCode.description);
                                                                                                var remark = e.Remark

                                                                                                var remark_value = Array.isArray(remark)
                                                                                                return (
                                                                                                    <>
                                                                                                        <Table size="sm" className='maintable' responsive>
                                                                                                            <tr>
                                                                                                                <td className='credit_checkbox'>
                                                                                                                    <div className="form-check">
                                                                                                                        <input onChange={e => handleCheckCount(e)} className="form-check-input mycheckbox" type="checkbox" value="" id="flexCheckChecked"   style={{marginLeft:"0px",marginRight: "10px"}}/>
                                                                                                                        <label className="form-check-label" for="flexCheckChecked">

                                                                                                                            <span className="accountName">{e.GrantedTrade.AccountType.description}</span>

                                                                                                                            <br></br>
                                                                                                                            <b className="accountType">{e.creditorName}</b>
                                                                                                                        </label>
                                                                                                                    </div>
                                                                                                                </td>
                                                                                                                <td >BALANCE
                                                                                                                    <br></br>
                                                                                                                    <b>${e.highBalance}</b>
                                                                                                                </td>
                                                                                                                <td>ACCOUNT STATUS
                                                                                                                    <br></br>
                                                                                                                    {e.PayStatus.description === "Current" && e.GrantedTrade.WorstPayStatus.description === "Current" ?
                                                                                                                        <b>POSITIVE</b>
                                                                                                                        :
                                                                                                                        <b>NEGATIVE</b>
                                                                                                                    }
                                                                                                                </td>
                                                                                                                <td onClick={e => handleShow(e)} className="disputeReason" value={index} name="dispute">Add Dispute Reason </td>
                                                                                                                <td className='pulsbutton' type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                                                                            </tr>
                                                                                                        </Table>
                                                                                                        <div className="collapse" id={`collapse${index}`}>
                                                                                                            <div className="card card-body">
                                                                                                                <Container>
                                                                                                                    <Row>
                                                                                                                        <Col lg={6}>
                                                                                                                            <Table striped bordered hover size="sm" className='table_content' responsive>
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td>Account</td>
                                                                                                                                        <td className="accountNumber">{e.accountNumber}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Status</td>
                                                                                                                                        <td>{e.OpenClosed.description}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Credit Limit</td>
                                                                                                                                        <td>${e.GrantedTrade.CreditLimit}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Hight Balance</td>
                                                                                                                                        <td className='highBalance'>${e.highBalance}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Payment Amount</td>
                                                                                                                                        {/* <td>{ e.AccountCondition.description}</td> */}

                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Last Payment</td>
                                                                                                                                        {/* <td>AccountType</td> */}
                                                                                                                                        {/* <td>{e.GrantedTrade.AccountType.description}</td> */}
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Term</td>
                                                                                                                                        <td>{e.GrantedTrade.TermType.description}</td>

                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Description</td>
                                                                                                                                        <td>{e.AccountDesignator.description}</td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </Table>
                                                                                                                        </Col>
                                                                                                                        <Col lg={6}>
                                                                                                                            <Table striped bordered hover size="sm" className='table_content' responsive>
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td>Open Date</td>
                                                                                                                                        <td className='openDate'>{e.dateOpened}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Closed Date</td>
                                                                                                                                        <td>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Last Reported</td>
                                                                                                                                        <td>{e.dateReported}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Days Late</td>
                                                                                                                                        <td className='DaysLate'>-</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Payment Status</td>
                                                                                                                                        <td className='PayStatus'>{e.PayStatus.description}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Past Due</td>
                                                                                                                                        <td className='PastDue'>{e.GrantedTrade.amountPastDue}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Worst Rating</td>
                                                                                                                                        <td className='worstRating'>{e.GrantedTrade.WorstPayStatus.description}</td>

                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Remarks</td>
                                                                                                                                        <td style={{ color: "red" }} className="Remark">
                                                                                                                                            {remark_value ?
                                                                                                                                                remark.map((i) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <td style={{ color: "red" }}>
                                                                                                                                                                {i.RemarkCode.description}
                                                                                                                                                            </td> <br />
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                                :
                                                                                                                                                <>
                                                                                                                                                    {e.Remark == undefined ?
                                                                                                                                                        "--------"
                                                                                                                                                        :
                                                                                                                                                        e.Remark.RemarkCode.description
                                                                                                                                                    }
                                                                                                                                                </>
                                                                                                                                            }

                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>

                                                                                                                            </Table>
                                                                                                                        </Col>
                                                                                                                    </Row>
                                                                                                                </Container>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </>
                                                                                                )
                                                                                            })
                                                                                            :
                                                                                            <div><h1>Loading............</h1></div>
                                                                                        }
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>


                                                                    {/************************ ************** INQUIRIES ***************************************************************/}
                                                                    <Accordion.Item eventKey="2">
                                                                        <Accordion.Header className='accordinbtn'>INQUIRIES</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12}>
                                                                                        {equifaxInquiry ?
                                                                                            equifaxInquiry.map((e) => {
                                                                                                console.log("e", e)
                                                                                                return (
                                                                                                    <Table size="sm" className='maintable ' responsive>
                                                                                                        <tr>
                                                                                                            <td className='credit_checkbox'>
                                                                                                                <div className="form-check">
                                                                                                                    <label className="form-check-label" for="flexCheckChecked">
                                                                                                                        Business Name
                                                                                                                        <br></br>
                                                                                                                        <b>{e.Inquiry.subscriberName}</b>
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td style={{ width: "236px" }}>Business Type
                                                                                                                <br></br>
                                                                                                                <b>{e.Inquiry.IndustryCode.description}</b>
                                                                                                            </td>
                                                                                                            <td>Inquiry For
                                                                                                                <br></br>
                                                                                                                {e.Inquiry.inquiryType === "I" ?
                                                                                                                    <b>Individual</b>
                                                                                                                    :
                                                                                                                    <b></b>
                                                                                                                }

                                                                                                            </td>


                                                                                                            <td>DATE
                                                                                                                <br></br>
                                                                                                                <b>{e.Inquiry.inquiryDate}</b>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </Table>
                                                                                                )
                                                                                            })
                                                                                            :
                                                                                            <>
                                                                                                Loading.........................
                                                                                            </>}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>

                                                                        </Accordion.Body>
                                                                    </Accordion.Item>

                                                                </Accordion>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>


            <Modal show={show} onHide={handleClose1}>
                <div className='text-center modal_adddisput_title '>
                    <h6 >Add Dispute Reason</h6>
                    <hr />
                </div>
                <Modal.Body>
                    <section className='disputemodel'>
                        <div>
                            <Table className='selectdisputereason_table' responsive>
                                <tbody>
                                    <tr>
                                        <td colSpan="2"><span className='modalaccountName'>{accountName}</span><br /><p style={{ fontSize: "15px" }} className='modalaccountType'><b >{accountType}</b></p></td>
                                    </tr>
                                    <tr>
                                        <td>DAYS LATE <br /><b>{daysLate}</b></td>
                                        <td>BALANCE <br /><b className='modalBalance'>{highBalance}</b></td>
                                    </tr>
                                    <tr>
                                        <td>ACCOUNT<br /><b className='modalaccountNumber'>{accountNumber}</b></td>
                                        <td className='modalOpenDate'>OPEN DATE <br /><b>{openDate}</b></td>
                                    </tr>

                                    <tr>
                                        <td >PAYMENT STATUS <br /><b style={{ color: "red" }}>{payStatus}</b></td>
                                        <td>PAST DUE <br /><b style={{ color: "red" }}>{pastDue}</b></td>
                                    </tr>
                                    <tr>
                                        <td>WORST RATING <br /><b style={{ color: "red" }}>{worstRating}</b></td>
                                        <td>REMARKS <br /><b style={{ color: "red" }}>{remark}</b></td>
                                    </tr>

                                </tbody>
                            </Table>

                        </div>
                        <div className='selectdisputreason' >
                            Select Dispute reason for this item.You can always edit the text to best describe your specific situation 
                        </div>

                        <div className="reasonSelection">
                            <Form.Label>Select Reason:</Form.Label>
                            <Form.Select aria-label="Default select example" size="sm" onChange={(e) => showcustom(e)}>
                                <option>Suggested Reason</option>
                                <option value="custom" >Custom Reason</option>
                                <option value="never">Never Late</option>
                                <option value="incorrect">Incorrect Balance</option>
                                <option value="balance">Balance Was Paid</option>
                                <option value="charged">Charged Off Balance</option>
                                <option value="collection">Sent To Collections</option>
                                <option value="victim">Victim of Identity Theft</option>
                                <option value="disputed">I Previously Disputed This</option>
                            </Form.Select>


                            {custom ?
                                <textarea className="form-control detailsReasons" id="customReason" placeholder=" Type your custom reason here"></textarea>
                                : <div></div>}


                            {never ?
                                <div className='detailsReasons' id="never">
                                    Never Late  <br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                    consequuntur dolorum facilis
                                    aliquam eos illo, iusto pariatur maiores
                                </div>
                                :
                                <div></div>
                            }

                            {incorrect ?
                                <div className='detailsReasons' id="incorrect" >
                                    Incorrect Balance <br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                    consequuntur dolorum facilis
                                    aliquam eos illo, iusto pariatur maiores
                                </div> :
                                <div></div>
                            }

                            {balance ?
                                <div className='detailsReasons' id="balance">
                                    Balance Was Paid <br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                    consequuntur dolorum facilis
                                    aliquam eos illo, iusto pariatur maiores
                                </div> :
                                <div></div>
                            }


                            {charged ?
                                <div className='detailsReasons' id="charged">
                                    Charged Off Balance<br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                    consequuntur dolorum facilis
                                    aliquam eos illo, iusto pariatur maiores
                                </div>
                                :
                                <div></div>
                            }


                            {collection ?
                                <div className='detailsReasons' id="collection" >
                                    Sent To Collections<br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                    consequuntur dolorum facilis
                                    aliquam eos illo, iusto pariatur maiores
                                </div>
                                :
                                <div></div>
                            }


                            {victim ?
                                <div className='detailsReasons' id="victim" >
                                    Victim of Identity Theft<br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                    consequuntur dolorum facilis
                                    aliquam eos illo, iusto pariatur maiores
                                </div>
                                :
                                <div></div>
                            }

                            {disputed ?
                                <div className='detailsReasons' id="disputed" >
                                    I Previously Disputed This<br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                    consequuntur dolorum facilis
                                    aliquam eos illo, iusto pariatur maiores
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer className='disputereason_footer'>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => { first.current() }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer
                position="top-center"
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
