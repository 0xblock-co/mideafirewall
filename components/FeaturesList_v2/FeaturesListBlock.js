import { useAuthV3 } from "@/contexts-v2/auth.context";
import { getAllHeaderDataOptionsUpdated, getMfwTestCustomersSelector } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
// import Select2 from "react-select2-wrapper";
import RenderIf from "../ConditionalRender/RenderIf";
import Loader from "../Loader";
import ReadMore from "../ReadMore";
import VideoModal from "../VideoModal";
import style from "./featuresList_v2.module.scss";
export default function FeaturesListV2Block() {
    const router = useRouter();
    const { user, isLogin } = useAuthV3();
    const [isLoading, setIsLoading] = useState(false);

    const headerData = useAppSelector(getAllHeaderDataOptionsUpdated);
    const [activeTab, setActiveTab] = useState("0");
    const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [myRefKeyValue, setMyRefKeyValue] = useState("");
    const [isShowVideoModel, setIsShowVideoModel] = useState(false);
    const [selectedMediaContent, setSelectedMediaContent] = useState(null);
    const [selectedCategoryData, setSelectedCategoryData] = useState(headerData[0]);
    const featureRefs = useRef({});

    useEffect(() => {
        if (activeTab) {
            setSelectedCategoryData(filterData(activeTab)[0]);
        } else {
            setSelectedCategoryData(headerData[0]);
        }
    }, [headerData, activeTab]);

    useEffect(() => {
        if (!isShowVideoModel) setSelectedMediaContent(null);
    }, [isShowVideoModel]);

    useEffect(() => {
        const { query } = router;
        const { key } = query;
        if (CommonUtility.isNotEmptyObject(query) && "key" in query && headerData.some((item) => item.id === key)) {
            setActiveTab(key?.toString());
        }

        function getPreSelectedDataFromLocalStorage() {
            const data = localStorage.getItem("selectedDataForDemo");
            const parsedData = JSON.parse(data);
            if (parsedData?.activeTab) setActiveTab(parsedData?.activeTab?.toString());

            const selectedTabIndex = key || parsedData?.activeTab;
            if (parsedData && selectedTabIndex) {
                setMyRefKeyValue(`${selectedTabIndex.toString()}-${parsedData?.selectedFeatureIds[0]}`);
                setSelectedFeatureIds(parsedData.selectedFeatureIds);
                setSelectedOptions(parsedData.selectedOptions);
                setTimeout(() => {
                    localStorage.removeItem("selectedDataForDemo");
                }, 600);
            }
        }
        getPreSelectedDataFromLocalStorage();
    }, [router.query, headerData]);

    useEffect(() => {
        return () => {
            setIsLoading(false);
            setMyRefKeyValue("");
        };
    }, []);

    useEffect(() => {
        if (myRefKeyValue) {
            scrollToFeature(myRefKeyValue);
        }
    }, [myRefKeyValue]);

    const handleTabChange = (key) => setActiveTab(key);

    const createFeatureRef = (featureKey) => {
        featureRefs.current[featureKey] = createRef();
    };

    const scrollToFeature = (featureKey) => {
        if (featureRefs.current[featureKey] && featureRefs.current[featureKey].current) {
            const element = featureRefs.current[featureKey].current;
            const offset = -90;

            window.scrollTo({
                top: element.offsetTop + offset,
                behavior: "smooth",
            });
        }
    };

    const handleCheckboxChange = (featureId, fullSelectedItem) => {
        if (!fullSelectedItem.active) {
            setSelectedMediaContent(fullSelectedItem);
            if (fullSelectedItem.webFeatureKey === "deepfake" || fullSelectedItem.featureId == "134") {
                newInfoAlert("Coming Soon", "", "Preview", "").then(() => {
                    setIsShowVideoModel(true);
                });
                return;
            }

            newInfoAlert(
                "Enterprise Feature",
                "Your request for the enterprise feature is appreciated; however, it's not enabled by default. Would you be interested in a live demonstration?",
                "Schedule a live demo",
                "",
                true,
                "Preview"
            )
                .then(() => {
                    if (isLogin) {
                        if (user?.meetingSurveyAnswered) {
                            router.push("/book-demo?type=DEMO");
                        } else {
                            router.push("/schedule-demo");
                        }
                    } else {
                        router.push("/account-security/login");
                    }
                })
                .catch(() => {
                    setIsShowVideoModel(true);
                });
            return;
        }

        // ----
        setSelectedFeatureIds((prevSelectedFeatureIds) =>
            prevSelectedFeatureIds.includes(featureId) ? prevSelectedFeatureIds.filter((id) => id !== featureId) : [...prevSelectedFeatureIds, featureId]
        );

        const selectedTabData = headerData.find((item) => item.id === activeTab);
        const selectedObj = selectedTabData.features.find((item) => item.webFeatureKey === featureId);

        if (CommonUtility.isValidArray(selectedObj.options)) {
            setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [featureId]: selectedObj.options[0].name,
            }));
        }
    };

    const handleOptionChange = (featureId, selectedOption, isMultiSelectOption) => {
        if (isMultiSelectOption) {
            setSelectedOptions((prevSelectedOptions) => {
                const currentFeatureOptions = prevSelectedOptions[featureId] || ""; // Access the property within the object
                const currentOptionsArray = currentFeatureOptions.split(".");
                let updatedOptions = selectedOption;

                if (currentOptionsArray.length > 0) {
                    const alreadySelectedOptionIndex = currentOptionsArray.indexOf(selectedOption);
                    if (alreadySelectedOptionIndex > -1) {
                        if (currentOptionsArray.length == 1) {
                            newInfoAlert("", "You cannot remove the only element. It should have at least 1.", "Got It.", "warning", false, "", false);
                            updatedOptions = currentOptionsArray.join(".");
                        } else {
                            currentOptionsArray.splice(alreadySelectedOptionIndex, 1);
                        }
                    } else {
                        currentOptionsArray.push(selectedOption);
                    }
                    updatedOptions = currentOptionsArray.join(".");
                }
                return {
                    ...prevSelectedOptions,
                    [featureId]: updatedOptions,
                };
            });
        } else {
            setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [featureId]: selectedOption,
            }));
        }
    };
    const mfw_customersList = useAppSelector(getMfwTestCustomersSelector);
    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            if (!isLogin) {
                await localStorage.setItem("selectedDataForDemo", JSON.stringify({ selectedFeatureIds, selectedOptions, activeTab }));
                router.push("/account-security/login");
                return;
            }

            if (!user.surveyAnswered) {
                await localStorage.setItem("selectedDataForDemo", JSON.stringify({ selectedFeatureIds, selectedOptions, activeTab }));
                router.push("/survey");
                return;
            }
            setIsLoading(true);
            const formData = {
                selectedFeatureIds,

                selectedOptions,
            };

            if (formData && CommonUtility.isValidArray(formData.selectedFeatureIds)) {
                let finalString = formData.selectedFeatureIds
                    .map((item) => {
                        const option = formData.selectedOptions[item];
                        const updatedOptions = option ? CommonUtility.removeStartingComma(option.trim()) : option;
                        const optionString = updatedOptions ? `(${CommonUtility.removeWhiteSpace(updatedOptions)})` : "";
                        return `,${item}${optionString}`;
                    })
                    .join("");

                if (finalString && finalString !== "") {
                    router.push(`upload?filters=${CommonUtility.removeStartingComma(finalString.trim())}&sf_id=${formData.selectedFeatureIds.toString()}`);
                } else {
                    newInfoAlert(
                        "Choose Your Preferred Features",
                        "Please select from the following features, along with their associated sub-features, for your desired Features.",
                        "Got It.",
                        "warning",
                        false,
                        "",
                        false
                    );
                    setIsLoading(false);
                }
            } else {
                newInfoAlert(
                    "Choose Your Preferred Features",
                    "Please select from the following features, along with their associated sub-features, for your desired Features.",
                    "Got It.",
                    "warning",
                    false,
                    "",
                    false
                );
                setIsLoading(false);
            }
        },
        [selectedFeatureIds, selectedOptions, isLogin, router, user]
    );

    const filterData = (key) => {
        return headerData?.filter((headerOption) => headerOption.id == key);
    };

    const getTransformedData = (originalData) =>
        originalData.map(
            (headerOption) =>
                headerOption.active && {
                    value: headerOption.id,
                    label: headerOption.name,
                }
        );

    const handleSelectChange = (data) => {
        const selectedData = filterData(data.value);
        handleTabChange(selectedData[0].id);
        setSelectedCategoryData(selectedData[0]);
    };
    const customStyles = {
        // control: (styles) => ({ ...styles, backgroundColor: "white" }),
        control: (styles) => ({
            ...styles,
            borderColor: "#3498db", // Set the default border color
            "&:hover": {
                borderColor: "#2980b9", // Set the border color on hover
            },
            "&:focus": {
                borderColor: "#2980b9", // Set the border color when focused
            },
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            borderColor: "#3498db",
            color: isSelected ? "#7b5b9e" : isFocused ? "#7B5B9E" : "black",
            backgroundColor: "none",
        }),
    };
    return (
        <section className={`p-3 p-xl-5 ${style.mdf__network__block_tabs}`}>
            <Form onSubmit={onSubmit}>
                <Container>
                    <div className="px-3 justify-content-between d-flex">
                        <div>
                            <span>5</span> filters selected
                        </div>
                        <div class="w-25">
                            <Select
                                value={getTransformedData(filterData(activeTab))}
                                isSearchable={false}
                                options={getTransformedData(headerData)}
                                onChange={handleSelectChange}
                                styles={customStyles}
                                // theme={(theme) => ({
                                //     ...theme,
                                //     borderRadius: 0,
                                //     colors: {
                                //         ...theme.colors,
                                //         primary25: "#7B5B9E",
                                //         primary: "#7b5b9e",
                                //     },
                                // })}
                            />
                        </div>
                    </div>
                    <Row className="justify-content-center">
                        <Col xl={12} className="mt-4">
                            {/* <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabChange}> */}
                            {/* <Nav variant="pills" className="flex-row flex-wrap justify-content-center gap-2">
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
                                </Nav> */}
                            <Container>
                                {/* {headerData?.map((headerOption) => {
                                        return (
                                            // <Tab.Pane key={headerOption.id} eventKey={headerOption.id}> */}
                                <Row>
                                    {selectedCategoryData?.features?.map((item) => {
                                        if (!featureRefs.current[`${selectedCategoryData.id}-${item.webFeatureKey}`]) {
                                            createFeatureRef(`${selectedCategoryData.id}-${item.webFeatureKey}`);
                                        }

                                        return (
                                            item.active && (
                                                <Col
                                                    md={6}
                                                    xl={4}
                                                    className="mt-4"
                                                    key={item.name}
                                                    id={item.webFeatureKey}
                                                    ref={featureRefs.current[`${selectedCategoryData.id}-${item.webFeatureKey}`]}
                                                >
                                                    <Form.Control
                                                        type="checkbox"
                                                        checked={selectedFeatureIds.includes(item.webFeatureKey)}
                                                        className="btn-check"
                                                        value={item.webFeatureKey}
                                                        name={`tab-${activeTab}-${item.featureId}`}
                                                        id={`btn-check-outlined tab-${activeTab}-${item.featureId}`}
                                                        hidden
                                                        onChange={() => handleCheckboxChange(item.webFeatureKey, item)}
                                                    />
                                                    <label
                                                        className={`btn btn-outline-info ${style.card__primary} ${!item.active ? style.mdf__feature__card_inactive : ""}`}
                                                        htmlFor={`btn-check-outlined tab-${activeTab}-${item.featureId}`}
                                                    >
                                                        <div>
                                                            <div>
                                                                <img title={item?.name} loading="lazy" className={`lazyload ${style.mdf__card_img}`} src={item.imgUrl} alt={item?.name} />
                                                            </div>
                                                            <h5 className="text-dark mt-3 mb-3">{item.name}</h5>
                                                            <ReadMore text={item.description} maxLength={130} />

                                                            <div className="d-flex flex-wrap mt-3 gap-3">
                                                                {item.options?.map((opt, i) => {
                                                                    return (
                                                                        <div key={item.featureId + opt.name.replace(/\s/g, "")}>
                                                                            <Form.Control
                                                                                type="checkbox"
                                                                                // checked={isChecked}
                                                                                checked={
                                                                                    item.multi
                                                                                        ? selectedOptions[item.webFeatureKey]?.includes(opt.name)
                                                                                        : selectedOptions[item.webFeatureKey] === opt.name
                                                                                }
                                                                                className="btn-check"
                                                                                value={opt.name}
                                                                                id={item.featureId + opt.name.replace(/\s/g, "")}
                                                                                hidden
                                                                                onChange={() => handleOptionChange(item.webFeatureKey, opt.name, item.multi)}
                                                                            />
                                                                            <label className="btn btn-outline-dark px-2 text-xs" htmlFor={item.featureId + opt.name.replace(/\s/g, "")}>
                                                                                {opt.name}
                                                                            </label>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <RenderIf isTrue={CommonUtility.isValidArray(item.mediaSupports)}>
                                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                                    {" "}
                                                                    <div className={`d-flex align-items-center  ${style.supported_moderation}`}>
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
                                                                    <RenderIf isTrue={item?.featureId == "134"}>
                                                                        <div className="blink" style={{ color: "#5e0496", fontSize: "16px", fontWeight: 600 }}>
                                                                            Coming Soon
                                                                        </div>
                                                                    </RenderIf>
                                                                </div>
                                                            </RenderIf>
                                                        </div>
                                                    </label>
                                                </Col>
                                            )
                                        );
                                    })}
                                </Row>
                                {/* // </Tab.Pane>
                                        );
                                    })} */}
                            </Container>
                            {/* </Tab.Container> */}
                        </Col>
                        <Col xl={12} className="text-center">
                            <Button type="submit" variant="primary" className="shadow-lg px-5 py-2 mt-5 rounded-4">
                                Proceed
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            {selectedMediaContent && isShowVideoModel && (
                <VideoModal
                    show={isShowVideoModel}
                    handleClose={setIsShowVideoModel}
                    videoUrl={CommonUtility.isNotEmpty(selectedMediaContent?.clipUrl) ? selectedMediaContent?.clipUrl : "https://www.youtube.com/embed/nafYaz7caGQ?si=vQKekrtF7fNITp4d"}
                    posterImage={selectedMediaContent?.imgUrl || ""}
                />
            )}
            <Loader isLoading={isLoading} />
        </section>
    );
}
