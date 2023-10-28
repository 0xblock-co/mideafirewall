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
export default function NeetworkBlock() {
  const router = useRouter();
  const { user, isLogin } = useAuth();

  const headerData = useAppSelector(getAllHeaderDataOptions);
  const [activeTab, setActiveTab] = useState("2");
  const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  useEffect(() => {
    setSelectedFeatureIds([]);
    setSelectedRadioOption([]);
    setSelectedOptions({});
  }, [activeTab]);
  useEffect(() => {
    const { query } = router;
    const { key } = query;

    if ("key" in query && headerData.some((item) => item.id === key)) {
      setActiveTab(key.toString());
    }
  }, [router.query, headerData]);

  // const handleCheckboxChange = (featureId) => {
  //   console.log("featureId: ", featureId);
  //   setSelectedFeatureIds((prevSelectedFeatureIds) => {
  //     if (prevSelectedFeatureIds.includes(featureId)) {
  //       return prevSelectedFeatureIds.filter((id) => id !== featureId);
  //     } else {
  //       return [...prevSelectedFeatureIds, featureId];
  //     }
  //   });
  // };
  const handleCheckboxChange = (featureId) => {
    setSelectedFeatureIds((prevSelectedFeatureIds) => {
      if (prevSelectedFeatureIds[activeTab]) {
        // If the selectedFeatureIds for this tab already exist, update it
        if (prevSelectedFeatureIds[activeTab].includes(featureId)) {
          return {
            ...prevSelectedFeatureIds,
            [activeTab]: prevSelectedFeatureIds[activeTab].filter(
              (id) => id !== featureId
            ),
          };
        } else {
          return {
            ...prevSelectedFeatureIds,
            [activeTab]: [...prevSelectedFeatureIds[activeTab], featureId],
          };
        }
      } else {
        // If the selectedFeatureIds for this tab don't exist, create a new array
        return {
          ...prevSelectedFeatureIds,
          [activeTab]: [featureId],
        };
      }
    });
  };
  const [selectedRadioOption, setSelectedRadioOption] = useState([]);
  useEffect(() => {}, [selectedRadioOption]);
  const handleOptionChange = (featureId, selectedOption) => {
    const cloneSelectedRadioOption =
      selectedRadioOption && selectedRadioOption.length > 0
        ? [...selectedRadioOption]
        : [];

    if (CommonUtility.isValidArray(cloneSelectedRadioOption)) {
      const availableDataIndex = cloneSelectedRadioOption.findIndex(
        (item) => item.featureId === featureId && item.activeTab === activeTab
      );
      if (availableDataIndex !== -1) {
        cloneSelectedRadioOption[availableDataIndex] = {
          ...cloneSelectedRadioOption[availableDataIndex],
          featureId,
          selectedOption,
          activeTab,
        };
      } else {
        cloneSelectedRadioOption.push({
          featureId,
          selectedOption,
          activeTab,
        });
      }
    } else {
      cloneSelectedRadioOption.push({
        featureId,
        selectedOption,
        activeTab,
      });
    }
    setSelectedRadioOption(cloneSelectedRadioOption);
  };

  // const handleOptionChange = (featureId, selectedOption) => {
  //   setSelectedOptions((prevSelectedOptions) => ({
  //     ...prevSelectedOptions,
  //     [featureId]: selectedOption,
  //   }));
  // };

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

      if (!user.surveyAnswered) {
        newInfoAlert(
          "Survey answers are required",
          "Please fill the survey questionnaires to continue with the content moderation process.",
          "Continue",
          "warning"
        ).then(() => {
          router.push("/survey");
        });
        return;
      }

      const formData = {
        selectedFeatureIds,
        selectedOptions,
      };

      if (formData && CommonUtility.isValidArray(formData.selectedFeatureIds)) {
        let finalString = formData.selectedFeatureIds
          .map((item) => {
            const option = formData.selectedOptions[item];
            const optionString = option
              ? `(${CommonUtility.removeWhiteSpace(option)})`
              : "";
            return `,${item}${optionString}`;
          })
          .join("");

        if (finalString && finalString !== "") {
          router.push(
            `upload?filters=${CommonUtility.removeStartingComma(
              finalString.trim()
            )}`
          );
        } else {
          newInfoAlert(
            "Select any modal",
            "Please select any features along with associated sub-feature.",
            "OK",
            "warning"
          );
        }
      }
    },
    [selectedFeatureIds, selectedOptions, isLogin, router, user]
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
                  {headerData?.map((headerOption) => {
                    if (headerOption.active) {
                      return (
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
                      );
                    }
                    return null;
                  })}
                </Nav>
                <Tab.Content>
                  {headerData?.map((headerOption) => {
                    return (
                      <Tab.Pane
                        key={headerOption.id}
                        eventKey={headerOption.id}
                      >
                        <Row>
                          {headerOption.features?.map((item) => (
                            <Col md={6} xl={4} className="mt-4" key={item.name}>
                              <Form.Control
                                type="checkbox"
                                className="btn-check"
                                value={item.webFeatureKey}
                                id={`btn-check-outlined ${item.featureId}`}
                                hidden
                                checked={selectedFeatureIds[
                                  activeTab
                                ]?.includes(item.webFeatureKey)}
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
                                  {item.options?.map((opt, i) => {
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
                                          checked={
                                            selectedRadioOption &&
                                            selectedRadioOption.length > 0 &&
                                            selectedRadioOption.findIndex(
                                              (a) =>
                                                a.selectedOption === opt.name &&
                                                a.activeTab === activeTab &&
                                                a.featureId ===
                                                  item.webFeatureKey
                                            ) !== -1
                                          }
                                          name={`radio-${item.featureId}-${activeTab}`}
                                          onChange={() =>
                                            handleOptionChange(
                                              item.webFeatureKey,
                                              opt.name
                                            )
                                          }
                                          id={
                                            activeTab +
                                            item.featureId +
                                            opt.name.replace(/\s/g, "")
                                          }
                                          autoComplete="off"
                                        />
                                        <label
                                          className="btn btn-outline-dark px-2 text-xs"
                                          htmlFor={
                                            activeTab +
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
                    );
                  })}
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