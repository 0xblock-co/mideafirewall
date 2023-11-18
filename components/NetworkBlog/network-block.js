import { useAuth } from "@/contexts/AuthContext";
import { getAllHeaderDataOptionsUpdated } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import RenderIf from "../ConditionalRender/RenderIf";
import ReadMore from "../ReadMore";
import style from "./network-blog.module.scss";

export default function NetworkBlock() {
    const router = useRouter();
    const { user, isLogin } = useAuth();

    const headerData = useAppSelector(getAllHeaderDataOptionsUpdated);
    const [activeTab, setActiveTab] = useState("0");
    const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const handleTabChange = (key) => setActiveTab(key);

    useEffect(() => {
        function getPreSelectedDataFromLocalStorage() {
            const data = localStorage.getItem("selectedDataForDemo");
            const parsedData = JSON.parse(data);
            if (parsedData) {
                setSelectedFeatureIds(parsedData.selectedFeatureIds);
                setSelectedOptions(parsedData.selectedOptions);
                localStorage.removeItem("selectedDataForDemo");
            }
        }
        getPreSelectedDataFromLocalStorage();
    }, [router]);

    useEffect(() => {
        const { query } = router;
        const { key } = query;

        if (CommonUtility.isNotEmptyObject(query) && "key" in query && headerData.some((item) => item.id === key)) {
            setActiveTab(key.toString());
        }
    }, [router.query, headerData]);

    const handleCheckboxChange = (featureId) => {
        setSelectedFeatureIds((prevSelectedFeatureIds) => {
            if (prevSelectedFeatureIds.includes(featureId)) {
                return prevSelectedFeatureIds.filter((id) => id !== featureId);
            } else {
                return [...prevSelectedFeatureIds, featureId];
            }
        });
        const selectedTabData = headerData.find((item) => item.id === activeTab);
        const selectedObj = selectedTabData.features.find((item) => item.webFeatureKey === featureId);

        if (CommonUtility.isValidArray(selectedObj.options)) {
            setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [featureId]: selectedObj.options[0].name,
            }));
        }
    };

    const handleOptionChange = (featureId, selectedOption) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [featureId]: selectedOption,
        }));
    };

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            if (!isLogin) {
                // newInfoAlert(
                //   "Login Required for Demo Access",
                //   "To access the demo, you need to either log in or sign up for an account. Please proceed with login or sign-up to get a demo.",
                //   "Continue",
                //   "warning"
                // ).then(() => {
                //   router.push("/account-security/login");
                // });
                localStorage.setItem("selectedDataForDemo", JSON.stringify({ selectedFeatureIds, selectedOptions }));
                router.push("/account-security/login");
                return;
            }

            if (!user.surveyAnswered) {
                newInfoAlert("Survey answers are required", "Please fill the survey questionnaires to continue with the content moderation process.", "Continue", "warning").then(() => {
                    router.push("/survey");
                });
                return;
            }
            // if (user.api_secret === "") {
            //   newInfoAlert(
            //     "Free quota exceeded",
            //     "Unlock additional features by subscribing to access extended operations beyond the current limit.",
            //     "OK",
            //     "warning"
            //   ).then(() => {
            //     router.push("/pricing");
            //   });
            //   return;
            // }

            const formData = {
                selectedFeatureIds,
                selectedOptions,
            };

            if (formData && CommonUtility.isValidArray(formData.selectedFeatureIds)) {
                let finalString = formData.selectedFeatureIds
                    .map((item) => {
                        const option = formData.selectedOptions[item];
                        const optionString = option ? `(${CommonUtility.removeWhiteSpace(option)})` : "";
                        return `,${item}${optionString}`;
                    })
                    .join("");

                if (finalString && finalString !== "") {
                    router.push(`upload?filters=${CommonUtility.removeStartingComma(finalString.trim())}`);
                } else {
                    newInfoAlert("Select any modal", "Please select any features along with associated sub-feature.", "OK", "warning");
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
                        <Col xl={12} className="mt-4">
                            <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabChange}>
                                <Nav variant="pills" className="flex-row flex-wrap justify-content-lg-around">
                                    {headerData?.map((headerOption) => {
                                        if (headerOption.active) {
                                            return (
                                                <Nav.Item key={headerOption.id} className="me-3 me-lg-0 mt-3 mt-lg-0">
                                                    <Nav.Link className={style.mdf__btn_large} eventKey={headerOption.id}>
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
                                            <Tab.Pane key={headerOption.id} eventKey={headerOption.id}>
                                                <Row>
                                                    {headerOption.features?.map((item) => (
                                                        <Col md={6} xl={4} className="mt-4" key={item.name}>
                                                            <Form.Control
                                                                type="checkbox"
                                                                checked={selectedFeatureIds.includes(item.webFeatureKey)}
                                                                className="btn-check"
                                                                value={item.webFeatureKey}
                                                                name={`tab-${activeTab}-${item.featureId}`}
                                                                id={`btn-check-outlined tab-${activeTab}-${item.featureId}`}
                                                                hidden
                                                                onChange={() => {
                                                                    if (!item.active) {
                                                                        newInfoAlert(
                                                                            "Personalized Feature Activation",
                                                                            "If you'd like to activate this feature for your account, please get in touch with us via email, and we'll take care of it for you.",
                                                                            "Okay"
                                                                        );
                                                                        return;
                                                                    }
                                                                    handleCheckboxChange(item.webFeatureKey);
                                                                }}
                                                            />
                                                            <label
                                                                className={`btn btn-outline-info ${style.card__primary} ${!item.active ? style.mdf__feature__card_inactive : ""}`}
                                                                htmlFor={`btn-check-outlined tab-${activeTab}-${item.featureId}`}
                                                            >
                                                                <div>
                                                                    <img loading="lazy" className={`lazyload ${style.mdf__card_img}`} src={item.imgUrl} alt="A globe icon with filter and text." />
                                                                </div>
                                                                <h5 className="text-dark mt-3 mb-3">{item.name}</h5>
                                                                <ReadMore text={item.description} maxLength={150} />
                                                                {/* <p className="mt-3">{item.description}</p> */}

                                                                <div className="d-flex flex-wrap mt-3 gap-3">
                                                                    {item.options?.map((opt, i) => {
                                                                        return (
                                                                            <div key={item.featureId + opt.name.replace(/\s/g, "")}>
                                                                                <Form.Control
                                                                                    type="checkbox"
                                                                                    checked={selectedOptions[item.webFeatureKey] === opt.name}
                                                                                    className="btn-check"
                                                                                    value={opt.name}
                                                                                    id={item.featureId + opt.name.replace(/\s/g, "")}
                                                                                    hidden
                                                                                    onChange={() => handleOptionChange(item.webFeatureKey, opt.name)}
                                                                                />
                                                                                <label className="btn btn-outline-dark px-2 text-xs" htmlFor={item.featureId + opt.name.replace(/\s/g, "")}>
                                                                                    {opt.name}
                                                                                </label>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                                <RenderIf isTrue={CommonUtility.isValidArray(item.mediaSupports)}>
                                                                    <div className={`d-flex align-items-center mt-3 ${style.supported_moderation}`}>
                                                                        <h6
                                                                            className="text-dark "
                                                                            style={{
                                                                                fontSize: "14px",
                                                                                marginBottom: "unset",
                                                                            }}
                                                                        >
                                                                            Supports:
                                                                        </h6>
                                                                        {item.mediaSupports.map((item, index) => {
                                                                            return (
                                                                                <span
                                                                                    key={index}
                                                                                    className={style.supported_item}
                                                                                    style={{
                                                                                        marginLeft: "10px",
                                                                                        fontSize: "12px",
                                                                                    }}
                                                                                >
                                                                                    <RenderIf isTrue={item.toLowerCase() === "image"}>
                                                                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M19.5 3h-15a3.003 3.003 0 0 0-3 3v12a3.003 3.003 0 0 0 3 3h15a3.004 3.004 0 0 0 3-3V6a3.003 3.003 0 0 0-3-3Zm-3.75 3a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM4.5 19.5A1.5 1.5 0 0 1 3 18v-3.17l4.446-3.952a2.253 2.253 0 0 1 3.084.09l3.045 3.037L8.08 19.5H4.5ZM21 18a1.5 1.5 0 0 1-1.5 1.5h-9.299l5.692-5.692a2.237 2.237 0 0 1 2.89-.007L21 15.649V18Z"></path>
                                                                                        </svg>
                                                                                    </RenderIf>
                                                                                    <RenderIf isTrue={item.toLowerCase() === "video"}>
                                                                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M21.75 18.02a1.5 1.5 0 0 1-.61-.13.74.74 0 0 1-.126-.072l-3.877-2.729a1.5 1.5 0 0 1-.637-1.226v-3.722a1.5 1.5 0 0 1 .637-1.226l3.877-2.73a.742.742 0 0 1 .127-.071 1.5 1.5 0 0 1 2.109 1.37v9.036a1.5 1.5 0 0 1-1.5 1.5Z"></path>
                                                                                            <path d="M12.563 18.75H3.937A3.19 3.19 0 0 1 .75 15.562V8.439A3.19 3.19 0 0 1 3.938 5.25h8.647a3.169 3.169 0 0 1 3.165 3.165v7.148a3.19 3.19 0 0 1-3.188 3.187Z"></path>
                                                                                        </svg>
                                                                                    </RenderIf>
                                                                                    <RenderIf isTrue={item.toLowerCase() === "text"}>
                                                                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M20.063 10.5H13.5a2.25 2.25 0 0 1-2.25-2.25V1.687a.188.188 0 0 0-.188-.187H6.75a3 3 0 0 0-3 3v15a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-8.813a.188.188 0 0 0-.188-.187ZM15.75 18h-7.5a.75.75 0 1 1 0-1.5h7.5a.75.75 0 1 1 0 1.5Zm0-3.75h-7.5a.75.75 0 1 1 0-1.5h7.5a.75.75 0 1 1 0 1.5Z"></path>
                                                                                            <path d="m19.65 8.839-6.74-6.741a.093.093 0 0 0-.16.066v6.085a.75.75 0 0 0 .75.75h6.085a.094.094 0 0 0 .066-.16Z"></path>
                                                                                        </svg>
                                                                                    </RenderIf>
                                                                                    {item}
                                                                                </span>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                    {/* <div className="d-flex align-items-center">
                                    <h6
                                      className="text-dark mt-3"
                                      style={{ fontSize: "12px" }}
                                    >
                                      Supports:
                                    </h6>
                                    <span
                                      className="text-dark mt-3"
                                      style={{
                                        marginLeft: "10px",
                                        marginBottom: "8px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {item.mediaSupports.join(" & ")}
                                    </span>
                                  </div> */}
                                                                </RenderIf>
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
                        <Col xl={12} className="text-center">
                            <Button type="submit" variant="primary" className="shadow-lg px-5 py-2 mt-5 rounded-4">
                                Proceed
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </section>
    );
}
