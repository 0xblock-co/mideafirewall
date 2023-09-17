import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import Router from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Slider from "react-slick";

import MusicPanel from "@/components/DemoPage/music-panel";
import { checkAuthRoute } from "@/utils/globalFunctions";

export default function DemoPage() {
  const [activeSlide, setActiveSlide] = useState(1);
  const sliderRef = useRef(null);

  useEffect(() => {
    const { isActive, route } = checkAuthRoute();
    if (!isActive) {
      Router.push(route);
      return;
    }
  }, []);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    setVisible: false,
    initialSlide: 0,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (_current, next) => setActiveSlide(next + 1),
  };

  return (
    <Fragment>
      <section className="py-5">
        <Container className="d-block">
          <Slider {...settings} ref={sliderRef}>
            <Row className="d-flex m-0">
              <Col lg={6}>
                <MusicPanel />
              </Col>
              <Col lg={6}>
                <Tabs defaultActiveKey="web" id="uncontrolled-tab-example">
                  <Tab eventKey="Clips" className="mt-3" title="Clips">
                    <div className="text-center">
                      <iframe
                        width="100%"
                        height="400px"
                        src="https://www.youtube.com/embed/y6E1L6KVwYw"
                        title="17 Most Beautiful Countries in Europe - Travel Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </Tab>
                  <Tab eventKey="Images" className="mt-3" title="Images">
                    outworn
                  </Tab>
                  <Tab eventKey="Reports" className="mt-3" title="Reports">
                    When I have seen by Time's fell hand defac'd The rich-proud
                    cost of outworn buried age; When sometime lofty towers I see
                    down-raz'd, And brass eternal slave to mortal rage; When I
                    have seen the hungry ocean gain Advantage on the kingdom of
                    the shore, And the firm soil win of the watery main,
                    Increasing store with loss, and loss with store; When I have
                    seen such interchange of state, Or state itself confounded,
                    to decay;
                  </Tab>
                </Tabs>
              </Col>
            </Row>
            <Row className="d-flex m-0">
              <Col lg={6}>
                <MusicPanel />
              </Col>
              <Col lg={6}>
                <Tabs defaultActiveKey="web" id="uncontrolled-tab-example">
                  <Tab eventKey="Clips" className="mt-3" title="Clips">
                    <div className="text-center">
                      <iframe
                        width="100%"
                        height="400px"
                        src="https://www.youtube.com/embed/y6E1L6KVwYw"
                        title="17 Most Beautiful Countries in Europe - Travel Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </Tab>
                  <Tab eventKey="Images" className="mt-3" title="Images">
                    outworn
                  </Tab>
                  <Tab eventKey="Reports" className="mt-3" title="Reports">
                    When I have seen by Time's fell hand defac'd The rich-proud
                    cost of outworn buried age; When sometime lofty towers I see
                    down-raz'd, And brass eternal slave to mortal rage; When I
                    have seen the hungry ocean gain Advantage on the kingdom of
                    the shore, And the firm soil win of the watery main,
                    Increasing store with loss, and loss with store; When I have
                    seen such interchange of state, Or state itself confounded,
                    to decay;
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Slider>
          <div className="demo__slider_button d-flex justify-content-center">
            <div className="d-flex mt-5">
              <Image
                width={20}
                height={20}
                src="/images/prev2x.svg"
                alt=""
                className="mx-4"
              />
              <Image
                width={20}
                height={20}
                src="/images/prev.svg"
                alt=""
                className="mx-4"
                onClick={() => sliderRef.current.slickPrev()}
              />
              <h4>{activeSlide}</h4>
              <Image
                width={20}
                height={20}
                src="/images/next.svg"
                alt=""
                className="mx-4"
                onClick={() => sliderRef.current.slickNext()}
              />
              <Image
                width={20}
                height={20}
                src="/images/next2x.svg"
                alt=""
                className="mx-4"
              />
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
  );
}
