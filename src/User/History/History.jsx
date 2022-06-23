import React from 'react';
import { Container, Row, Col, Image, Button, Table, Tabs, Tab } from 'react-bootstrap';
import UserHeader from '../Common/UserHeader';
import Graph from '../UserHome/Graph';
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
    

    

    var tranScore = []
    var tranDate = []
    var expScore = []
    var expDate = []
    var equiScore = []
    var equiDate = []



    useEffect(() => {
        axios.get(`https://www.mycreditsensei.com:5000/getCreditScore?trackingToken=${trackingToken}`)
            .then((res) => {
                console.log(res.data)

                
                
                // console.log("data1",data1)

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
            <Graph />
            <Container>
                <Row>
                    <Col lg={{ span: 10, offset: 1 }} md={12}>
                        <div className='histroy_title mt-5'>
                            <h1 >History</h1>
                        </div>
                    </Col>
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Transunion">
                            <h6>tr</h6>
                            <div className='history_graph'>
                                <Line data={data} />
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="Experian">
                            <h6>ex</h6>
                            <div className='history_graph'>
                                <Line data={data1} />
                            </div>
                        </Tab>
                        <Tab eventKey="contact" title="Equifax">
                            <h6>Eq</h6>
                            <div className='history_graph'>
                                <Line data={data2} />
                            </div>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>





            <section className='mb-5'>
                <Container>
                    <Row>
                        <Col lg={{ span: 10, offset: 1 }} md={12}>
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
                                     {tranDate.map((e,index)=> {
                                        return(
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
