/* eslint-disable @next/next/no-html-link-for-pages */
import { Button, Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";

import { newInfoAlert } from "@/utils/toastMessage.utils";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FormattedMessage } from "react-intl";
import style from "./feature.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

export default function FeatureBlog({ headerData }) {
  console.log("headerData: ", headerData);
  const [activeTab, setActiveTab] = useState("0");
  const handleTabChange = (key) => setActiveTab(key);
  const router = useRouter();

  const handleFeatureCardOnClick = (feature, id) => {
    if (!feature.active) {
      newInfoAlert(
        "Personalized Feature Activation",
        "If you'd like to activate this feature for your account, please get in touch with us via email, and we'll take care of it for you.",
        "Okay"
      );
    } else {
      let selectedFeature = {
        selectedFeatureIds: [feature.webFeatureKey],
        selectedOptions: {},
      };
      if (feature.options && feature.options.length > 0) {
        selectedFeature = {
          ...selectedFeature,
          selectedOptions: {
            [feature.webFeatureKey]: feature.options[0].name,
          },
        };
      }
      localStorage.setItem(
        "selectedDataForDemo",
        JSON.stringify(selectedFeature)
      );
      router.push(`/network-blog?key=${id}`);
    }
  };

  const Link = ({ id, children, title }) => (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id={id}>{title}</Tooltip>}
    >
      <a href="#">{children}</a>
    </OverlayTrigger>
  );

  return (
    <section className={style.mdf__personalized_feature}>
      <Container>
        <Row className="justify-content-center">
          <Col xxl={7}>
            <h1 className="fw-bold text-shadow text-center">
              <FormattedMessage id="page.home.featureBlog.mainTitle" />
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            xl={12}
            // xxl={9}
            className="mt-4"
          >
            <Tab.Container
              id="left-tabs-example"
              activeKey={activeTab}
              onSelect={handleTabChange}
            >
              <Nav
                variant="pills"
                className="flex-row flex-wrap justify-content-lg-around gap-1"
              >
                {headerData?.map(
                  (headerOption) =>
                    headerOption.active && (
                      <Nav.Item key={headerOption.id}>
                        <Nav.Link
                          className="mdf__btn_large"
                          eventKey={headerOption.id}
                        >
                          {headerOption.name}
                        </Nav.Link>
                      </Nav.Item>
                    )
                )}
              </Nav>
              <Tab.Content>
                {headerData?.map((headerOption) => (
                  <Tab.Pane key={headerOption.id} eventKey={headerOption.id}>
                    <Row className="justify-left-lg-left row">
                      {headerOption.features.map((feature, index) => (
                        <div
                          key={index}
                          className={`${style.mdf__feature__card_block} col-md-6 `}
                          // onClick={() =>
                          //   handleFeatureCardOnClick(feature, headerOption.id)
                          // }
                        >
                          <Card
                            className={`${style.mdf__feature__card} ${
                              !feature.active
                                ? style.mdf__feature__card_inactive
                                : ""
                            } `}
                          >
                            <Row>
                              <Col xs={4} xl={3}>
                                {/* <Image
                                  variant="top"
                                  src={feature.imgUrl}
                                  alt={feature.name}
                                /> */}
                                <img src={feature.imgUrl} alt={feature.name} />
                              </Col>
                              <Col xs={8} xl={9}>
                                <div className="p-0">
                                  <span className="d-flex justify-content-between align-items-center mb-2">
                                    <h6
                                      className={`text-primary m-0 ${style.later__spacing}`}
                                    >
                                      {feature.name}
                                    </h6>
                                    <Button
                                      className="bn53"
                                      size="sm"
                                      onClick={() =>
                                        handleFeatureCardOnClick(
                                          feature,
                                          headerOption.id
                                        )
                                      }
                                    >
                                      Demo
                                    </Button>
                                  </span>
                                  <p className={`${style.text_wrap}`}>
                                    {feature.description}
                                    {/* <Link title={feature.description} id={feature.index}>
                                     </Link>{' '} */}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        </div>
                      ))}
                    </Row>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
