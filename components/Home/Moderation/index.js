import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IoCheckmarkSharp,IoClose } from "react-icons/io5";
export default function Moderation() {
   return (
      <section className="mdf__moderation__back">
         <Container fluid="md">
            <Row className="justify-content-center">
               <Col lg={10} xxl={5}>
               <h1 className="fw-bold text-shadow text-center">Say goodbye to expensive traditional manual moderation</h1>
               </Col>
            </Row>
            <Row className="justify-content-center">
               <Col sm={6} className="mt-3 mt-lg-5">
               <Card className="p-3 p-lg-5 h-100">
                  <Card.Title className="text-center mb-3 mb-lg-5 text-primary">
                  Traditional Manual moderation
                  </Card.Title>
                  <Card.Img variant="top" src="/images/moderation-1.png" className="mdf__img__rounded" />
                  <ul className="list-unstyled mt-3 mt-lg-5 mb-0">
                     <li className="mb-3"><IoClose size={24} color="#FF3407" /> <strong>Time-consuming:</strong> It requires significant time and effort. </li>
                     <li className="mb-3"><IoClose size={24} color="#FF3407" /> <strong>Inconsistent:</strong> Moderation decisions can vary between moderators. </li>
                     <li className="mb-3"><IoClose size={24} color="#FF3407" /> <strong>Limited Scale:</strong> Manual moderation becomes difficult at scale. </li>
                     <li className="mb-3"><IoClose size={24} color="#FF3407" /> <strong>Costly:</strong> It requires dedicated moderators, adding costs. </li>
                     <li className="mb-3"><IoClose size={24} color="#FF3407" /> <strong>Human Error:</strong>Moderators are susceptible to making mistakes. </li>
                  </ul>
               </Card>
               </Col>
               <Col sm={6} className="mt-3 mt-lg-5">
               <Card className="py-3 py-lg-5 h-100">
                  <Card.Title className="text-center mb-3 mb-lg-5 text-primary">
                  Midea Firewall Content Moderation
                  </Card.Title>
                  <Card.Img variant="top" src="/images/moderation-2.png" className="mdf__img__rounded" />
                  <ul className="list-unstyled mt-3 mt-lg-5 mb-0 px-3 px-lg-5">
                     <li className="mb-3"><IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Time-consuming:</strong> It requires significant time and effort. </li>
                     <li className="mb-3"><IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Inconsistent:</strong> Moderation decisions can vary between moderators. </li>
                     <li className="mb-3"><IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Limited Scale:</strong> Manual moderation becomes difficult at scale. </li>
                     <li className="mb-3"><IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Costly:</strong> It requires dedicated moderators, adding costs. </li>
                     <li className="mb-3"><IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Human Error:</strong>Moderators are susceptible to making mistakes. </li>
                  </ul>
               </Card>
               </Col>
            </Row>
         </Container>
      </section>
   );
}