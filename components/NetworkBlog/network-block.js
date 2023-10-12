import CommonUtility from "@/utils/common.utils";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import style from "./network-blog.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useAppSelector } from "@/store/hooks";
import { getAllHeaderDataOptions } from "@/store/defaultConfig.slice";

export default function NeetworkBlock({ allFeatures }) {
  const headerData = useAppSelector(getAllHeaderDataOptions);
  const [activeTab, setActiveTab] = useState("2");
  const handleTabChange = (key) => setActiveTab(key);

  const router = useRouter();
  const { isLogin } = useAuth();
  const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCheckboxChange = (featureId) => {
    if (selectedFeatureIds.includes(featureId)) {
      setSelectedFeatureIds(
        selectedFeatureIds.filter((id) => id !== featureId)
      );
    } else {
      setSelectedFeatureIds([...selectedFeatureIds, featureId]);
    }
  };

  const handleOptionChange = (featureId, selectedOption) => {
    console.log("featureId, selectedOption .", featureId, selectedOption);
    setSelectedOptions({ ...selectedOptions, [featureId]: selectedOption });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!isLogin) {
        newInfoAlert(
          "Login Required for Demo Access",
          "To access the demo, you need to either log in or sign up for an account. Please proceed with login or sign-up to get a demo.",
          "Continue",
          "warning"
        ).then(() => {
          router.push("/account-security/login");
        });
        return;
      }
      const formData = {
        selectedFeatureIds,
        selectedOptions,
      };
      if (formData) {
        if (CommonUtility.isValidArray(formData.selectedFeatureIds)) {
          let finalString = "";
          formData.selectedFeatureIds.map((item) => {
            if (formData.selectedOptions[item]) {
              finalString =
                finalString +
                `,${item}(${CommonUtility.removeWhiteSpace(
                  formData.selectedOptions[item]
                )})`;
            } else {
              finalString = finalString + `,${item}`;
            }
          });

          if (finalString && finalString !== "") {
            router.push(
              `upload?filters=${CommonUtility.removeStartingComma(
                finalString.trim()
              )}`
            );
          }
        } else {
          newInfoAlert(
            "",
            "Please select any features along with associated sub feature.",
            "OK"
          );
        }
      }
    },
    [selectedFeatureIds, selectedOptions]
  );

  return (
    <section className={`p-3 p-xl-5 ${style.mdf__network__block_tabs}`}>
      <Form onSubmit={onSubmit}>
        <Container>
          <Row className="justify-content-center">
            <Col xl={11}>
              <Tab.Container
                id="left-tabs-example"
                activeKey={activeTab}
                onSelect={handleTabChange}
              >
                <Nav
                  variant="pills"
                  className="flex-row flex-wrap justify-content-lg-around"
                >
                  {CommonUtility.isValidArray(headerData) &&
                    headerData.map(
                      (headerOption) =>
                        headerOption.active && (
                          <Nav.Item
                            key={headerOption.id}
                            className="me-3 me-lg-0 mt-3 mt-lg-0"
                          >
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
                      <Row>
                        {CommonUtility.isValidArray(allFeatures) &&
                          allFeatures.map((item) => (
                            <Col md={6} xl={4} className="mt-4" key={item.name}>
                              <Form.Control
                                type="checkbox"
                                className="btn-check"
                                value={item.webFeatureKey}
                                id={`btn-check-outlined ${item.featureId}`}
                                hidden
                                onChange={() => {
                                  if (!item.active) {
                                    newInfoAlert(
                                      "Personalized Feature Activation",
                                      "If you'd like to activate this feature for your account, please get in touch with us via email, and we'll take care of it for you.",
                                      "Okay"
                                    );
                                  }
                                  handleCheckboxChange(item.webFeatureKey);
                                }}
                              />
                              <label
                                className={`btn btn-outline-info ${
                                  style.card__primary
                                } ${
                                  !item.active
                                    ? style.mdf__feature__card_inactive
                                    : ""
                                }`}
                                htmlFor={`btn-check-outlined ${item.featureId}`}
                              >
                                <div>
                                  <img
                                    className={`${style.mdf__card_img}`}
                                    src={item.imgUrl}
                                    alt="A globe icon with filter and text."
                                  />
                                </div>
                                <h5 className="text-dark mt-3 mb-3">
                                  {item.name}
                                </h5>
                                <p className="mt-3">{item.description}</p>
                                <div className="d-flex flex-wrap mt-3 gap-3">
                                  {CommonUtility.isValidArray(item.options) &&
                                    item.options.map((opt, i) => {
                                      console.log(
                                        "adasd",
                                        selectedOptions[item.webFeatureKey] ==
                                          opt.name
                                      );
                                      return (
                                        <div
                                          key={
                                            item.featureId +
                                            opt.name.replace(/\s/g, "")
                                          }
                                        >
                                          <input
                                            type="radio"
                                            className="btn-check"
                                            name={item.featureId}
                                            onChange={() =>
                                              handleOptionChange(
                                                item.webFeatureKey,
                                                opt.name
                                              )
                                            }
                                            id={
                                              item.featureId +
                                              opt.name.replace(/\s/g, "")
                                            }
                                            autoComplete="off"
                                          />
                                          <label
                                            className="btn btn-outline-dark px-2 text-xs"
                                            htmlFor={
                                              item.featureId +
                                              opt.name.replace(/\s/g, "")
                                            }
                                          >
                                            {opt.name}
                                          </label>
                                        </div>
                                      );
                                    })}
                                </div>
                              </label>
                            </Col>
                          ))}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </Col>
            <Col md={12} className="text-center">
              <Button
                type="submit"
                variant="primary"
                className="shadow-lg px-5 py-2 mt-5 rounded-4"
              >
                Proceed
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </section>
  );
}
