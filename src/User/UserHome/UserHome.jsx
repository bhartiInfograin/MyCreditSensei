import React, { useState, useEffect } from 'react';
import { useNavigate, Redirect } from 'react-router-dom';
import UserHeader from '../Common/UserHeader';
import { Container, Row, Col, Table, Modal } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Graph from './Graph';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { CREDIT_SCORE, GET_DOC, SUBSCRIPTION_LIST, CHECKOUT, DELETE_SUBSCRIPTION } from '../../Url';
import UserFooter from '../Common/UserFooter';
import { ToastContainer, toast } from 'react-toastify';
import { resolveObjectURL } from 'buffer';

export default function UserHome() {
  const summary = JSON.parse(sessionStorage.getItem("SUMMARY"));
  const equ = JSON.parse(sessionStorage.getItem("EQUIFAX"));
  const trans = JSON.parse(sessionStorage.getItem("TRANSUNION"));
  const expri = JSON.parse(sessionStorage.getItem("EXPERIAN"));
  const trackingToken = (sessionStorage.getItem("TRACKINGTOKEN"));
  const [uploadDateAdd, setUploadDateAdd] = useState()
  const [uploadDateId, setUploadDateId] = useState()
  let Navigate = useNavigate()
  //  =====plan purchase popup start=======
  const [show, setShow] = useState();


  //  =====plan purchase popup end=======
  //==================== user details===========================
  const bundledata = JSON.parse(sessionStorage.getItem("BUNDLEDATA"));
  const firstName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.first;
  const lastName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.last;
  const houseNumber = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.houseNumber;
  const streetName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.streetName;
  const streetType = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.streetType;
  const city = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.city;
  const state = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.stateCode;
  const zip = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.postalCode;
  //==================== user details end===========================
  var seconds =  Math.floor(Date.now() / 1000); 


  useEffect(async () => {
    const article = { "trackingToken": trackingToken }
    const { data } = await axios.post(SUBSCRIPTION_LIST, article)

    if (data) {
      if (data.statusMsg.data.length > 0) {
        var endDate = data.statusMsg.data[0].current_period_end;
        if (endDate < seconds) {
          const payload = { "subscriptionId": data.statusMsg.data[0].id }
          const { res } = await axios.post(DELETE_SUBSCRIPTION, payload)
        }
        setShow(false)

      } else {
        setShow(true)
      }
    }
  },[])





  // useEffect(() => {
  //   axios.get(`https://www.mycreditsensei.com:5000/getDueDate?trackingToken=${trackingToken}`)
  //     .then((response) => {
  //       if (response.data.statusMsg === "Invalid tracking token") {
  //         Navigate('/login')
  //       }
  //       if (response.data.statusCode === 200) {
  //         const _dueDate = response.data.statusMsg.endDate
  //         var duedate = new Date(_dueDate * 1000);
  //         var currendate = new Date();
  //         if (duedate >= currendate) {
  //           setShow(false)
  //         } else {
  //           setShow(true)
  //         }
  //       } else {
  //         setShow(true)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  //====================== check subcription end======================
  //******************* */ get add on address date  *********************************
  useEffect(() => {
    const article = {
      trackingToken: trackingToken,
      doc_type: "addressproof"
    }
    axios.post(GET_DOC, article)
      .then((data) => {
        if (data.data.statusCode === 200) {
          setUploadDateAdd(true)
        }
      })
      .catch((error) => {
        console.log("error", error)
      })
  }, [uploadDateAdd])

  //******************* */ get add on id date  *********************************
  useEffect(() => {
    const article = {
      trackingToken: trackingToken,
      doc_type: "idproof"
    }
    axios.post(GET_DOC, article)
      .then((data) => {
        if (data.data.statusCode === 200) {
          setUploadDateId(true)
        }
      })
      .catch((error) => {
        console.log("error", error)
      })
  }, [uploadDateId])






  //====================save score in database =======================
  useEffect(async () => {
    const article = {
      "trackingToken": trackingToken,
      "transunion_credit_score": trans,
      "experian_credit_score": expri,
      "equifax_credit_score": equ
    }
    const { data } = await axios.post(CREDIT_SCORE, article)
  })
  //====================save score in database =============================
  //=================== to get subscription (payment getway)================
  // const handleSubscription = async () => {
  //   const data = await axios.post("https://www.mycreditsensei.com:5000/subcription")

  //     .then((res) => {
  //       if (res.data.data.id) {
  //         var options = {
  //           key: "rzp_test_FRwpmu0LJEnAkl",
  //           "subscription_id": res.data.data.id,
  //           "description": "Monthly My credit sensei  Plan",
  //           "handler": async (response) => {
  //             setShow(false)
  //             const article = {
  //               "razorpay_subscription_id": response.razorpay_subscription_id,
  //               "razorpay_payment_id": response.razorpay_payment_id,
  //               "razorpay_signature": response.razorpay_signature,
  //               "trackingToken": trackingToken,
  //               "endDate": res.data.data.end_at,
  //               "startDate": res.data.data.created_at
  //             }
  //             try {
  //               const verifyUrl = "https://www.mycreditsensei.com:5000/verify";
  //               const { data } = await axios.post(verifyUrl, article);
  //               if (data.statusCode === 200) {
  //                 toast.success("Payment successfully Done ", {
  //                   position: "top-center",
  //                   autoClose: 5000, 
  //                   hideProgressBar: true,
  //                   closeOnClick: true,
  //                   pauseOnHover: true,
  //                   draggable: true,
  //                   progress: undefined,
  //                   theme: "colored"
  //               });
  //               }

  //             } catch (error) {
  //               console.log("error", error)
  //             }
  //           },
  //           "theme": {
  //             "color": "#145214"
  //           }
  //         };
  //         var paymentObject = new window.Razorpay(options);
  //         paymentObject.on('payment.failed', function (response) {

  //           toast.error("Payment failed ", {
  //             position: "top-center",
  //             autoClose: 5000,
  //             hideProgressBar: true,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "colored"
  //         });
  //           setShow(false)
  //         });
  //         paymentObject.open()
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error", error)
  //     })
  // }


  const handleSubscription = async () => {
    const article = {
      "trackingToken": trackingToken
    }
    const { data } = await axios.post(CHECKOUT, article)
    console.log("checkout", data)
    if (data.url) {
      window.location.href = data.url
    }
  }
  //=================== to get subscription (payment getway) end================




  return (
    <>

      <UserHeader />
      <Graph />
      <Container className='mb-5'>
        <Row>
          <Col lg={{ span: 10, offset: 1 }} md={12}>
            <div className='creditItems_sectionContent_heading mt-5 '>
              <p className='section__title' >Credit Items</p>
              <Link to="/creditItem"><FaArrowRight style={{ color: "#14684e" }} /></Link>
            </div>
            <div className='creditItems_sectionContent '>
              <ul className="nav nav-pills mb-3c justify-content-end  horizatanlPill" id="pills-tab" role="tablist">
                <li className="nav-item horizatalItem" role="presentation">
                  <button className="nav-link accountmenu active horizatanlMenu" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Accounts</button>
                </li>
                <li className="nav-item horizatalItem" role="presentation">
                  <button className="nav-link accountmenu horizatanlMenu" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Public Records</button>
                </li>
                <li className="nav-item horizatalItem" role="presentation">
                  <button className="nav-link accountmenu horizatanlMenu" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Inquiries</button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }} md={12}>
            <div className="tab-content creditItemtable mt-2" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"> <div className=' crditItemtable'>
                <Table className="table table-striped table-hover " responsive>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">TRANSUNION</th>
                      <th scope="col">EXPERIAN</th>
                      <th scope="col">EQUIFAX</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" >Total Accounts</th>
                      <td>{summary.TradelineSummary.TransUnion.TotalAccounts}</td>
                      <td>{summary.TradelineSummary.Experian.TotalAccounts}</td>
                      <td>{summary.TradelineSummary.Equifax.TotalAccounts}</td>
                    </tr>
                    <tr>
                      <th scope="row" >Open Accounts</th>
                      <td>{summary.TradelineSummary.TransUnion.OpenAccounts}</td>
                      <td>{summary.TradelineSummary.Experian.OpenAccounts}</td>
                      <td>{summary.TradelineSummary.Equifax.OpenAccounts}</td>
                    </tr>
                    <tr>
                      <th scope="row">Closed Accounts</th>
                      <td>{summary.TradelineSummary.TransUnion.CloseAccounts}</td>
                      <td>{summary.TradelineSummary.Experian.CloseAccounts}</td>
                      <td>{summary.TradelineSummary.Equifax.CloseAccounts}</td>
                    </tr>
                    <tr>
                      <th scope="row" >Delinquent Accounts</th>
                      <td>{summary.TradelineSummary.TransUnion.DelinquentAccounts}</td>
                      <td>{summary.TradelineSummary.Experian.DelinquentAccounts}</td>
                      <td>{summary.TradelineSummary.Equifax.DelinquentAccounts}</td>
                    </tr>
                    <tr>
                      <th scope="row" >Derogatory Accounts</th>
                      <td>{summary.TradelineSummary.TransUnion.DerogatoryAccounts}</td>
                      <td>{summary.TradelineSummary.Experian.DerogatoryAccounts}</td>
                      <td>{summary.TradelineSummary.Equifax.DerogatoryAccounts}</td>
                    </tr>
                    <tr>
                      <th scope="row">Balance </th>
                      <td>{summary.TradelineSummary.TransUnion.TotalBalances}</td>
                      <td>{summary.TradelineSummary.Experian.TotalBalances}</td>
                      <td>{summary.TradelineSummary.Equifax.TotalBalances}</td>
                    </tr>
                  </tbody>
                </Table>
              </div></div>

              <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <Table className="table table-striped table-hover " responsive>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">TRANSUNION</th>
                      <th scope="col">EXPERIAN</th>
                      <th scope="col">EQUIFAX</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" className='text-success'>Number Of Records</th>
                      <td>{summary.PublicRecordSummary.TransUnion.NumberOfRecords}</td>
                      <td>{summary.PublicRecordSummary.Experian.NumberOfRecords}</td>
                      <td>{summary.PublicRecordSummary.Equifax.NumberOfRecords}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <Table className="table table-striped table-hover " responsive>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">TRANSUNION</th>
                      <th scope="col">EXPERIAN</th>
                      <th scope="col">EQUIFAX</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" className='text-success'>Number In Last 2 Years</th>
                      <td>{summary.InquirySummary.TransUnion.NumberInLast2Years}</td>
                      <td>{summary.InquirySummary.Experian.NumberInLast2Years}</td>
                      <td>{summary.InquirySummary.Equifax.NumberInLast2Years}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <section className='mb-5'>
        <Container>
          <Row className='d-flex justify-content-center user_history'>
            <Col lg={10} sm={12}>
              <div className='user_home_title mt-5'>
                <p style={{ fontSize: "20px" }}>My Accounts</p>
              </div>
            </Col>
          </Row>
          <Row className='d-flex justify-content-center user_history mt-3'>
            <Col lg={5} style={{ background: "#1987540f", padding: "30px 25px" }}>

              <div className="personal_info">
                <div className="user_name">{firstName + " " + lastName}</div>
                <div className="user_address">{houseNumber + "  " + streetName + "  " + streetType}<br></br>{city + "," + state + " " + zip}</div>
              </div>

            </Col>
            <Col lg={5} style={{ background: "#1987540f", padding: "30px 25px" }}>

              <div className="proof_info">
                {uploadDateId ?
                  <div className="proof_photo">Photo ID <FaCheckCircle className='checkicon_gray' style={{ color: "green" }} /> <span><Link to="#">Added</Link></span></div>
                  :
                  <div className="proof_photo">Photo ID <FaCheckCircle className='checkicon_gray' /> <span><Link to="/myaccount">Add It</Link></span></div>
                }


                {uploadDateAdd ?
                  <div className="proof_address mt-3">Proof of address <FaCheckCircle className='checkicon_gray' style={{ color: "green" }} /> <span><Link to="#">Added</Link></span></div>
                  :
                  <div className="proof_address mt-3">Proof of address <FaCheckCircle className='checkicon_gray' /> <span><Link to="/myaccount">Add It</Link></span></div>
                }

              </div>

            </Col>
          </Row>
        </Container>
      </section> */}

      {/* <Footer /> */}
      <UserFooter />
      {/* =====plan purchase popup start======= */}
      <Modal show={show} backdrop="static" keyboard={false} className="purchase_plan" centered>
        <Modal.Body>
          <Container>
            <Row>
              <Col lg={12} md={12}>
                <div className='basiccard d-flex justify-content-center'>
                  <div className='pricing_plan' style={{ border: "none" }} >
                    <h5>SmartCredit  PLAN</h5>
                    <hr></hr>
                    <div className='subprice'>
                      <p className='price' style={{ fontSize: "2rem", paddingBottom: "5px" }}> $39 /mo</p>
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
                    <div className="purchase_btn">
                      <button onClick={handleSubscription}>PURCHASE</button>
                    </div>
                  </div>

                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

      </Modal>
      {/* =====plan purchase popup end======= */}


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


