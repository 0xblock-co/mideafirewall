import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
export default function PricingFaqs() {
    return (
        <section className="mdf__pricing-faqs">
            <Container>
                <h5 className="text-center">Plan FAQ</h5>
                <hr />
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <div className="mt-5">
                            <h5>What is an Operation?</h5>
                            <p>An Operation is an atomic action performed by our engine. An atomic action would for instance be running Nudity Detection on 1 image. In this case we would count 1 operation. Batches of models count for as many operations as the number of models requested. Each API call that consumes operations will return a specific field to let you know how many operations were used.</p>
                            <p>For Video Moderation, the number of operations will depend on the frame rate you apply. The default is a frame rate of 1 per second.</p>
                            <p>For Text Moderation, one single operation is counted up to 1,000 characters. More details</p>
                        </div>
                        <div className="mt-5">
                            <h5>Can I change or terminate a plan whenever I want?</h5>
                            <p>Yes! You can upgrade, downgrade or terminate your plan anytime. The change will be effective at the end of your current 30-day billing period.</p>
                        </div>
                        <div className="mt-5">
                            <h5>Do you offer a free trial?</h5>
                            <p>Yes there is a Free plan that you can use to test our API.</p>
                        </div>
                        <div className="mt-5">
                            <h5>Can I stay on the Free plan forever?</h5>
                            <p>Yes you can. There is no time limit.</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mt-5">
                            <h5>What happens if I exceed my paid plan?</h5>
                            <p>No worries if you exceed your quota. We know this can happen and your service shouldn't be affected. If you exceed your quota we will simply apply the per operation rate and charge you for this additional usage a few days later.</p>
                        </div>
                        <div className="mt-5">
                            <h5>Is it possible to perform Bulk Analysis?</h5>
                            <p>If you have a set of images that you need to moderate as part of a one-off job, we can come up with a custom solution for you. This is a great way to get started and this is how many customers actually started working with us.</p>
                        </div>
                        <div className="mt-5">
                            <h5>If my request results in an error, will that be counted towards my monthly limit?</h5>
                            <p>No, we only count requests that result in a successful response. You won't get a higher bill because of errors or invalid photos.</p>
                        </div>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center align-items-center">
                    <h5 className="m-0">
                        More Questions?
                    </h5>
                    <div><Button variant="primary" className="text-uppercase py-3 mx-3 mt-3">GET IN TOUCH</Button></div>

                </div>
            </Container>
        </section>
    );
}