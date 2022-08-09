import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import GaugeChart from 'react-gauge-chart'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {
  EXPERIAN_SENT_LETTER,
  EQUIFAX_SENT_LETTER,
  TRANSUNION_SENT_LETTER,
  CREATE_DATE,
  SENT_DATE
} from "../../Url"


export default function Graph() {
  var todayDate = new Date().toLocaleDateString()
  var fulldate = todayDate


  const equ = JSON.parse(sessionStorage.getItem("EQUIFAX"));
  const trans = JSON.parse(sessionStorage.getItem("TRANSUNION"));
  const expri = JSON.parse(sessionStorage.getItem("EXPERIAN"));
  const trackingToken = (sessionStorage.getItem("TRACKINGTOKEN"));

  const [tranStep, setTranStep] = useState(0);
  const [equiStep, setEquiStep] = useState(0);
  const [expriStep, setExpriStep] = useState(0);
  const [transunionCreateDate, setTransunionCreateDate] = useState();
  const [transunionSentDate, setTransunionSentDate] = useState();
  const [experianCreateDate, setExperianCreateDate] = useState();
  const [experianSentDate, setExperianSentDate] = useState();
  const [euqifaxCreateDate, setEquifaxCreateDate] = useState();
  const [euqifaxSentDate, setEquifaxSentDate] = useState();
  const [waitForResult, setWaitForResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waitForResultExp, setWaitForResultExp] = useState(false);
  const [loadingExp, setLoadingExp] = useState(false);
  const [waitForResultEqui, setWaitForResultEqui] = useState(false);
  const [loadingEqui, setLoadingEqui] = useState(false);
  const [idb64, setIdb64] = useState();
  const [addressb64, setAddressb64] = useState();


  //************** */ get all doc api********** 
  // useEffect(() => {
  //   axios.get(`https://www.mycreditsensei.com:5000/all_doc?trackingToken=${trackingToken}`)
  //     .then((response) => {
  //       console.log("response",response)
  //       if (response.data.statusCode === 200) {
  //         var addressurl = response.data.statusMsg.proof_of_address;
  //         var idurl = response.data.statusMsg.proof_of_id;
  //         if (addressurl) {
  //           var addressurl = response.data.statusMsg.proof_of_address;
  //           var xhr = new XMLHttpRequest();
  //           xhr.onload = function () {
  //             var codes = new Uint8Array(xhr.response);
  //             var binary = '';
  //             var len = codes.byteLength;
  //             for (var i = 0; i < len; i++) {
  //               binary += String.fromCharCode(codes[i]);
  //             }
  //             if (binary) {
  //               var b64 = btoa(binary);
  //               setAddressb64(b64)
  //             }
  //           };
  //           xhr.open('GET', addressurl);
  //           xhr.responseType = 'arraybuffer';
  //           xhr.send();
  //         }
  //         if (idurl) {
  //           var idurl = response.data.statusMsg.proof_of_id;
  //           var xhr1 = new XMLHttpRequest();
  //           xhr1.onload = function () {
  //             var codes = new Uint8Array(xhr1.response);
  //             var binary = '';
  //             var len = codes.byteLength;
  //             for (var i = 0; i < len; i++) {
  //               binary += String.fromCharCode(codes[i]);
  //             }
  //             if (binary) {
  //               var b64 = btoa(binary);
  //               setIdb64(b64)
  //             }
  //           };
  //           xhr1.open('GET', idurl);
  //           xhr1.responseType = 'arraybuffer';
  //           xhr1.send();
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])


  useEffect(async () => {

    try {
      const article = {
        "trackingToken": trackingToken,
        "bureau": "Transuion"
      }
      const data = await axios.post(CREATE_DATE, article)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setTransunionCreateDate(res.data.statusMsg)
            setTranStep(1)
          }
          //********** */ createDate********************
          if (res.data.statusCode == 200) {
            const data = axios.post(SENT_DATE, article)
              .then((res) => {
                if (res.data.statusCode === 200) {
                  setTransunionSentDate(res.data.statusMsg)
                  setWaitForResult(true)
                  setTranStep(3)
                }
              })
              .catch((error) => {
                console.log("error", error)
              })
          }
        })
        .catch((error) => {
          console.log("error", error)
        })

    } catch (err) {
      console.log("err", err)
    }

    //************** */ ExperiandisputeDate**********
    try {
      const expArticle = {
        "trackingToken": trackingToken,
        "bureau": "Experian"
      }
      const data = await axios.post(CREATE_DATE, expArticle)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setExperianCreateDate(res.data.statusMsg)
            setExpriStep(1)
          }

          //********** */ createDate********************
          if (res.data.statusCode == 200) {
            const data = axios.post(SENT_DATE, expArticle)
              .then((res) => {
                if (res.data.statusCode == 200) {
                  setExperianSentDate(res.data.statusMsg)
                  setWaitForResultExp(true)
                  setExpriStep(3)
                }
              })
              .catch((error) => {
                console.log("error", error)
              })
          }
        })
        .catch((error) => {
          console.log("error", error)
        })

    } catch (err) {
      console.log("err", err)
    }

    //************** */ EuqifaxdisputeDate**********
    try {
      const equiArticle = {
        "trackingToken": trackingToken,
        "bureau": "Equifax"
      }
      const data = await axios.post(CREATE_DATE, equiArticle)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setEquifaxCreateDate(res.data.statusMsg)
            setEquiStep(1)
          }

          //********** */ createDate********************
          if (res.data.statusCode == 200) {
            const data = axios.post(SENT_DATE, equiArticle)
              .then((res) => {
                if (res.data.statusCode === 200) {
                  setEquifaxSentDate(res.data.statusMsg)
                  setWaitForResultEqui(true)
                  setEquiStep(3)
                }
              })
              .catch((error) => {
                console.log("error", error)
              })
          } else {
            // console.log("nothing")
          }
        })
        .catch((error) => {
          console.log("error", error)
        })

    } catch (err) {
      console.log("err", err)
    }
  }, [])


  //************** */ transuniondisputeDate********** 

  if (tranStep === 0) {
    var transteps = [
      {
        label: 'Create Dispute Letter',
      }
    ]
  }

  if (tranStep === 1) {
    var transteps = [
      {
        label: `Letter Created:${transunionCreateDate}`,

      },

    ]
  }

  if (tranStep === 3) {
    var transteps = [
      {
        label: `Letter Created:${transunionCreateDate}`,

      },
      {
        label: `Send letter by ${transunionSentDate}`,

      }


    ];


  }

  const sendTransLetter = () => {
    setLoading(true)
    $.ajax({
      type: "POST",
      url: TRANSUNION_SENT_LETTER,
      data: { "trackingToken": trackingToken, "transunion_sent_date": fulldate},
      success: function (response) {
        if (response.statusMsg === "Please Create dispute letter first") {
          setLoading(false)
           toast.error('Create dispute letter', {
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

        if (response.statusCode === 400) {
          setLoading(false)
           toast.error('Please upload your id proof or address proof', {
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

        if (response.statusCode === 200) {
            toast.success('Dispute letter send successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
          window.location.reload()
          setLoading(false)
        }
      },
      error: function (error) {
        console.log("errordfdf", error);
      }
    });
  }



  //************** */ equifaxdisputeDate**********

  if (equiStep === 0) {
    var equiSteps = [
      {
        label: 'Create Dispute Letter',
      }
    ]
  }

  if (equiStep === 1) {
    var equiSteps = [
      {
        label: `Letter Created:${euqifaxCreateDate}`,

      },

    ]
  }

  if (equiStep === 3) {
    var equiSteps = [
      {
        label: `Letter Created:${euqifaxCreateDate}`,

      },
      {
        label: `Send letter by ${euqifaxSentDate}`,

      }
    ];


  }

  const sendEquiLetter = () => {
    setLoadingEqui(true)
    $.ajax({
      type: "POST",
      url: EQUIFAX_SENT_LETTER,
      data: { "trackingToken": trackingToken, "equifax_sent_date": fulldate},
      success: function (response) {
        console.log("response sent letter", response)
        if (response.statusMsg === "Please Create dispute letter first") {
          setLoadingEqui(false)
          toast.error('Create dispute letter', {  
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

        if (response.statusCode === 400) {
          setLoadingEqui(false)
           toast.error('Please upload your id proof or address proof', {
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

        if (response.statusCode === 200) {
            toast.success('Dispute letter send successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
          window.location.reload()
          setLoading(false)
        }


      },
      error: function (error) {
        console.log("errordfdf", error);
      }
    });



  }



  //************** */ experiandisputeDate**********

  if (expriStep === 0) {
    var expriSteps = [
      {
        label: 'Create Dispute Letter',
      }
    ]
  }

  if (expriStep === 1) {
    var expriSteps = [
      {
        label: `Letter Created:${experianCreateDate}`,

      },

    ]
  }

  if (expriStep === 3) {
    var expriSteps = [
      {
        label: `Letter Created:${experianCreateDate}`,

      },
      {
        label: `Send letter by ${experianSentDate}`,

      }
    ];
  }

  const sendExpriLetter = () => {
    setLoadingExp(true)
    $.ajax({
      type: "POST",
      url: EXPERIAN_SENT_LETTER,
      data: { "trackingToken": trackingToken, "experian_sent_date": fulldate},
      success: function (response) {
       
        if (response.statusMsg === "Create dispute letter") {
          setLoadingExp(false)
          toast.error('Please Create dispute letter first', {
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

        if (response.statusCode === 400) {
          setLoadingExp(false)
          toast.error('Please upload your id proof or address proof', {
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

        if (response.statusCode === 200) {
           toast.success('Dispute letter send successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
          window.location.reload()
          setLoading(false)
        }


      },
      error: function (error) {
        console.log("errordfdf", error);
      }
    });
  }




  return (
    <>
      <section className='graph_section'>
        <Container>
          <Row>
            <Col lg={4} md={6} className="d-flex justify-content-center mb-4">

              <div className='graph_trans'>
                <h6 className=''>TRANSUNION</h6>
                <p className='value'>{trans}</p>
                <GaugeChart id="gauge-chart5"
                  nrOfLevels={800}
                  arcsLength={[0.5, 0.5, 0.5]}
                  colors={['#133A1B', '#92B396', '#F1DB77 ']}
                  percent={trans / 900}
                  arcPadding={0.02}
                  className="gauge_chart"
                  style={{ width: "280px" }}
                />
                <div className='score'>
                  <h6 className='outoffscore'>300</h6>
                  <h6 className='totalscore'>900</h6>
                </div>
                <div className='graphAsOfDate'>as of {fulldate}</div>
                <div>
                  <div className='m-4'>
                    <Box sx={{ maxWidth: 400 }}>
                      <Stepper activeStep={tranStep} orientation="vertical" className='_step'>
                        {transteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepLabel className='demo'>
                              {step.label}
                            </StepLabel>
                          </Step>

                        ))}
                      </Stepper>
                    </Box>
                  </div>
                  <Link to='/TransunionDispute' className='crate_dispute_letter_link'><div className='create_dispute_letter_button'>CREATE DISPUTE LETTER</div></Link>
                  {loading ?
                    <button className='homeDisputeBtn'>Loading........</button>
                    :
                    <>
                      <button className='homeDisputeBtn' onClick={sendTransLetter}>SENT DISPUTE LETTER</button>
                    </>

                    // tranStep === 0 && waitForResult === false ?
                    //   <Link to='/TransunionDispute' className='crate_dispute_letter_link'><div className='create_dispute_letter_button'>CREATE DISPUTE LETTER</div></Link>
                    //   : tranStep !== 0 && waitForResult === false ?
                    //     <button className='homeDisputeBtn' onClick={sendTransLetter}>MARK LETTER AS SENT</button>
                    //     :
                    //     <div disabled></div>
                  }

                </div>
              </div>
            </Col>


            <Col lg={4} md={6} className="d-flex justify-content-center mb-4">
              <div className='graph_equi '>
                <h6 className=''>EQUIFAX</h6>
                <p className='value'>{equ}</p>
                <GaugeChart id="gauge-chart5"
                  nrOfLevels={500}
                  arcsLength={[0.5, 0.5, 0.5]}
                  colors={['#163E24', '#2E653E', '#92B396']}
                  percent={equ / 900}

                  arcPadding={0.02}
                  style={{ width: "280px" }}
                  className="gauge_chart"
                />
                <div className='score'>
                  <h6 className='outoffscore'>300</h6>
                  <h6 className='totalscore'>900</h6>
                </div>
                <div className='graphAsOfDate'>as of {fulldate}</div>
                <div>
                  <div className='m-4'>
                    <Box sx={{ maxWidth: 400 }}>
                      <Stepper activeStep={equiStep} orientation="vertical" className='_step'>
                        {equiSteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepLabel className='demo'>
                              {step.label}
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </div>
                  <Link to='/equifaxdispute' className='crate_dispute_letter_link'><div className='create_dispute_letter_button'>CREATE DISPUTE LETTER</div></Link>
                  {loadingEqui ?
                    <button className='homeDisputeBtn'>Loading........</button>
                    : <>
                      <button className='homeDisputeBtn' onClick={sendEquiLetter}>SENT DISPUTE LETTER</button>
                    </>
                    // equiStep === 0 && waitForResultEqui === false ?
                    //   <Link to='/equifaxdispute' className='crate_dispute_letter_link'><div className='create_dispute_letter_button'>CREATE DISPUTE LETTER</div></Link>
                    //   : equiStep !== 0 && waitForResultEqui === false ?
                    //     <button className='homeDisputeBtn' onClick={sendEquiLetter}>MARK LETTER AS SENT</button>
                    //     :
                    //     <div disabled></div>
                  }


                </div>
              </div>
            </Col>


            <Col lg={4} md={12} className="d-flex justify-content-center mb-4">
              <div className='graph_exper'>
                <h6 className=''>EXPERIAN</h6>
                <p className='value'>{expri}</p>
                <GaugeChart id="gauge-chart5"
                  nrOfLevels={300}
                  arcsLength={[0.5, 0.5, 0.5]}
                  colors={['#133A1B', '#92B396', '#F1DB77 ']}
                  percent={expri / 900}
                  arcPadding={0.02}
                  className="gauge_chart"
                  style={{ width: "280px" }}
                />
                <div className='score'>
                  <h6 className='outoffscore'>300</h6>
                  <h6 className='totalscore'>900</h6>
                </div>
                <div className='graphAsOfDate'>as of {fulldate}</div>
                <div>
                  <div className='m-4'>
                    <Box sx={{ maxWidth: 400 }}>
                      <Stepper activeStep={expriStep} orientation="vertical" className='_step'>
                        {expriSteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepLabel className='demo'>
                              {step.label}
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>

                    </Box>
                  </div>
                  <Link to='/experiandispute' className='crate_dispute_letter_link'><div className='create_dispute_letter_button'>CREATE DISPUTE LETTER</div></Link>
                  {loadingExp ?
                    <button className='homeDisputeBtn'>Loading........</button>
                    :
                    <>
                      <button className='homeDisputeBtn' onClick={sendExpriLetter}>SENT DISPUTE LETTER</button>
                    </>

                    // expriStep === 0 && waitForResultExp === false ?
                    // <Link to='/experiandispute' className='crate_dispute_letter_link'><div className='create_dispute_letter_button'>CREATE DISPUTE LETTER</div></Link>
                    //   : expriStep !== 0 && waitForResultExp === false ?
                    //     <button className='homeDisputeBtn' onClick={sendExpriLetter}>MARK LETTER AS SENT</button>
                    //     :
                    //     <div disabled></div>
                  }
                </div>
              </div>

            </Col>
          </Row>
        </Container>
      </section>


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

