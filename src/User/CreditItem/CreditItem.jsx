import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Table } from 'react-bootstrap';
import UserHeader from '../Common/UserHeader';
import { FaPlusSquare, FaSlidersH } from 'react-icons/fa';
import Footer from '../../Common/Footer';
import { Link } from 'react-router-dom'


export default function CreditItem() {
  const bundledata = JSON.parse(sessionStorage.getItem("BUNDLEDATA"));
  var tradeLinePartition = bundledata.BundleComponent[6].TrueLinkCreditReportType.TradeLinePartition
  var InquiryPartition = bundledata.BundleComponent[6].TrueLinkCreditReportType.InquiryPartition

  const [transunionBtn, setTransunionBtn] = useState(true)
  const [experianBtn, setExperianBtn] = useState(false)
  const [equifaxBtn, setEquifaxBtn] = useState(false)

  var transUnion = [];
  var experian = [];
  var equifax = [];

  var positive_transUnion = [];
  var positive_experian = [];
  var positive_equifax = [];

  var negative_transUnion = [];
  var negative_experian = [];
  var negative_equifax = [];


  if (tradeLinePartition) {

    tradeLinePartition.map((e) => {
      if (e.Tradeline.length > 0) {
        e.Tradeline.map(item => {
          if (item.bureau === 'TransUnion') {
            transUnion.push(item)
          }
          if (item.bureau === "Experian") {
            experian.push(item)
          }
          if (item.bureau === "Equifax") {
            equifax.push(item)
          }
        })
      } else {
        if (e.Tradeline.bureau === 'TransUnion') {
          transUnion.push(e.Tradeline)
        }
        if (e.Tradeline.bureau === "Experian") {
          experian.push(e.Tradeline)
        }
        if (e.Tradeline.bureau === "Equifax") {
          equifax.push(e.Tradeline)
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


      // if (e.AccountCondition.description != "Paid") {

      //   if (e.GrantedTrade.AccountType.description == "Charge account") {
      //     negative_transUnion.push(e)

      //   }
      //   if (e.GrantedTrade.AccountType.description != "Charge account") {
      //     positive_transUnion.push(e)

      //   }
      // }
      // if (e.AccountCondition.description == "Paid") {
      //   repaired_transUnion.push(e)
      // }
    })
  }

  if (experian) {
    experian.map((e) => {

      if (e.PayStatus.description === "Current" && e.GrantedTrade.WorstPayStatus.description === "Current") {
        positive_experian.push(e)
      } else {
        negative_experian.push(e)
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

  const transUnionInquiry = [];
  const experianInquiry = [];
  const equifaxInquiry = [];

  //******************* */ InquiryPartition *************************************
  if (InquiryPartition) {
    InquiryPartition.map((e) => {
      if (e.Inquiry.bureau === "TransUnion") {
        transUnionInquiry.push(e)
      }
      if (e.Inquiry.bureau === "Experian") {
        experianInquiry.push(e)
      }
      if (e.Inquiry.bureau === "Equifax") {
        equifaxInquiry.push(e)
      }
    })

  }


  const changedisputebtn = (e) => {
    if (e.target.value === "transunion") {
      setTransunionBtn(true)
      setEquifaxBtn(false)
      setExperianBtn(false)
    }
    if (e.target.value === "equifax") {
      setEquifaxBtn(true)
      setTransunionBtn(false)
      setExperianBtn(false)
    }
    if (e.target.value === "experian") {
      setExperianBtn(true)
      setTransunionBtn(false)
      setEquifaxBtn(false)
    }
  }





  return (
    <>
      <UserHeader />


      <section className='creditItem '>
        <Container className='mt-5  disputebox'>
          <Row>
            <Col lg={12}>
              <div className='filter'>
                <p className='filter_text'>FILTERS</p>
                <p className=""><FaSlidersH /></p>
              </div>


              <Col lg={12}>
              <Row>
                  <Col lg={2} md={3}>
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
                          <ul className="nav nav-pills horizatanlPill" id="pills-tab" role="tablist">
                            <li className="nav-item horizatalItem" role="presentation">
                              <button className="nav-link  horizatanlMenu active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#transunion" type="button" role="tab" aria-controls="pills-home" aria-selected="true" value="transunion" onClick={changedisputebtn}>Transunion</button>
                            </li>
                            <li className="nav-item horizatalItem" role="presentation">
                              <button className="nav-link horizatanlMenu" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#experian" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" value="experian" onClick={changedisputebtn}>Experian</button>
                            </li>
                            <li className="nav-item horizatalItem" role="presentation">
                              <button className="nav-link horizatanlMenu" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" value="equifax" onClick={changedisputebtn}>Equifax</button>
                            </li>
                            {transunionBtn ?
                              <li className="nav-item horizatalItem_button" role="presentation">
                                <Link to="/transuniondispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE TRANSUNION DISPUTE</button></Link>

                              </li>
                              :
                              <></>
                            }

                            {experianBtn ?
                              <li className="nav-item horizatalItem_button" role="presentation">
                                <Link to="/experiandispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE EXPERIAN DISPUTE</button></Link>
                              </li>
                              :
                              <></>
                            }

                            {equifaxBtn ?

                              <li className="nav-item horizatalItem_button" role="presentation">
                                <Link to="/equifaxdispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE EQUIFAX DISPUTE</button></Link>
                              </li>
                              :
                              <div></div>
                            }

                          </ul>
                        </Col>

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
                                              {positive_transUnion ?
                                                positive_transUnion.map((e, index) => {
                                                  var remark = e.Remark

                                                  var remark_value = Array.isArray(remark)
                                                  return (
                                                    <>
                                                      <Table size="sm" className='maintable'>
                                                        <tr>
                                                          <td className='credit_checkbox'>
                                                            <div className="form-check">
                                                              {/* <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" /> */}
                                                              <label className="form-check-label" for="flexCheckChecked">
                                                                {e.GrantedTrade.AccountType.description}
                                                                <br></br>
                                                                <b>{e.creditorName}</b>
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
                                                          <td type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                        </tr>
                                                      </Table>
                                                      <div className="collapse" id={`collapse${index}`}>
                                                        <div className="card card-body">
                                                          <Container>
                                                            <Row>
                                                              <Col lg={6}>
                                                                <Table striped bordered hover size="sm" className='table_content'>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Account</td>
                                                                      <td>{e.accountNumber}</td>
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
                                                                      <td>${e.highBalance}</td>
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
                                                                <Table striped bordered hover size="sm" className='table_content' >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Open Date</td>
                                                                      <td>{e.dateOpened}</td>
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
                                                                      <td>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Payment Status</td>
                                                                      <td>{e.PayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Past Due</td>
                                                                      <td>{e.GrantedTrade.amountPastDue}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Worst Rating</td>
                                                                      <td>{e.GrantedTrade.WorstPayStatus.description}</td>


                                                                    </tr>
                                                                    <tr>
                                                                      <td>Remarks</td>
                                                                      <td style={{ color: "red" }}>
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
                                            <Col lg={12}>
                                              {transUnionInquiry ?
                                                transUnionInquiry.map((e) => {

                                                  return (
                                                    <Table size="sm" className='maintable '>
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


                            {/* ************************ Experian report ************************ */}
                            <div className="tab-pane fade" id="experian" role="tabpanel" aria-labelledby="pills-profile-tab">
                              <Col lg={12}>
                                <div className="accordian_content mt-3">
                                  <Accordion>
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header className='accordinbtn'  >ACCOUNTS</Accordion.Header>
                                      <Accordion.Body>
                                        <Container>
                                          <Row>
                                            <Col lg={12}>
                                              {positive_experian ?
                                                positive_experian.map((e, index) => {
                                                  var remark = e.Remark
                                                  var remark_value = Array.isArray(remark)
                                                  return (
                                                    <>
                                                      <Table size="sm" className='maintable'>
                                                        <tr>
                                                          <td className='credit_checkbox'>
                                                            <div className="form-check">
                                                              {/* <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" /> */}
                                                              <label className="form-check-label" for="flexCheckChecked">
                                                                {e.GrantedTrade.AccountType.description}
                                                                <br></br>
                                                                <b>{e.creditorName}</b>
                                                              </label>
                                                            </div>
                                                          </td>
                                                          <td>BALANCE
                                                            <br></br>
                                                            <b>${e.highBalance}</b>
                                                          </td>
                                                          <td>
                                                            ACCOUNT STATUS
                                                            <br></br>
                                                            <b>Positive</b></td>
                                                          <td type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                        </tr>
                                                      </Table>
                                                      <div className="collapse" id={`collapse${index}`}>
                                                        <div className="card card-body">
                                                          <Container>
                                                            <Row>
                                                              <Col lg={6}>
                                                                <Table striped bordered hover size="sm" className='table_content'>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Account</td>
                                                                      <td>{e.accountNumber}</td>
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
                                                                      <td>${e.highBalance}</td>
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
                                                                <Table striped bordered hover size="sm" className='table_content' >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Open Date</td>
                                                                      <td>{e.dateOpened}</td>
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
                                                                      <td>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Payment Status</td>
                                                                      <td>{e.PayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Past Due</td>
                                                                      <td>{e.GrantedTrade.amountPastDue}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Worst Rating</td>
                                                                      <td>{e.GrantedTrade.WorstPayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Remarks</td>
                                                                      <td style={{ color: "red" }}>
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
                                            <Col lg={12}>
                                              {experianInquiry ?
                                                experianInquiry.map((e) => {

                                                  return (
                                                    <Table size="sm" className='maintable '>
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



                            {/* ************************ Equifazx report ************************ */}
                            <div className="tab-pane fade" id="equifax" role="tabpanel" aria-labelledby="pills-contact-tab">
                              <Col lg={12}>
                                <div className="accordian_content mt-3">
                                  <Accordion>
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header className='accordinbtn'  >ACCOUNTS</Accordion.Header>
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
                                                      <Table size="sm" className='maintable'>
                                                        <tr>
                                                          <td className='credit_checkbox'>
                                                            <div className="form-check">
                                                              {/* <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" /> */}
                                                              <label className="form-check-label" for="flexCheckChecked">
                                                                {e.GrantedTrade.AccountType.description}
                                                                <br></br>
                                                                <b>{e.creditorName}</b>
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
                                                          <td type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                        </tr>
                                                      </Table>
                                                      <div className="collapse" id={`collapse${index}`}>
                                                        <div className="card card-body">
                                                          <Container>
                                                            <Row>
                                                              <Col lg={6}>
                                                                <Table striped bordered hover size="sm" className='table_content'>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Account</td>
                                                                      <td>{e.accountNumber}</td>
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
                                                                      <td>${e.highBalance}</td>
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
                                                                <Table striped bordered hover size="sm" className='table_content' >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Open Date</td>
                                                                      <td>{e.dateOpened}</td>
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
                                                                      <td>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Payment Status</td>
                                                                      <td>{e.PayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Past Due</td>
                                                                      <td>{e.GrantedTrade.amountPastDue}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Worst Rating</td>
                                                                      <td>{e.GrantedTrade.WorstPayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Remarks</td>
                                                                      <td style={{ color: "red" }}>
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
                                            <Col lg={12}>
                                              {equifaxInquiry ?
                                                equifaxInquiry.map((e) => {
                                                  console.log("e", e)
                                                  return (
                                                    <Table size="sm" className='maintable '>
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
                          <ul className="nav nav-pills horizatanlPill" id="pills-tab" role="tablist">
                            <li className="nav-item horizatalItem" role="presentation">
                              <button className="nav-link  horizatanlMenu active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#transunion1" type="button" role="tab" aria-controls="pills-home" aria-selected="true" value="transunion" onClick={changedisputebtn}>Transunion</button>
                            </li>
                            <li className="nav-item horizatalItem" role="presentation">
                              <button className="nav-link horizatanlMenu" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#experian1" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" value="experian" onClick={changedisputebtn}>Experian</button>
                            </li>
                            <li className="nav-item horizatalItem" role="presentation">
                              <button className="nav-link horizatanlMenu" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax1" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" value="equifax" onClick={changedisputebtn}>Equifax</button>
                            </li>
                            {/* <li className="nav-item horizatalItem_button" role="presentation">
                              <Link to="/transuniondispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE TRANSUNION DISPUTE</button></Link>
                            </li> */}
                            {transunionBtn ?
                              <li className="nav-item horizatalItem_button" role="presentation">
                                <Link to="/transuniondispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE TRANSUNION DISPUTE</button></Link>

                              </li>
                              :
                              <></>
                            }

                            {experianBtn ?
                              <li className="nav-item horizatalItem_button" role="presentation">
                                <Link to="/experiandispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE EXPERIAN DISPUTE</button></Link>
                              </li>
                              :
                              <></>
                            }

                            {equifaxBtn ?

                              <li className="nav-item horizatalItem_button" role="presentation">
                                <Link to="/equifaxdispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE EQUIFAX DISPUTE</button></Link>
                              </li>
                              :
                              <div></div>
                            }
                          </ul>

                        </Col>

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
                                              {negative_transUnion ?
                                                negative_transUnion.map((e, index) => {
                                                  var remark = e.Remark
                                                  var remark_value = Array.isArray(remark)

                                                  return (
                                                    <>
                                                      <Table size="sm" className='maintable'>
                                                        <tr>
                                                          <td className='credit_checkbox'>
                                                            <div className="form-check">
                                                              <label className="form-check-label" for="flexCheckChecked">
                                                                {e.GrantedTrade.AccountType.description}
                                                                <br></br>
                                                                <b>{e.creditorName}</b>
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
                                                          <td type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                        </tr>
                                                      </Table>
                                                      <div className="collapse" id={`collapse${index}`}>
                                                        <div className="card card-body">
                                                          <Container>
                                                            <Row>
                                                              <Col lg={6}>
                                                                <Table striped bordered hover size="sm" className='table_content'>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Account</td>
                                                                      <td>{e.accountNumber}</td>
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
                                                                      <td>${e.highBalance}</td>
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
                                                                <Table striped bordered hover size="sm" className='table_content' >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Open Date</td>
                                                                      <td>{e.dateOpened}</td>
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
                                                                      <td>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Payment Status</td>
                                                                      <td>{e.PayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Past Due</td>
                                                                      <td>{e.GrantedTrade.amountPastDue}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Worst Rating</td>
                                                                      <td>{e.GrantedTrade.WorstPayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Remarks</td>
                                                                      <td style={{ color: "red" }}>
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
                                            <Col lg={12}>
                                              {transUnionInquiry ?
                                                transUnionInquiry.map((e) => {

                                                  return (
                                                    <Table size="sm" className='maintable '>
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


                            {/* ************************ Experian report ************************ */}
                            <div className="tab-pane fade" id="experian1" role="tabpanel" aria-labelledby="pills-profile-tab">
                              <div className="accordian_content mt-3">
                                <Accordion>
                                  <Accordion.Item eventKey="0">
                                    <Accordion.Header className='accordinbtn'  >ACCOUNTS</Accordion.Header>
                                    <Accordion.Body>
                                      <Container>
                                        <Row>
                                          <Col lg={12}>
                                            {negative_experian ?
                                              negative_experian.map((e, index) => {
                                                var remark = e.Remark
                                                var remark_value = Array.isArray(remark)
                                                return (
                                                  <>
                                                    <Table size="sm" className='maintable'>
                                                      <tr>
                                                        <td className='credit_checkbox'>
                                                          <div className="form-check">
                                                            {/* <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" /> */}
                                                            <label className="form-check-label" for="flexCheckChecked">
                                                              {e.GrantedTrade.AccountType.description}
                                                              <br></br>
                                                              <b>{e.creditorName}</b>
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
                                                        <td type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                      </tr>
                                                    </Table>
                                                    <div className="collapse" id={`collapse${index}`}>
                                                      <div className="card card-body">
                                                        <Container>
                                                          <Row>
                                                            <Col lg={6}>
                                                              <Table striped bordered hover size="sm" className='table_content'>
                                                                <tbody>
                                                                  <tr>
                                                                    <td>Account</td>
                                                                    <td>{e.accountNumber}</td>
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
                                                                    <td>${e.highBalance}</td>
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
                                                              <Table striped bordered hover size="sm" className='table_content' >
                                                                <tbody>
                                                                  <tr>
                                                                    <td>Open Date</td>
                                                                    <td>{e.dateOpened}</td>
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
                                                                    <td>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>Payment Status</td>
                                                                    <td>{e.PayStatus.description}</td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>Past Due</td>
                                                                    <td>{e.GrantedTrade.amountPastDue}</td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>Worst Rating</td>
                                                                    <td>{e.GrantedTrade.WorstPayStatus.description}</td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>Remarks</td>
                                                                    <td style={{ color: "red" }}>
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
                                          <Col lg={12}>
                                            {experianInquiry ?
                                              experianInquiry.map((e) => {

                                                return (
                                                  <Table size="sm" className='maintable '>
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
                            </div>



                            {/* ************************ Equifazx report ************************ */}
                            <div className="tab-pane fade" id="equifax1" role="tabpanel" aria-labelledby="pills-contact-tab">
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
                                                    <Table size="sm" className='maintable'>
                                                      <tr>
                                                        <td className='credit_checkbox'>
                                                          <div className="form-check">
                                                            {/* <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" /> */}
                                                            <label className="form-check-label" for="flexCheckChecked">
                                                              {e.GrantedTrade.AccountType.description}
                                                              <br></br>
                                                              <b>{e.creditorName}</b>
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
                                                        <td type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                      </tr>
                                                    </Table>
                                                    <div className="collapse" id={`collapse${index}`}>
                                                      <div className="card card-body">
                                                        <Container>
                                                          <Row>
                                                            <Col lg={6}>
                                                              <Table striped bordered hover size="sm" className='table_content'>
                                                                <tbody>
                                                                  <tr>
                                                                    <td>Account</td>
                                                                    <td>{e.accountNumber}</td>
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
                                                                    <td>${e.highBalance}</td>
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
                                                              <Table striped bordered hover size="sm" className='table_content' >
                                                                <tbody>
                                                                  <tr>
                                                                    <td>Open Date</td>
                                                                    <td>{e.dateOpened}</td>
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
                                                                    <td>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>Payment Status</td>
                                                                    <td>{e.PayStatus.description}
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>Past Due</td>
                                                                    <td>{e.GrantedTrade.amountPastDue}</td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>Worst Rating</td>
                                                                    <td>{e.GrantedTrade.WorstPayStatus.description}</td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>Remarks</td>
                                                                    <td style={{ color: "red" }}>
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
                                          <Col lg={12}>
                                            {equifaxInquiry ?
                                              equifaxInquiry.map((e) => {
                                                console.log("e", e)
                                                return (
                                                  <Table size="sm" className='maintable '>
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
                            </div>
                          </div>
                        </Col>
                      </div>



                      {/* ---------------------------------All----------------------------------------------------- */}

                      <div className="tab-pane fade" id="all" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                        {/* *************  horizatanl navbar positive ******************* */}
                        <Col lg={12}>
                          <ul className="nav nav-pills horizatanlPill" id="pills-tab" role="tablist">
                            <li className="nav-item horizatalItem" role="presentation">
                              <button className="nav-link  horizatanlMenu active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#transunion4" type="button" role="tab" aria-controls="pills-home" aria-selected="true" value="transunion" onClick={changedisputebtn}>Transunion</button>
                            </li>
                            <li className="nav-item horizatalItem" role="presentation">
                              <button className="nav-link horizatanlMenu" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#experian4" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" value="experian" onClick={changedisputebtn}>Experian</button>
                            </li>
                            <li className="nav-item horizatalItem" role="presentation">
                              <button className="nav-link horizatanlMenu" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax4" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" value="equifax" onClick={changedisputebtn}>Equifax</button>
                            </li>
                            {transunionBtn ?
                              <li className="nav-item horizatalItem_button" role="presentation">
                                <Link to="/transuniondispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE TRANSUNION DISPUTE</button></Link>
                              </li>
                              :
                              <></>
                            }

                            {experianBtn ?
                              <li className="nav-item horizatalItem_button" role="presentation">
                                <Link to="/experiandispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE EXPERIAN DISPUTE</button></Link>
                              </li>
                              :
                              <></>
                            }

                            {equifaxBtn ?

                              <li className="nav-item horizatalItem_button" role="presentation">
                                <Link to="/equifaxdispute" className='horizatanlMenu_link'><button className="nav-link horizatanlMenu_button" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#equifax" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">CREATE EQUIFAX DISPUTE</button></Link>
                              </li>
                              :
                              <div></div>
                            }

                          </ul>
                        </Col>

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
                                              {transUnion ?
                                                transUnion.map((e, index) => {
                                                  var remark = e.Remark
                                                  var remark_value = Array.isArray(remark)
                                                  return (
                                                    <>
                                                      <Table size="sm" className='maintable'>
                                                        <tr>
                                                          <td className='credit_checkbox'>
                                                            <div className="form-check">

                                                              <label className="form-check-label" for="flexCheckChecked">

                                                                {e.GrantedTrade.AccountType.description}

                                                                <br></br>
                                                                <b>{e.creditorName}</b>
                                                              </label>
                                                            </div>
                                                          </td>
                                                          <td>BALANCE
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
                                                          <td type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                        </tr>
                                                      </Table>
                                                      <div className="collapse" id={`collapse${index}`}>
                                                        <div className="card card-body">
                                                          <Container>
                                                            <Row>
                                                              <Col lg={6}>
                                                                <Table striped bordered hover size="sm" className='table_content'>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Account</td>
                                                                      <td>{e.accountNumber}</td>
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
                                                                      <td>${e.highBalance}</td>
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
                                                              <Col lg={6}>
                                                                <Table striped bordered hover size="sm" className='table_content' >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Open Date</td>
                                                                      <td>{e.dateOpened}</td>
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
                                                                      <td>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Payment Status</td>
                                                                      <td>{e.PayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Past Due</td>
                                                                      <td>{e.GrantedTrade.amountPastDue}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Worst Rating</td>
                                                                      <td>{e.GrantedTrade.WorstPayStatus.description}</td>

                                                                    </tr>
                                                                    <tr>
                                                                      <td>Remarks</td>
                                                                      <td style={{ color: "red" }}>
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
                                            <Col lg={12}>
                                              {transUnionInquiry ?
                                                transUnionInquiry.map((e) => {

                                                  return (
                                                    <Table size="sm" className='maintable '>
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


                            {/* ************************ Experian report ************************ */}
                            <div className="tab-pane fade" id="experian4" role="tabpanel" aria-labelledby="pills-profile-tab">
                              <Col lg={12}>
                                <div className="accordian_content mt-3">
                                  <Accordion>
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header className='accordinbtn'>ACCOUNTS</Accordion.Header>
                                      <Accordion.Body>
                                        <Container>
                                          <Row>
                                            <Col lg={12}>
                                              {experian ?
                                                experian.map((e, index) => {

                                                  var remark = e.Remark
                                                  var remark_value = Array.isArray(remark)
                                                  return (
                                                    <>
                                                      <Table size="sm" className='maintable'>
                                                        <tr>
                                                          <td className='credit_checkbox'>
                                                            <div className="form-check">

                                                              <label className="form-check-label" for="flexCheckChecked">
                                                                {e.GrantedTrade.AccountType.description}
                                                                <br></br>
                                                                <b>{e.creditorName}</b>
                                                              </label>
                                                            </div>
                                                          </td>
                                                          <td>BALANCE
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
                                                          <td type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                        </tr>
                                                      </Table>
                                                      <div className="collapse" id={`collapse${index}`}>
                                                        <div className="card card-body">
                                                          <Container>
                                                            <Row>
                                                              <Col lg={6}>
                                                                <Table striped bordered hover size="sm" className='table_content'>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Account</td>
                                                                      <td>{e.accountNumber}</td>
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
                                                                      <td>${e.highBalance}</td>
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
                                                                <Table striped bordered hover size="sm" className='table_content' >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Open Date</td>
                                                                      <td>{e.dateOpened}</td>
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
                                                                      <td>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Payment Status</td>
                                                                      <td>{e.PayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Past Due</td>
                                                                      <td>{e.GrantedTrade.amountPastDue}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Worst Rating</td>
                                                                      <td>{e.GrantedTrade.WorstPayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Remarks</td>
                                                                      <td style={{ color: "red" }}>
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
                                            <Col lg={12}>
                                              {experianInquiry ?
                                                experianInquiry.map((e) => {

                                                  return (
                                                    <Table size="sm" className='maintable '>
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



                            {/* ************************ Equifazx report ************************ */}
                            <div className="tab-pane fade" id="equifax4" role="tabpanel" aria-labelledby="pills-contact-tab">
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

                                                  var remark = e.Remark
                                                  var remark_value = Array.isArray(remark)
                                                  return (
                                                    <>
                                                      <Table size="sm" className='maintable'>
                                                        <tr>
                                                          <td className='credit_checkbox'>
                                                            <div className="form-check">

                                                              <label className="form-check-label" for="flexCheckChecked">
                                                                {e.GrantedTrade.AccountType.description}
                                                                <br></br>
                                                                <b>{e.creditorName}</b>
                                                              </label>
                                                            </div>
                                                          </td>
                                                          <td>BALANCE
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
                                                          <td type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample"><FaPlusSquare style={{ fontSize: "22px", color: "green" }} /></td>
                                                        </tr>
                                                      </Table>
                                                      <div className="collapse" id={`collapse${index}`}>
                                                        <div className="card card-body">
                                                          <Container>
                                                            <Row>
                                                              <Col lg={6}>
                                                                <Table striped bordered hover size="sm" className='table_content'>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Account</td>
                                                                      <td>{e.accountNumber}</td>
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
                                                                      <td>${e.highBalance}</td>
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
                                                                <Table striped bordered hover size="sm" className='table_content' >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>Open Date</td>
                                                                      <td>{e.dateOpened}</td>
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
                                                                      <td>30:{e.GrantedTrade.late30Count} | 60:{e.GrantedTrade.late60Count} | 90:{e.GrantedTrade.late90Count}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Payment Status</td>
                                                                      <td>{e.PayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Past Due</td>
                                                                      <td>{e.GrantedTrade.amountPastDue}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Worst Rating</td>
                                                                      <td>{e.GrantedTrade.WorstPayStatus.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>Remarks</td>
                                                                      <td style={{ color: "red" }}>
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
                                            <Col lg={12}>
                                              {equifaxInquiry ?
                                                equifaxInquiry.map((e) => {
                                                  console.log("e", e)
                                                  return (
                                                    <Table size="sm" className='maintable '>
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
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}









