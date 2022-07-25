import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Accordion, Table, Button, Modal, Form } from 'react-bootstrap'
import { FaSlidersH, FaPlusSquare } from 'react-icons/fa';
import $ from 'jquery';
import DisputeStepper from "../DisputeLetter/DisputeStepper"
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import axios from 'axios';
import { EQUIFAX_DISPUTE_LETTER } from "../../Url";
import Header from './Header';
import UserFooter from '../Common/UserFooter';

export default function EquifaxDispute() {
    const bundledata = JSON.parse(sessionStorage.getItem("BUNDLEDATA"));
    const TrackingToken = sessionStorage.getItem("TRACKINGTOKEN");
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);
    const [showInquire, setShowInquire] = useState(false);
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
    const [subscriberName, setSubscriberName] = useState();
    const [industryCode, setIndustryCode] = useState();
    const [individualName, setIndividualName] = useState();
    const [inquiryDate, setInquiryDate] = useState();
    let Navigate = useNavigate()

    var socialSecurityNumber = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.SocialSecurityNumber
    // var equifaxBorrowerName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[2].Name.first + " " + bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.last
    // var equifaxBorrowerAddress = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[2].CreditAddress
    var transunionBorrowerName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.first + " " + bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.last
    var transunionBorrowerAddress = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress
    var tradeLinePartition = bundledata.BundleComponent[6].TrueLinkCreditReportType.TradeLinePartition
    var InquiryPartition = bundledata.BundleComponent[6].TrueLinkCreditReportType.InquiryPartition
    var d = new Date().toLocaleDateString()
    var fulldate = d;


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
                    if (item.bureau === "Equifax" && item.GrantedTrade !== undefined) {
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
        $(".disputeReason1").css("visibility", "hidden");
    }, [])


    const handleDisputeReason = (e) => {
        const check = document.getElementsByClassName("mycheckbox")
        const check1 = document.getElementsByClassName("mycheckbox1")

        for (let i = 0; i < check.length; i++) {
            if (check[i].checked === true) {

                document.getElementsByClassName("disputeReason")[i].style.visibility = "visible";

            }
        }

        for (let i = 0; i < check1.length; i++) {
            if (check1[i].checked === true) {

                document.getElementsByClassName("disputeReason1")[i].style.visibility = "visible";

            }
        }

        setShowDispute(true)
        setProgress(1)

    }


    const first = useRef(null)


    useEffect(() => {

        first.current = handleClose;
        var letterObject = [];


        function handleClose() {
            const inquiryReason = document.getElementById("inquiryReason")
            const subscriberName = document.getElementsByClassName("subscriberName")[0];
            const industryCode = document.getElementsByClassName("industryCode")[0];
            const individualName = document.getElementsByClassName("individualName")[0];
            const inquiryDate = document.getElementsByClassName("inquiryDate")[0];

            console.log(subscriberName, industryCode, individualName, inquiryDate)

            const customReason = document.getElementById("customReason")
            const modalaccountName = document.getElementsByClassName("modalaccountName")[0]
            const modalaccountType = document.getElementsByClassName("modalaccountType")[0]
            const modalaccountNumber = document.getElementsByClassName("modalaccountNumber")[0]
            const modalOpenDate = document.getElementsByClassName("modalOpenDate")[0]
            const modalhighbalance = document.getElementsByClassName("modalBalance")[0]
            const detailsReasons = document.getElementsByClassName("detailsReasons")[0]
            var reasons = ''


            if (modalaccountName && modalaccountType && modalaccountNumber && modalOpenDate && modalhighbalance) {

                if (customReason) {
                    reasons = customReason.value
                }

                if (detailsReasons) {
                    reasons = detailsReasons.innerText
                }

                var NewObject = {
                    "acName": modalaccountName.innerText,
                    "actype": modalaccountType.innerText,
                    "acNumber": modalaccountNumber.innerText,
                    "openDate": modalOpenDate.innerText,
                    "balance": modalhighbalance.innerText,
                    "reasons": reasons
                }

            }

            if (inquiryReason) {
                var inquiryDisputeReason = {

                    "inquiryReason": inquiryReason.value,
                    "subscriberName":subscriberName.innerText,
                    "industryCode":industryCode.innerText,
                    "inquiryDate":inquiryDate.innerText
                }
            }

            if (NewObject) {
                letterObject.push(NewObject)
                sessionStorage.setItem("LetterObject", JSON.stringify(letterObject))
                setShow(false);
            }

            if(inquiryDisputeReason){
                letterObject.push(inquiryDisputeReason)
                sessionStorage.setItem("LetterObject", JSON.stringify(letterObject))
                setShowInquire(false);
                console.log("bhdfdjf")
            }

          
   
            setFinish(true);
            setProgress(2)

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
        setShowInquire(false);
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


    const handleShowInquire = (e) => {
        setShowInquire(true)

        setSubscriberName(document.getElementsByClassName("subscriberName")[e.target.attributes.id.nodeValue].innerText)
        setIndustryCode(document.getElementsByClassName("industryCode")[e.target.attributes.id.nodeValue].innerText)
        setIndividualName(document.getElementsByClassName("individualName")[e.target.attributes.id.nodeValue].innerText)
        setInquiryDate(document.getElementsByClassName("inquiryDate")[e.target.attributes.id.nodeValue].innerText)

    }



    const sendEmail = () => {
        var mailbody = []
        const LetterObject = JSON.parse(sessionStorage.getItem("LetterObject"));

        if (LetterObject) {
            LetterObject.map((e) => {
                if(e.inquiryReason){
                    var g = `Inquiry of ${subscriberName}<span style="visibility:hidden">1</span>(${industryCode}) on the date of ${inquiryDate}.</br>${e.inquiryReason}`
                }
                if(e.actype){
                    var g = `${e.actype}<span style="visibility:hidden">1</span>${e.acName} with account ${e.acNumber} opended on ${e.openDate} and a balance of ${e.balance} .</br>${e.reasons}`
                }
                mailbody.push(g)
            })


            var doc = new jsPDF("p", "pt", "a4");
            doc.html(` 
            <div id="content">
           <div id='userdetails'>

              <div id="useraddress">
                <p id="username">${transunionBorrowerName}</p>
                <p>${transunionBorrowerAddress.houseNumber + " " + transunionBorrowerAddress.streetName}</p>
                <p>${transunionBorrowerAddress.city + "," + transunionBorrowerAddress.stateCode + " " + transunionBorrowerAddress.postalCode}</p>
                <p> SSN : ${socialSecurityNumber}</p>
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
               <p>Dear Equifax,</p>
               <p>Re:Letter to Remove Inaccurate Credit Information
               <p>I received a copy of my credit report and found the following item(s) to be in error:</p>
              ${mailbody.map((e) => {
                return (
                    `<div style="text-align:justify">
                        <p>${e}</p>
                    </div>
                    `
                )
            })}

            <p style="text-align:justify">By the provisions of the Fair Credit Reporting Act, I demand that these items be investigated and removed from my report. It is my understating that you will recheck these items with the creditor who has posted them. Please remove any information that the creditor cannot verify. I understand that under 15 U.S.C. Sec. 1681i(a), you must complete this reinvestigation within 30 days of receipt of this letter.</p>

           <p style="text-align:justify">Please send an updated copy of my credit report to the above address. According to the act, there shall be no charge for this updated report. I also request  that you please send notices of corrections to anyone who received my credit report in the past six months.</p>

           <p>Thank you for your time and help in this matter.</p>

           </div>
           <div id='letterfooter'>
               <p>Sincerely,</p>
               <p>${transunionBorrowerName}</p>
           </div>
       </div>`, {
                callback: function (pdf) {
                    var demo = pdf.output("datauristring");
                    pdf.save("equifax.pdf")
                    var disputedate = new Date().toLocaleDateString()
                    var _disputeDate = disputedate

                    const article = {
                        trackingToken: TrackingToken,
                        equifax_create_date: _disputeDate,
                        equifax_pdf: demo
                    };

                    axios.post(EQUIFAX_DISPUTE_LETTER, article)
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

            <div className='_dispute_heading'>
                <h6 className='_dispute_heading_title'>EQUIFAX DISPUTE</h6>
            </div>


            <div className='mt-5'>
                <DisputeStepper progress={progress} />
            </div>

            <section className='creditItem' id="creditItem" >

                <Container className='mt-5 disputebox '>
                    <Row>
                        <Col lg={12}>
                            <div className='transUnion_filter'>
                                {/* <div className='filter_icon'>
                                    <p className='filter_text'>FILTERS</p>
                                    <p className=""><FaSlidersH /></p>
                                </div> */}
                                <div className='back_selectbtn' >
                                    <Link to="/creditItem" className=' btn backbtton'>BACK</Link>
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
                                {/* <Col lg={2} md={3} className="d-flex justify-content-center">
                                    <div className="nav  verticaLnav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <p className='accountstatus'>Account Status</p>
                                        <button className="nav-link verticalLink active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#positive" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Positive</button>
                                        <button className="nav-link verticalLink" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#negative" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Negative</button>
                                        <button className="nav-link verticalLink" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#all" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">All</button>
                                    </div>
                                </Col> */}
                                 <Col lg={2}  md={2}>
                                    <div className="nav  verticaLnav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <p className='accountstatus'>Account Status</p>
                                        <button className="nav-link verticalLink active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#positive" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Positive</button>
                                        <button className="nav-link verticalLink" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#negative" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Negative</button>
                                        <button className="nav-link verticalLink" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#all" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">All</button>
                                    </div>
                                </Col>
                                <Col lg={10} md={10}>
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
                                                                                    <Col lg={12} md={12}>
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
                                                                                                                        <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox" type="checkbox" value={index} id="flexCheckChecked" style={{ marginLeft: "0px", marginRight: "10px" }} />
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
                                                                                                                        <Col lg={6} md={6}>
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
                                                                                                                        <Col lg={6} md={6} >
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
                                                                                                                                                    {e.Remark === undefined ?
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
                                                                                    <Col lg={12} md={12}>
                                                                                        {equifaxInquiry ?
                                                                                            equifaxInquiry.map((e,index) => {

                                                                                                return (
                                                                                                    <Table size="sm" className='maintable ' responsive>
                                                                                                        <tr>
                                                                                                            <td className='credit_checkbox'>
                                                                                                                <div className="form-check">
                                                                                                                    <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox1" type="checkbox" value={index} id="flexCheckChecked" />
                                                                                                                    <label className="form-check-label " htmlfor="flexCheckChecked">
                                                                                                                        Business Name
                                                                                                                        <br></br>
                                                                                                                        <b className='subscriberName'>{e.Inquiry.subscriberName}</b>
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td style={{ width: "236px" }}>Business Type
                                                                                                                <br></br>
                                                                                                                <b className='industryCode'>{e.Inquiry.IndustryCode.description}</b>
                                                                                                            </td>
                                                                                                            <td>Inquiry For
                                                                                                                <br></br>
                                                                                                                <span className='individualName'>  {e.Inquiry.inquiryType === "I" ?
                                                                                                                    <b className='individual'>Individual</b>
                                                                                                                    :
                                                                                                                    <b>-</b>
                                                                                                                }</span>


                                                                                                            </td>


                                                                                                            <td>DATE
                                                                                                                <br></br>
                                                                                                                <b className='inquiryDate'>{e.Inquiry.inquiryDate}</b>
                                                                                                            </td>
                                                                                                            <td className="disputeReason1" id={index} onClick={e => handleShowInquire(e)} value={index} name="dispute" style={{ color: "red" }}>Add Dispute Reason </td>

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
                                            <Col lg={12} md={12}>
                                                <div className="tab-content" id="pills-tabContent">
                                                    {/* ************************ transunion report ************************ */}
                                                    <div className="tab-pane fade show active" id="transunion1" role="tabpanel" aria-labelledby="pills-home-tab">
                                                        <Col lg={12} md={12}>
                                                            <div className="accordian_content mt-3">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header className='accordinbtn'  >ACCOUNTS</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12} md={12}>
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
                                                                                                                        <input onChange={e => handleCheckCount(e)} className="form-check-input mycheckbox" type="checkbox" value="" id="flexCheckChecked" style={{ marginLeft: "0px", marginRight: "10px" }} />
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
                                                                                                                        <Col lg={6} md={6}>
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
                                                                                                                        <Col lg={6} md={6}>
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
                                                                                                                                                    {e.Remark === undefined ?
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
                                                                                    <Col lg={12} md={12}>
                                                                                        {equifaxInquiry ?
                                                                                            equifaxInquiry.map((e,index) => {
                                                                                                console.log("e", e)
                                                                                                return (
                                                                                                    <Table size="sm" className='maintable ' responsive>
                                                                                                        <tr>
                                                                                                            <td className='credit_checkbox'>
                                                                                                                <div className="form-check">
                                                                                                                    <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox1" type="checkbox" value={index} id="flexCheckChecked" />
                                                                                                                    <label className="form-check-label " htmlfor="flexCheckChecked">
                                                                                                                        Business Name
                                                                                                                        <br></br>
                                                                                                                        <b className='subscriberName'>{e.Inquiry.subscriberName}</b>
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td style={{ width: "236px" }}>Business Type
                                                                                                                <br></br>
                                                                                                                <b className='industryCode'>{e.Inquiry.IndustryCode.description}</b>
                                                                                                            </td>
                                                                                                            <td>Inquiry For
                                                                                                                <br></br>
                                                                                                                <span className='individualName'>  {e.Inquiry.inquiryType === "I" ?
                                                                                                                    <b className='individual'>Individual</b>
                                                                                                                    :
                                                                                                                    <b>-</b>
                                                                                                                }</span>


                                                                                                            </td>


                                                                                                            <td>DATE
                                                                                                                <br></br>
                                                                                                                <b className='inquiryDate'>{e.Inquiry.inquiryDate}</b>
                                                                                                            </td>
                                                                                                            <td className="disputeReason1" id={index} onClick={e => handleShowInquire(e)} value={index} name="dispute" style={{ color: "red" }}>Add Dispute Reason </td>

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


                                            <Col lg={12} md={12}>
                                                <div className="tab-content" id="pills-tabContent">
                                                    {/* ************************ transunion report ************************ */}
                                                    <div className="tab-pane fade show active" id="transunion4" role="tabpanel" aria-labelledby="pills-home-tab">
                                                        <Col lg={12} md={12}>
                                                            <div className="accordian_content mt-3">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header className='accordinbtn'  >ACCOUNTS</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12} md={12}>
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
                                                                                                                        <input onChange={e => handleCheckCount(e)} className="form-check-input mycheckbox" type="checkbox" value="" id="flexCheckChecked" style={{ marginLeft: "0px", marginRight: "10px" }} />
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
                                                                                                                        <Col lg={6} md={6}>
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
                                                                                                                        <Col lg={6} md={6}>
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
                                                                                                                                                    {e.Remark === undefined ?
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
                                                                                    <Col lg={12} md={12}>
                                                                                        {equifaxInquiry ?
                                                                                            equifaxInquiry.map((e,index) => {

                                                                                                return (
                                                                                                    <Table size="sm" className='maintable ' responsive>
                                                                                                        <tr>
                                                                                                            <td className='credit_checkbox'>
                                                                                                                <div className="form-check">
                                                                                                                    <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox1" type="checkbox" value={index} id="flexCheckChecked" />
                                                                                                                    <label className="form-check-label " htmlfor="flexCheckChecked">
                                                                                                                        Business Name
                                                                                                                        <br></br>
                                                                                                                        <b className='subscriberName'>{e.Inquiry.subscriberName}</b>
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td style={{ width: "236px" }}>Business Type
                                                                                                                <br></br>
                                                                                                                <b className='industryCode'>{e.Inquiry.IndustryCode.description}</b>
                                                                                                            </td>
                                                                                                            <td>Inquiry For
                                                                                                                <br></br>
                                                                                                                <span className='individualName'>  {e.Inquiry.inquiryType === "I" ?
                                                                                                                    <b className='individual'>Individual</b>
                                                                                                                    :
                                                                                                                    <b>-</b>
                                                                                                                }</span>


                                                                                                            </td>


                                                                                                            <td>DATE
                                                                                                                <br></br>
                                                                                                                <b className='inquiryDate'>{e.Inquiry.inquiryDate}</b>
                                                                                                            </td>
                                                                                                            <td className="disputeReason1" id={index} onClick={e => handleShowInquire(e)} value={index} name="dispute" style={{ color: "red" }}>Add Dispute Reason </td>

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
                                <option value="victim">Victim of Identity Theft</option>
                                <option value="disputed">I Previously Disputed This</option>
                            </Form.Select>


                            {custom ?
                                <textarea className="form-control detailsReasons" id="customReason" placeholder=" Type your custom reason here"></textarea>
                                : <div></div>}


                            {never ?
                                <div className='detailsReasons' id="never">
                                    I don't remember ever being late with a payment on this account.
                                    Please provide statement and records of all payments made and missed
                                    since I opened this account.
                                </div>
                                :
                                <div></div>
                            }

                            {incorrect ?
                                <div className='detailsReasons' id="incorrect" >
                                    This dispute is regarding showing incorrect balance in my account. I am requesting that the item be removed to correct the information.
                                    Please reinvestigate this matter and correct the disputed item's score.
                                </div> :
                                <div></div>
                            }

                            {balance ?
                                <div className='detailsReasons' id="balance">
                                    In this account i have already paid this amount.kindly check and give me proper information regarding to this dispute item's.

                                </div> :
                                <div></div>
                            }


                            {charged ?
                                <div className='detailsReasons' id="charged">
                                    I have maintain my account with minimum balance as per the bank rules please investigate this dispute item's and resolve my credit Score.
                                </div>
                                :
                                <div></div>
                            }

                            {victim ?
                                <div className='detailsReasons' id="victim" >
                                    This is not my account i have never register this account please check and remove this account activity from my credit report.
                                </div>
                                :
                                <div></div>
                            }

                            {disputed ?
                                <div className='detailsReasons' id="disputed" >
                                    I have already disputed this item's please reinvestigate this dispute item's and kindly resolve it ASAP.
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


            <Modal show={showInquire}>
                <div className='text-center modal_adddisput_title '>
                    <h6 >Add Dispute Reason checking</h6>
                    <hr />
                </div>
                <Modal.Body>


                    <section className='disputemodel'>
                        <div>
                            <Table className='selectdisputereason_table'>
                                <tbody>
                                    <tr>
                                        <td colSpan="2"><span className='modalaccountName'>BUSINESS NAME</span><br /><p style={{ fontSize: "15px" }}><b >{subscriberName}</b></p></td>
                                    </tr>
                                    <tr>
                                        <td>INQUIRY FOR <br /><b>{individualName}</b></td>
                                        <td>INQUIRY DATE <br /><b className='modalBalance'>{inquiryDate}</b></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">BUSINESS TYPE<br /><b className='modalaccountNumber'>{industryCode}</b></td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>

                        <div className='selectdisputreason' >
                            Type Dispute reason for this item.You can always edit the text to best describe your specific situation
                        </div>

                        <div className="reasonSelection">
                            <Form.Label>Type your reason here:</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="inquiryReason"
                                rows={3}
                                className="mb-3 validate"
                                placeholder="Your Reason"
                                required
                            />
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
            <UserFooter />
        </>
    )
}
