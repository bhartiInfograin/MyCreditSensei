import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import card from '../../asset/image/img3.jpg'
import {Zoom } from "react-awesome-reveal";

export default function SmartModule() {
  return (
    <>
      <section className='smartmodule'>
        <Container>
          <Row>
            <Col lg={6}  md={6} sm={6}>
              <div className='smart_item_content '>
                <h2 className='smart_item_title'>Professional Letters</h2>
                <p className='smart_item_text'>Letters are far more effective at getting accounts permanently deleted than online disputes. MyCredit Sensei's letter generator helps you create effective disputes based on consumer protection laws.
                </p>
                <h2 className='smart_item_title mt-2'>Track Your Results</h2>
                <p className='smart_item_text'>Every month MyCredit Sensei imports your new 3 bureau credit report and shows which accounts were deleted and your new credit scores. If an account wasn’t deleted, MyCredit Sensei will suggest a new strategy for additional disputes.
                </p>
              </div>
            </Col>
            <Col lg={6}  md={6} sm={6}>
              <div className='smartmodule_img'>
                  <Image src={card} className=' disputeimage img-fluid'></Image>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
