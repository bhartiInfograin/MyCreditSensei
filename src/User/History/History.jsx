import React from 'react';
import { Container, Row, Col, Image, Button, Table, Tabs, Tab } from 'react-bootstrap';
import UserHeader from '../Common/UserHeader';
import GaugeChart from 'react-gauge-chart'

import Footer from '../../Common/Footer'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


export default function History() {

    const trackingToken = (sessionStorage.getItem("TRACKINGTOKEN"));
    const [tramsunionScore, setTransunionScore] = useState()
    const [experianScore, setExperianScore] = useState()
    const [equifaxScore, setEquifaxScore] = useState()
    const equ = JSON.parse(sessionStorage.getItem("EQUIFAX"));
    const trans = JSON.parse(sessionStorage.getItem("TRANSUNION"));
    const expri = JSON.parse(sessionStorage.getItem("EXPERIAN"));
    var todayDate = new Date()
    var fulldate = todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear()



    var tranScore = []
    var tranDate = []
    var expScore = []
    var expDate = []
    var equiScore = []
    var equiDate = []



    useEffect(() => {
        axios.get(`https://www.mycreditsensei.com:5000/getCreditScore?trackingToken=${trackingToken}`)
            .then((res) => {
              
                if (res.data.statusCode === 200) {
                    setTransunionScore(res.data.statusMsj.transunion)
                    setExperianScore(res.data.statusMsj.experian)
                    setEquifaxScore(res.data.statusMsj.equifax)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (tramsunionScore) {
        tramsunionScore.map((e) => {
            var scoredate = e.date
            tranDate.push(scoredate.split("T")[0])
            tranScore.push(e.creditscore)
        })
    }

    if (experianScore) {
        experianScore.map((e) => {
            var scoredate = e.date
            expDate.push(scoredate.split("T")[0])
            expScore.push(e.creditscore)
        })
    }

    if (equifaxScore) {
        equifaxScore.map((e) => {
            var scoredate = e.date
            equiDate.push(scoredate.split("T")[0])
            equiScore.push(e.creditscore)
        })
    }

    var labels = tranDate;
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Transunion',
                data: tranScore,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    var labels = expDate;
    const data1 = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Experian',
                data: expScore,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    var labels = equiDate;
    const data2 = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Equifax',
                data: equiScore,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };





    return (
        <>
            <UserHeader />

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

                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>




            <Container>
                <Row className='d-flex justify-content-center user_history'>
                    <Col lg={11} md={12}>
                        <div className='histroy_title mt-5 mb-3'>
                            <h1 >History</h1>
                        </div>
                    </Col>
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Transunion" className='pri'>
                          
                            <div className='history_graph'>
                                <Line data={data} />
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="Experian" className=''>
                    
                            <div className='history_graph'>
                                <Line data={data1} />
                            </div>
                        </Tab>
                        <Tab eventKey="contact" title="Equifax" className=''>
                         
                            <div className='history_graph'>
                                <Line data={data2} />
                            </div>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>





            <section className='mb-5'>
                <Container>
                    <Row className='d-flex justify-content-center user_history'>
                        <Col lg={11} md={12}>
                            <div className='history_sec3_title mt-5'>
                                <h1> Reports</h1>
                            </div>
                            <div className="history_sec3_item">

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Transunion</th>
                                            <th scope="col">Experian</th>
                                            <th scope="col">Equifax</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tranDate.map((e, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e}</td>
                                                        <td>{tranScore[index]}</td>
                                                        <td>{expScore[index]}</td>
                                                        <td>{equiScore[index]}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>

                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

              




            <Footer />
        </>
    )
}
