import React, { useEffect } from 'react'
import AuthHeader from '../AuthCommon/AuthHeader';
import Footer from '../../Common/Footer';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom'
import { FiPrinter } from 'react-icons/fi';
import { FaAngleDoubleRight } from 'react-icons/fa';




export default function Membership() {

    var form_data = JSON.parse(sessionStorage.getItem("form_data"));
    var address = JSON.parse(sessionStorage.getItem("address"));
    var planType = JSON.parse(sessionStorage.getItem("complete"));
    // let Navigate = useNavigate()


   
// if(sessionStorage.length === 0){
//     Navigate("/createAccount")

// }



    var userName = form_data.firstName + " " + form_data.middleName + " " + form_data.lastName;
    const common = address["homeAddress.city"] + " " + address["homeAddress.state"] + " " + address["homeAddress.zip"]



    // if (form_data && address && planType) {

    //     sessionStorage.clear();
    // }







    const printPage = () => {
        window.print()
    }



    return (
        <>
            <AuthHeader />
            <section className='my-5'>
                <Container>
                    <Row>
                        <Col lg={7} md={7} sm={12}>
                            <div className='welcome_txt'>
                                <div className='d-flex headDiv'>
                                    <div>
                                        <h4>Welcome to your Membership !</h4>
                                        <p className='text1'>Login now to view your credit report!</p>
                                    </div>
                                    <div>
                                        <p onClick={printPage} className="print-link"><FiPrinter />&nbsp;<span>Print</span></p>
                                    </div>
                                </div>
                                <div className='accountDiv'>
                                    <div className='accountContent'>
                                        <h5>Your Account :</h5>

                                        <p className='bold'>{userName}</p>
                                        <p>{address["homeAddress.street"]}</p>
                                        <p>{common}</p>


                                        <div className='username mt-4'>
                                            <p className='bold'>User Name</p>
                                            <p>{form_data.email}</p>
                                            <p className='bold'>Membership Type</p>
                                            <p>{planType}</p>
                                        </div>

                                    </div>

                                    <div className="getStarted">
                                        <h5 className='get_text'>Get Started</h5>
                                        <Link to="/password_r_ques"><Button className="btn-dark login">Login In &nbsp;<FaAngleDoubleRight /></Button></Link>
                                    </div>
                                </div>
                                <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit earum porro, minima nemo numquam voluptatum architecto doloribus perspiciatis nam repellendus provident placeat mollitia enim quo est vero. Quo, veniam mollitia?</p>
                            </div>
                        </Col>
                        <Col lg={5} md={5} sm={12}>
                            <div className="membership-table">
                                <div className="heading">
                                    <p>BASIC MEMBERSHIP</p>
                                </div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <td>Smart Credit Report & Scores</td>
                                            <td>2 monthly updates</td>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ScoreTraker</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>ScoreBuilder</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>ScoreMaster</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>Actions</td>
                                            <td>5 per month</td>

                                        </tr>
                                        <tr>
                                            <td>Credit Monitering</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>Money Manager</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>3B Report & Scores</td>
                                            <td>a La Carte</td>

                                        </tr>
                                        <tr>
                                            <td>Subscription Start Date</td>
                                            <td>03/03/2022</td>

                                        </tr>
                                        <tr>
                                            <td>Trial Period</td>
                                            <td>--</td>

                                        </tr>
                                        <tr>
                                            <td>Monthly fee starting on 03/03/2022</td>
                                            <td className='payment-price'>$25.00</td>

                                        </tr>
                                    </tbody>
                                </Table>
                                <div className="heading">
                                    <p>PREMIUM MEMBERSHIP</p>
                                </div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <td>Smart Credit Report & Scores</td>
                                            <td>Unlimited</td>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ScoreTraker</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>ScoreBuilder</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>ScoreMaster</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>Actions</td>
                                            <td>5 per month</td>

                                        </tr>
                                        <tr>
                                            <td>Credit Monitering</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>Money Manager</td>
                                            <td>Unlimited</td>

                                        </tr>
                                        <tr>
                                            <td>3B Report & Scores</td>
                                            <td>1 per month</td>

                                        </tr>
                                        <tr>
                                            <td>Subscription Start Date</td>
                                            <td>03/03/2022</td>

                                        </tr>
                                        <tr>
                                            <td>Trial Period</td>
                                            <td>--</td>

                                        </tr>
                                        <tr>
                                            <td>Monthly fee starting on 03/03/2022</td>
                                            <td className='payment-price'>$35.00</td>

                                        </tr>
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
