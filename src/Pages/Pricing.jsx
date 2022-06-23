import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Bureaus from '../asset/image/bureaus 2.png';
import Table from '../Component/Pricing/Table';
import Subscription from '../Component/Pricing/Subscription'
import Header from '../Common/Header';
import Footer from "../Common/Footer";



export default function Pricing() {


  return (
    <>
      <Header />

      <Container>
        <section className='my-5'>
          <Row >
            <Col lg={6} md={6} >
              <div className='pricing_img'>
                <Image className='letterImg img-fluid' src={Bureaus}  />
              </div>
            </Col>
            <Col lg={6} md={6}>
           
                <div className='pricing_content'>
                  <h3>Repair all 3 Credit bureaus. Increase your Credit Score.Easily do it yourself</h3>
                  <p>Only pay for a 3 credit bureau subscription and
                    postage for your dispute letters.</p>
                </div>
            
            </Col>
          </Row>
        </section>
      </Container>
      <Subscription />
        <Table />

      <Footer />


     
    </>
  )
}
