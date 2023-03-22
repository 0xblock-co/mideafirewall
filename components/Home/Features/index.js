import React, { useState } from "react"; 
import { Button, Card, Col, Container, Row } from "react-bootstrap";
export default function FeatureBlog() {
   return (
      <section className="mdf__personalized_feature">
         <Container fluid className="px-5"> 
         <Row className="justify-content-center">
               <Col lg={5}>
               <h1 className="fw-bold text-shadow text-center">Personalized features to match your requirements</h1>
               </Col>
         </Row>
            <Row className="justify-content-center">
               <Col lg={8} className="d-flex justify-content-around">
               <Button variant="outline-primary" className="mdf__btn-large mt-4">Micro Blogging</Button>
               <Button variant="outline-primary" className="mdf__btn-large mt-4">Real State Broker</Button>
               <Button variant="outline-primary" className="mdf__btn-large mt-4">Social Review Sites</Button>
               <Button variant="outline-primary" className="mdf__btn-large mt-4">Media Sharing </Button>
               <Button variant="outline-primary" className="mdf__btn-large mt-4">Social Network</Button>
               </Col>
            </Row>
            <Row className="justify-content-center">
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature01.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">Nudity Detection</h6>
                        <p>Determine the nudity level, from explicit to mildly suggestive</p>
                     </Card.Body>
                  </Card>
               </div>
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature02.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">Violence Detection</h6>
                        <p>Detect violent and inappropriate content</p>
                     </Card.Body>
                  </Card>
               </div>
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature03.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">Image light Quality</h6>
                        <p>Detects light quality of image</p>
                     </Card.Body>
                  </Card>
               </div>
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature04.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">Violent Text</h6>
                        <p>Detects violent text from the image</p>
                     </Card.Body>
                  </Card>
               </div>
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature05.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">GDPR</h6>
                        <p>Detects Government documents from the image</p>
                     </Card.Body>
                  </Card>
               </div>
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature01.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">Nudity Detection</h6>
                        <p>Determine the nudity level, from explicit to mildly suggestive</p>
                     </Card.Body>
                  </Card>
               </div>
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature02.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">Violence Detection</h6>
                        <p>Detect violent and inappropriate content</p>
                     </Card.Body>
                  </Card>
               </div>
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature03.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">Image light Quality</h6>
                        <p>Detects light quality of image</p>
                     </Card.Body>
                  </Card>
               </div>
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature04.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">Violent Text</h6>
                        <p>Detects violent text from the image</p>
                     </Card.Body>
                  </Card>
               </div>
               <div className="mdf__feature__card_block px-4">
                  <Card className="mdf__feature__card">
                  <Card.Img variant="top" src="/images/feature05.png" className="mdf__img-rounded" />
                     <Card.Body className="text-center p-1">
                        <h6 className="text-primary text-decoration-underline later__spacing">GDPR</h6>
                        <p>Detects Government documents from the image</p>
                     </Card.Body>
                  </Card>
               </div>
            </Row>
         </Container>
      </section>
   );
}