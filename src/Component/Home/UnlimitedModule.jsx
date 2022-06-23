import React from 'react';
import { Container, Row ,Col,Image} from 'react-bootstrap';
import dispute from '../../asset/image/img5.jpg'

export default function UnlimitedModule() {
  return (
      <>
      <section className='mt-5 ulimitedmodule'>
      <Container  >
         <Row>
             <Col lg={6} md={6}>
               <div className='smartmodule_img '>
               <Image src={dispute} className='disputeimage img-fluid'></Image>
               </div> 
             </Col>
             <Col lg={6}  md={6}>
                 <div className='item_content'>
                    <h4 className='item_title'> Lorem ipsum dolor</h4>
                    <p className='item_text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui id distinctio omnis magni ea praesentium nostrum, facilis facere recusandae quidem natus itaque ducimus deserunt architecto. Reprehenderit quae molestias ducimus velit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui id distinctio omnis magni ea praesentium nostrum, facilis facere recusandae quidem natus itaque ducimus deserunt architecto. Reprehenderit quae molestias ducimus velit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui id distinctio omnis magni ea praesentium nostrum, facilis facere recusandae quidem natus itaque ducimus deserunt architecto. Reprehenderit quae molestias ducimus velit.
                    </p>
                 </div>
             </Col>
         </Row>
     </Container>
      </section>
     
      
      </>
  )
}
