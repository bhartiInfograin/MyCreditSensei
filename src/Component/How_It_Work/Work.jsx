import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
// import img1 from '../../asset/image/img1 1.png'


export default function Work(props) {
    return (
        <>
            <div className='work_main  '>
                <Row >
                    <Col lg={6} md={6} >

                        <div className="workimg1 mt-5 ">
                            <Image src={props.image} style={{ height: "auto", width: "100%" }} />
                        </div>

                    </Col>
                    <Col lg={6} md={6}  >

                        <div className='work'>
                            <div className='work_count'>{props.count}</div>
                            <h3 className='work_heading '>{props.title}</h3>
                            <p className='work_content '>{props.content}</p>
                        </div>


                    </Col>
                </Row>

            </div>


        </>
    )
}


// xs={{ order: 'first' }}