import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Accordion, Table, Button, Modal, Form } from 'react-bootstrap'
import { FaSlidersH, FaPlusSquare } from 'react-icons/fa';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import DisputeStepper from "../DisputeLetter/DisputeStepper"
import jsPDF from 'jspdf';
import axios from 'axios';
import { TRANSUNION_DISPUTE_LETTER } from "../../Url";
import Header from './Header'
import UserFooter from '../Common/UserFooter';


export default function SelectDisputeAC() {
    const bundledata = JSON.parse(sessionStorage.getItem("BUNDLEDATA"));
    const TrackingToken = sessionStorage.getItem("TRACKINGTOKEN");
    const [count, setCount] = useState(0);
    const [inquiryCount, setInquiryCount] = useState(0);
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
    const [selectReason, setSelectReason] = useState(false)
    const [subscriberName, setSubscriberName] = useState();
    const [industryCode, setIndustryCode] = useState();
    const [individualName, setIndividualName] = useState();
    const [inquiryDate, setInquiryDate] = useState();
    const [disputeReasonError, setDisputeReasonError] = useState(false);

    let Navigate = useNavigate()
    var socialSecurityNumber = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.SocialSecurityNumber
    var transunionBorrowerName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.first + " " + bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.last
    var transunionBorrowerAddress = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress
    var tradeLinePartition = bundledata.BundleComponent[6].TrueLinkCreditReportType.TradeLinePartition
    var InquiryPartition = bundledata.BundleComponent[6].TrueLinkCreditReportType.InquiryPartition
    var d = new Date().toLocaleDateString()
    var fulldate = d;


    //******************/ all *****************************//
    var transUnion = [];

    //******************/ Positive *****************************//
    var positive_transUnion = [];

    //******************/ Negative *****************************//
    var negative_transUnion = [];

    //******************/ Inquiry *****************************//
    const transUnionInquiry = [];

    if (tradeLinePartition) {
        tradeLinePartition.map((e) => {
            if (e.Tradeline.length > 0) {
                e.Tradeline.map(item => {
                    if (item.bureau === 'TransUnion' && item.GrantedTrade !== undefined) {
                        transUnion.push(item)
                    }

                })
            } else {
                if (e.Tradeline.bureau === 'TransUnion') {
                    transUnion.push(e.Tradeline)
                }
            }
        })
    }

    if (transUnion) {
        transUnion.map((e, index) => {
            if (e.PayStatus.description === "Current" && e.GrantedTrade.WorstPayStatus.description === "Current") {
                positive_transUnion.push(e)
            } else {
                negative_transUnion.push(e)
            }

        })
    }

    //******************* */ InquiryPartition *************************************
    if (InquiryPartition) {
        InquiryPartition.map((e) => {
            if (e.Inquiry.bureau === "TransUnion") {
                transUnionInquiry.push(e)
            }
        })

    }


    const handleCheckCount = (e) => {
        console.log("e", e.target)
        const { checked } = e.target;
        if (checked === true) {
            setCount(count + 1)
        } else {
            setCount(count - 1)
        }

    }

    const handleInquiryCheckCount = (e) => {
        const { checked } = e.target;
        if (checked === true) {

            setInquiryCount(inquiryCount + 1)
        } else {
            setInquiryCount(inquiryCount - 1)
        }

    }


    useEffect(() => {
        $(".disputeReason").css("visibility", "hidden");
        $(".disputeReason1").css("visibility", "hidden");
    }, [])



    const handleDisputeReason = (e) => {
        const check = document.getElementsByClassName("mycheckbox")

        for (let i = 0; i < check.length; i++) {
            if (check[i].checked === true) {

                document.getElementsByClassName("disputeReason")[i].style.visibility = "visible";

            }
        }
        setShowDispute(true)

    }


    const handleInquiryDisputeReason = () => {
        const check1 = document.getElementsByClassName("mycheckbox1")
        for (let i = 0; i < check1.length; i++) {
            if (check1[i].checked === true) {
                document.getElementsByClassName("disputeReason1")[i].style.visibility = "visible";
            }
        }
        setShowDispute(true)

    }



    const first = useRef(null)
    useEffect(() => {
        first.current = handleClose;
        var letterObject = [];
        var inquiryObject = [];

        function handleClose() {
            var valuedfdf = JSON.parse(sessionStorage.getItem("DisputebtnValue"));
            var inquiryValue = JSON.parse(sessionStorage.getItem("InquiryDisputebtnValue"));

            if (valuedfdf) {
                document.getElementsByClassName("disputeReason")[valuedfdf].style.visibility = "hidden";
                document.getElementsByClassName("mycheckbox")[valuedfdf].checked = false
            }

            if (inquiryValue) {
                document.getElementsByClassName("disputeReason1")[inquiryValue].style.visibility = "hidden";
                document.getElementsByClassName("mycheckbox1")[inquiryValue].checked = false
            }

            const inquiryReason = document.getElementById("inquiryReason");
            const modalsubscriberName = document.getElementsByClassName("modalsubscriberName")[0];
            const modalindustryCode = document.getElementsByClassName("modalindustryCode")[0];
            const modalinquiryDate = document.getElementsByClassName("modalinquiryDate")[0];

        
            const customReason = document.getElementById("customReason")
            const modalaccountName = document.getElementsByClassName("modalaccountName")[0]
            const modalaccountType = document.getElementsByClassName("modalaccountType")[0]
            const modalaccountNumber = document.getElementsByClassName("modalaccountNumber")[0]
            const modalOpenDate = document.getElementsByClassName("modalOpenDate")[0]
            const modalhighbalance = document.getElementsByClassName("modalBalance")[0]
            const detailsReasons = document.getElementsByClassName("detailsReasons")[0]
            var reasons = ''



            if (detailsReasons === undefined && customReason === null) {
                setDisputeReasonError(true);

            } else {
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
                if (NewObject) {
                    letterObject.push(NewObject)
                    sessionStorage.setItem("LetterObject", JSON.stringify(letterObject))
                    setShow(false);
                }
            }

            if (inquiryReason) {
                if (inquiryReason.value) {

                    var NewObject_inquiry = {
                        "inquiryReason": inquiryReason.value,
                        "subscriberName": modalsubscriberName.innerText,
                        "industryCode": modalindustryCode.innerText,
                        "inquiryDate": modalinquiryDate.innerText
                    }

                    if (NewObject_inquiry) {
                        inquiryObject.push(NewObject_inquiry)
                        sessionStorage.setItem("InquiryObject", JSON.stringify(inquiryObject))
                        setShowInquire(false);

                    }
                } else {
                    console.log("inquiryReasond elsssss", inquiryReason.value)
                    setDisputeReasonError(true);
                }
            }
        }
    }, [])



    const handleClose1 = () => {

        setShow(false);
        setShowInquire(false);
    }


    const handleShow = (e) => {
        var dispute_btn = e.target;
        setShow(true)
        $("#content").show()
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

        var dispute_btn_value = dispute_btn.getAttribute("myval");
        if (dispute_btn_value) {
            sessionStorage.setItem("DisputebtnValue", JSON.stringify(dispute_btn_value))
        }

    }

    const handleShowInquire = (e) => {
        var dispute_btn = e.target;
        setShowInquire(true)
        setSubscriberName(document.getElementsByClassName("subscriberName")[e.target.attributes.id.nodeValue].innerText)
        setIndustryCode(document.getElementsByClassName("industryCode")[e.target.attributes.id.nodeValue].innerText)
        setIndividualName(document.getElementsByClassName("individualName")[e.target.attributes.id.nodeValue].innerText)
        setInquiryDate(document.getElementsByClassName("inquiryDate")[e.target.attributes.id.nodeValue].innerText)
        var dispute_btn_value = dispute_btn.getAttribute("value");
        if (dispute_btn_value) {
            sessionStorage.setItem("InquiryDisputebtnValue", JSON.stringify(dispute_btn_value))
        }
    }


    const showcustom = (e) => {
        const suggestion = e.target.value
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



    const sendEmail = () => {
        var mailbody = []
        const LetterObject = JSON.parse(sessionStorage.getItem("LetterObject"));

        if (LetterObject) {
            LetterObject.map((e) => {

                if (e.inquiryReason) {
                    var g = `Inquiry of ${subscriberName}<span style="visibility:hidden">1</span>(${industryCode}) on the date of ${inquiryDate}.</br>${e.inquiryReason}`
                }
                if (e.actype) {
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
               <p>TransUnioun Consumer Solutions </p>
               <p>P.O.Box 2000</p>
               <p>Chester,PA 19016</p>
           </div>

           <div id="letterbody">
               <p>Dear Transunion,</p>
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
                    pdf.save("transunion_account.pdf")

                    var disputedate = new Date().toLocaleDateString()
                    var _disputeDate = disputedate

                    const article = {
                        trackingToken: TrackingToken,
                        transunion_create_date: _disputeDate,
                        account_pdf :demo,
                    };

                    axios.post(TRANSUNION_DISPUTE_LETTER, article)
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
                                // Navigate("/transunionRound_1")
                                toast.success('Dispute letter Created successfully', {
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
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
        }
    }


    const sendInquiryEmail = () => {
        var inquirymailbody = []
        const InquiryObject = JSON.parse(sessionStorage.getItem("InquiryObject"));
  
        if (InquiryObject) {
            InquiryObject.map((e) => {
                if (e.inquiryReason) {
                    var g = `Inquiry of ${e.subscriberName}<span style="visibility:hidden">1</span>(${e.industryCode}) on the date of ${e.inquiryDate}.</br>${e.inquiryReason}`
                }
                inquirymailbody.push(g)
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
           <p>TransUnioun Consumer Solutions </p>
           <p>P.O.Box 2000</p>
           <p>Chester,PA 19016</p>
       </div>

       <div id="letterbody">
           <p>Dear Transunion,</p>
           <p>Re:Letter to Remove Inaccurate Inquiry
           <p>According to my most recent credit report, your company is currently reporting to the three credit bureaus that I applied for credit with your organization. I did not grant you authorization to review my credit report.</p>
          ${inquirymailbody.map((e) => {
                return (
                    `<div style="text-align:justify">
                    <p>${e}</p>
                </div>
               `
                )
            })}
       <p style="text-align:justify">The presence of this inquiry is adversely affecting my credit report and is impeding my ability to obtain necessary credit. Time is of the essence so I would greatly appreciate a response from you within thirty (30) days.</p>

       <p style="text-align:justify">Please mail me the copy of the signed application or a letter indicating your intention to delete the inquiry</p>

       <p>Thank you for your time and help in this matter.</p>

       </div>
       <div id='letterfooter'>
           <p>Sincerely,</p>
           <p>${transunionBorrowerName}</p>
       </div>
   </div>`, {
                callback: function (pdf) {
                    var demo = pdf.output("datauristring");
                    pdf.save("transunion_inquiry.pdf")

                    var disputedate = new Date().toLocaleDateString()
                    var _disputeDate = disputedate

                    const article = {
                        trackingToken: TrackingToken,
                        transunion_create_date: _disputeDate,
                        inquiry_pdf:demo,
                    };

                    axios.post(TRANSUNION_DISPUTE_LETTER, article)
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
                                // Navigate("/transunionRound_1")
                                toast.success('Dispute letter Created successfully', {
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
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })







        }
    }





    return (
        <>
            <Header title="TRANSUNION DISPUTE" />




            <div className='_dispute_heading'>
                <h6 className='_dispute_heading_title'>TRANSUNION DISPUTE</h6>
            </div>


            <section className='creditItem' id="creditItem" >
                <Container className='mt-5 disputebox '>
                    <Row>
                        <Col lg={12} md={12}>
                            <p className='disputebox_heading'>account</p>
                            <div className='transUnion_filter'>
                                <div className='back_selectbtn'>
                                    {count === 0 ?
                                        <button className=' btn selectbtton'> NO ITEM SELECTED </button>
                                        :
                                        <button className=' btn selectbttonnext' onClick={handleDisputeReason} > {count} &nbsp;ITEM SELECTED - NEXT </button>

                                    }
                                    <button className='btn selectbtton' onClick={sendEmail}>FINISH</button>
                                </div>
                            </div>


                            <Row>
                                <Col lg={2} md={2}>
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
                                            <Col lg={12} md={12}>
                                                <div className="tab-content" id="pills-tabContent">
                                                    {/* ************************ transunion report ************************ */}
                                                    <div className="tab-pane fade show active" id="transunion" role="tabpanel" aria-labelledby="pills-home-tab">
                                                        <Col lg={12} md={12}>
                                                            <div className="accordian_content mt-3">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header className='accordinbtn'>ACCOUNTS</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12} md={12}>
                                                                                        {positive_transUnion ?
                                                                                            positive_transUnion.map((e, index) => {
                                                                                                var remark = e.Remark
                                                                                                var remark_value = Array.isArray(remark)
                                                                                                return (
                                                                                                    <>
                                                                                                        <Table size="sm" className='maintable' responsive>
                                                                                                            <tr>
                                                                                                                <td className='credit_checkbox '>
                                                                                                                    <div className="form-check" >
                                                                                                                        <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox" type="checkbox" value={index} id="flexCheckChecked" />
                                                                                                                        <label className="form-check-label " htmlfor="flexCheckChecked">
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
                                                                                                                        <Col lg={6} md={6}>
                                                                                                                            <Table striped bordered hover size="sm" className='table_content' responsive >
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td>Open Date</td>
                                                                                                                                        <td className='openDate'>{e.dateOpened}</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Closed Date</td>
                                                                                                                                        <td>{e.dateClosed}</td>
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
                                                                                        {negative_transUnion ?
                                                                                            negative_transUnion.map((e, index) => {
                                                                                                var remark = e.Remark
                                                                                                var remark_value = Array.isArray(remark)
                                                                                                return (
                                                                                                    <>
                                                                                                        <Table size="sm" className='maintable' responsive>
                                                                                                            <tr>
                                                                                                                <td className='credit_checkbox'>
                                                                                                                    <div className="form-check">
                                                                                                                        <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox" type="checkbox" value={index} id="flexCheckChecked" />
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
                                                                                                                    <b style={{ color: "red" }}>Negative</b>
                                                                                                                </td>

                                                                                                                <td className="disputeReason" id={index} onClick={e => handleShow(e)} value={index} name="dispute" style={{ color: "red" }}>Add Dispute Reason </td>
                                                                                                                <td type="button" className='pulsbutton' data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                                                                            </tr>
                                                                                                        </Table>
                                                                                                        <div className="collapse" id={`collapse${index}`}>
                                                                                                            <div className="card card-body">
                                                                                                                <Container>
                                                                                                                    <Row>
                                                                                                                        <Col lg={6} md={6}  >
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
                                                                                                                                        <td>{e.dateClosed}</td>
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
                                                                                        {transUnion ?
                                                                                            transUnion.map((e, index) => {
                                                                                                var remark = e.Remark
                                                                                                var remark_value = Array.isArray(remark)
                                                                                                return (
                                                                                                    <>
                                                                                                        <Table size="sm" className='maintable' responsive>
                                                                                                            <tr>
                                                                                                                <td className='credit_checkbox'>
                                                                                                                    <div className="form-check">
                                                                                                                        <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox" type="checkbox" value={index} id="flexCheckChecked" />
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
                                                                                                                        <b style={{ color: "red" }}>NEGATIVE</b>
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
                                                                                                                        <Col lg={6} md={6} >
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


                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                        <td>Last Payment</td>

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
                                                                                                                                        <td>{e.dateClosed}</td>
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




                        <hr className='dispute_divider'></hr>



                        <Col lg={12} md={12}>
                            <p className='disputebox_heading'>Inquiry</p>
                            <div className='transUnion_filter'>
                                <div className='back_selectbtn'>
                                    {inquiryCount === 0
                                        ?
                                        <button className=' btn selectbtton'> NO ITEM SELECTED </button>
                                        :
                                        <button className=' btn selectbttonnext' onClick={handleInquiryDisputeReason} > {inquiryCount} &nbsp;ITEM SELECTED - NEXT </button>
                                    }
                                    <button className='btn selectbtton' onClick={sendInquiryEmail}>FINISH</button>

                                </div>
                            </div>


                            <Row>
                                <Col lg={2} md={2}>
                                    <div className="nav  verticaLnav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <p className='accountstatus'>Account Status</p>
                                        <button className="nav-link verticalLink active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#positive" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">All</button>
                                    </div>
                                </Col>
                                <Col lg={10} md={10}>
                                    <div className="tab-content" id="v-pills-tabContent">
                                        {/* ---------------------------------positive----------------------------------------------------- */}
                                        <div className="tab-pane fade show active" id="positive" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            {/* *************  horizatanl navbar positive ******************* */}

                                            <Col lg={12} md={12}>
                                                <div className="tab-content" id="pills-tabContent">
                                                    {/* ************************ transunion report ************************ */}
                                                    <div className="tab-pane fade show active" id="transunion" role="tabpanel" aria-labelledby="pills-home-tab">
                                                        <Col lg={12} md={12}>
                                                            <div className="accordian_content mt-3">
                                                                <Accordion>
                                                                    {/************************ ************** INQUIRIES ***************************************************************/}
                                                                    <Accordion.Item eventKey="2">
                                                                        <Accordion.Header className='accordinbtn'>INQUIRIES</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col lg={12} md={12}>
                                                                                        {transUnionInquiry ?
                                                                                            transUnionInquiry.map((e, index) => {

                                                                                                return (
                                                                                                    <Table size="sm" className='maintable ' responsive>
                                                                                                        <tr>
                                                                                                            <td className='credit_checkbox'>
                                                                                                                <div className="form-check">
                                                                                                                    <input onChange={e => handleInquiryCheckCount(e)} className="form-check-input  mycheckbox1" type="checkbox" value={index} id="flexCheckChecked" />
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
                </Container >
            </section >



            {/***************************  account modal ************************************************************/}
            <Modal show={show} onHide={handleClose1}>
                <div className='text-center modal_adddisput_title '>
                    <h6 >Add Dispute Reason</h6>
                    <hr />
                </div>
                <Modal.Body>
                    <section className='disputemodel'>
                        <div>
                            <Table className='selectdisputereason_table'>
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
                                        <td >OPEN DATE <br /><b className='modalOpenDate'>{openDate}</b></td>
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
                            {disputeReasonError ? <p className='error' id='disputeReasonError'>*Select Dispute Reason </p>
                                : <p></p>
                            }
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

                        {selectReason ? <p className='error mt-2' id="selctReason">*please select reason</p> : <p></p>}

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

            {/*************************** Inquiry modal ************************************************************/}
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
                                        <td colSpan="2"><span>BUSINESS NAME</span><br /><p style={{ fontSize: "15px" }} className='modalsubscriberName'><b >{subscriberName}</b></p></td>
                                    </tr>
                                    <tr>
                                        <td>INQUIRY FOR <br /><b>{individualName}</b></td>
                                        <td>INQUIRY DATE <br /><b className='modalinquiryDate'>{inquiryDate}</b></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">BUSINESS TYPE<br /><b className='modalindustryCode'>{industryCode}</b></td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>

                        <div className='selectdisputreason' >
                            Type Dispute reason for this item.You can always edit the text to best describe your specific situation
                        </div>

                        <div className="reasonSelection">
                            {disputeReasonError ? <p className='error' id='disputeReasonError'>*Select Dispute Reason </p>
                                : <p></p>
                            }
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
