import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Work from '../Component/How_It_Work/Work';
import Curve from '../asset/image/curve-1 1.png';
import img2_1 from '../asset/image/img2 1.png';
import Curve2 from '../asset/image/curve-2 1.png';
import img1 from '../asset/image/img1 1.png';
import img3 from '../asset/image/img3 1.png';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

import girl from "../asset/image/img7.jpg"



export default function How_It_Works() {


  return (
    <>
      <Header />

      <section className='workimage1'>
        <Container  >

          <Work image={img1} 
          count={1} 
          title={"Link your credit report"} 
          content={"My Credit Sensei automatically imports and analyzes your 3 bureau credit report, finds negative accounts, and prepares an aggressive dispute strategy.My Credit Sensei never puts an inquiry on your credit report"} 
          />


          <Row>
            <Col lg={12} md={12}>
              <div className='curveimg'>
                <Image src={Curve} style={{ height: "auto", width: "100%" }} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 6, order: 'first' }} md={{ span: 6, order: 'first' }} xs={{ order: 'last' }} >

              <div className='work'>
                <div className='work_count'>2</div>
                <h3 className='work_heading'>Disputes that work</h3>
                <p className='work_content'>My Credit Sensei's brilliant AI knows that different negative accounts require different dispute strategies. For example, disputing a collection account is different than disputing a bankruptcy.
                  My Credit Sensei helps you create the right dispute to achieve a permanent deletion</p>
              </div>

            </Col>
            <Col lg={{ span: 6, order: 'last' }} md={{ span: 6, order: 'last' }} xs={{ order: 'first' }} >

              <Image src={img2_1} style={{ height: "auto", width: "100%" }} />

            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12}>
              <div className='curveimg'>
                <Image src={Curve2} style={{ height: "auto", width: "100%" }} />
              </div>
            </Col>
          </Row>
          <Work image={img3} 
          count={3} 
          title={"Track your results"} 
          content={"My Credit Sensei tracks all of your disputes on all 3 credit bureaus. Every month you'll receive a progress report showing what accounts were deleted and your new credit scores.You'll always know what's going on with your credit repair and credit score."} 
          />
        </Container>
      </section>

      <Footer />
    </>
  )
}





