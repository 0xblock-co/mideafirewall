import { useAuthV3 } from "@/contexts-v2/auth.context";
import { getAllHeaderDataOptionsUpdated, getMfwTestCustomersSelector } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Select from "react-select";
// import Select2 from "react-select2-wrapper";
import RenderIf from "../ConditionalRender/RenderIf";
import Loader from "../Loader";
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
    const [seletedFilterCount, setSeletedFilterCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const handleReadMoreClick = (feature, id) => {
        setModalContent(feature);
        setShowModal(true);
    };

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
                setSeletedFilterCount(1);
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

    const handleCheckboxChange = (featureId, fullSelectedItem, isClicked) => {
        setSeletedFilterCount(isClicked ? seletedFilterCount + 1 : seletedFilterCount - 1);
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
        control: (styles) => ({
            ...styles,
            borderColor: "#DADADA",
            cursor: "pointer",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "rgba(123, 91, 158, 1)",
        }),
        menu: (provided) => ({
            ...provided,
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(218, 218, 218, 1)",
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "500",
            borderColor: "#3498db",
            color: isSelected ? "#7b5b9e" : isFocused ? "#7B5B9E" : "#555555",
            backgroundColor: "none",
            cursor: "pointer",
            ":active": {
                backgroundColor: "none",
            },
        }),
    };

    return (
        <section className={`p-3 p-xl-5 ${style.mdf__network__block_tabs}`}>
            <Form onSubmit={onSubmit}>
                <Container>
                    <div className="px-3 justify-content-between d-flex flex-md-row flex-column align-items-center">
                        <div className="mb-2 mb-md-0">
                            <span>{seletedFilterCount}</span> filters selected
                        </div>
                        <div className="w-50 d-flex align-items-center justify-content-end">
                            <label className={style.category_title}>Business Categories</label>
                            <div className={style.responsive_select}>
                                <Select
                                    value={getTransformedData(filterData(activeTab))}
                                    isSearchable={false}
                                    options={getTransformedData(headerData)}
                                    onChange={handleSelectChange}
                                    styles={customStyles}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary: "#7b5b9e",
                                        },
                                    })}
                                />
                            </div>
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
                                                    xl={6}
                                                    className="mt-4"
                                                    key={item.name}
                                                    id={item.webFeatureKey}
                                                    ref={featureRefs.current[`${selectedCategoryData.id}-${item.webFeatureKey}`]}
                                                >
                                                    <Form.Control
                                                        type="checkbox"
                                                        checked={selectedFeatureIds.includes(item.webFeatureKey)}
                                                        className={`btn-check ${style.btn_custom_check}`}
                                                        value={item.webFeatureKey}
                                                        name={`tab-${activeTab}-${item.featureId}`}
                                                        id={`btn-check-outlined tab-${activeTab}-${item.featureId}`}
                                                        hidden
                                                        onChange={(event) => handleCheckboxChange(item.webFeatureKey, item, event.target.checked)}
                                                    />
                                                    <label
                                                        className={`btn btn-outline-info ${style.card__primary} ${!item.active ? style.mdf__feature__card_inactive : ""}`}
                                                        htmlFor={`btn-check-outlined tab-${activeTab}-${item.featureId}`}
                                                    >
                                                        <div>
                                                            {/* <div>
                                                                <img title={item?.name} loading="lazy" className={`lazyload ${style.mdf__card_img}`} src={item.imgUrl} alt={item?.name} />
                                                            </div> */}
                                                            <div className="justify-content-between d-flex">
                                                                <h5 className={`text-dark my-1 ${style.mdf_title}`}>{item.name}</h5>
                                                                <input
                                                                    class={`form-check-input ${style.custom_checkbox}`}
                                                                    type="checkbox"
                                                                    value={item.webFeatureKey}
                                                                    id="flexCheckDefault"
                                                                    checked={selectedFeatureIds.includes(item.webFeatureKey)}
                                                                    onChange={(event) => handleCheckboxChange(item.webFeatureKey, item, event.target.checked)}
                                                                />

                                                                {/* <div className={style.responsive_select}></div> */}
                                                            </div>

                                                            {/* <ReadMore text={item.description} maxLength={130} /> */}
                                                            {/* <Form.Control
                                                                type="checkbox"
                                                                checked={selectedFeatureIds.includes(item.webFeatureKey)}
                                                                // className="btn-check"
                                                                value={item.webFeatureKey}
                                                                name={`tab-${activeTab}-${item.featureId}`}
                                                                id={`btn-check-outlined tab-${activeTab}-${item.featureId}`}
                                                                // hidden
                                                                onChange={() => handleCheckboxChange(item.webFeatureKey, item)}
                                                            /> */}

                                                            <div className="d-flex flex-wrap mt-1 md-1 gap-1">
                                                                {item.options?.map((opt, i) => {
                                                                    const isChecked = item.multi
                                                                        ? selectedOptions[item.webFeatureKey]?.includes(opt.name)
                                                                        : selectedOptions[item.webFeatureKey] === opt.name;

                                                                    return (
                                                                        <div
                                                                            key={item.featureId + opt.name.replace(/\s/g, "")}
                                                                            className={`${style.mdf_card_checkbox_option} ${isChecked ? style.mdf_card_checked : style.mdf_card_unchecked}`}
                                                                        >
                                                                            <Form.Control
                                                                                type="checkbox"
                                                                                checked={isChecked}
                                                                                value={opt.name}
                                                                                id={item.featureId + opt.name.replace(/\s/g, "")}
                                                                                hidden
                                                                                onChange={() => handleOptionChange(item.webFeatureKey, opt.name, item.multi)}
                                                                            />
                                                                            <label
                                                                                className={`btn p-1 text-xs ${style.mdf_card_common} ${
                                                                                    isChecked ? style.mdf_card_label_checked : style.mdf_card_label_unchecked
                                                                                }`}
                                                                                htmlFor={item.featureId + opt.name.replace(/\s/g, "")}
                                                                            >
                                                                                {opt.name}
                                                                            </label>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <RenderIf isTrue={CommonUtility.isValidArray(item.mediaSupports)}>
                                                                <div className="align-items-center mt-1">
                                                                    {" "}
                                                                    <div className={`d-flex align-items-center justify-content-between ${style.supported_moderation}`}>
                                                                        <div className="d-flex align-items-center">
                                                                            <h6
                                                                                className="text-dark "
                                                                                style={{
                                                                                    fontSize: "14px",
                                                                                    marginBottom: "unset",
                                                                                    marginRight: "8px",
                                                                                }}
                                                                            >
                                                                                Supports
                                                                            </h6>
                                                                            {item.mediaSupports.map((item, index) => {
                                                                                return (
                                                                                    // <span
                                                                                    //     key={index}
                                                                                    //     className={style.supported_item}
                                                                                    //     style={{
                                                                                    //         marginLeft: "10px",
                                                                                    //         fontSize: "12px",
                                                                                    //     }}
                                                                                    // >
                                                                                    <>
                                                                                        <RenderIf isTrue={item.toLowerCase() === "image"}>
                                                                                            {/* <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M19.5 3h-15a3.003 3.003 0 0 0-3 3v12a3.003 3.003 0 0 0 3 3h15a3.004 3.004 0 0 0 3-3V6a3.003 3.003 0 0 0-3-3Zm-3.75 3a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM4.5 19.5A1.5 1.5 0 0 1 3 18v-3.17l4.446-3.952a2.253 2.253 0 0 1 3.084.09l3.045 3.037L8.08 19.5H4.5ZM21 18a1.5 1.5 0 0 1-1.5 1.5h-9.299l5.692-5.692a2.237 2.237 0 0 1 2.89-.007L21 15.649V18Z"></path>
                                                                                        </svg> */}

                                                                                            {/* <Image className={style.social__icons}  src="/images/image.png" alt="" /> */}
                                                                                            <OverlayTrigger
                                                                                                placement="top"
                                                                                                overlay={(props) => (
                                                                                                    <Tooltip id="button-tooltip" {...props}>
                                                                                                        Image
                                                                                                    </Tooltip>
                                                                                                )}
                                                                                            >
                                                                                                <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path
                                                                                                        fill-rule="evenodd"
                                                                                                        clip-rule="evenodd"
                                                                                                        d="M1.62286 1.48453C0.988281 2.11911 0.988281 3.14045 0.988281 5.18313V7.34931C0.988281 9.39199 0.988281 10.4133 1.62286 11.0479C2.25744 11.6825 3.27877 11.6825 5.32145 11.6825H7.48844C9.53111 11.6825 10.5525 11.6825 11.187 11.0479C11.8216 10.4133 11.8216 9.39199 11.8216 7.34931V5.18313C11.8216 3.64524 11.8216 2.68628 11.5508 2.03543V8.97435C11.0306 8.97435 10.5316 8.7677 10.1638 8.39985L9.75662 7.99273L9.75661 7.99273C9.36586 7.60201 9.17049 7.40665 8.94895 7.32433C8.70554 7.23389 8.43774 7.23389 8.19433 7.32433C7.97279 7.40665 7.77741 7.60201 7.38666 7.99273L7.32537 8.05402C7.00826 8.37111 6.84971 8.52965 6.68124 8.55919C6.55037 8.58214 6.41564 8.5562 6.30266 8.48628C6.15721 8.39628 6.06888 8.19019 5.89222 7.77802L5.89222 7.77802L5.86331 7.71056C5.45722 6.7631 5.25418 6.28937 4.89997 6.11183C4.72172 6.02249 4.52226 5.98408 4.32357 6.00083C3.92877 6.03411 3.5643 6.39854 2.83538 7.12741L1.80081 8.16191V1.33057C1.73817 1.37721 1.679 1.42839 1.62286 1.48453Z"
                                                                                                        fill="#989898"
                                                                                                    />
                                                                                                    <path
                                                                                                        d="M1.52993 5.18327C1.52993 4.14662 1.53108 3.42362 1.60442 2.87811C1.67567 2.34818 1.80598 2.06755 2.00586 1.86768C2.20574 1.6678 2.48636 1.53748 3.01629 1.46624C3.5618 1.39289 4.2848 1.39174 5.32145 1.39174H7.48844C8.52509 1.39174 9.24809 1.39289 9.7936 1.46624C10.3235 1.53748 10.6042 1.6678 10.804 1.86768C11.0039 2.06755 11.1342 2.34818 11.2055 2.87811C11.2788 3.42362 11.28 4.14662 11.28 5.18327V7.34945C11.28 8.38611 11.2788 9.10911 11.2055 9.65462C11.1342 10.1845 11.0039 10.4652 10.804 10.6651C10.6042 10.8649 10.3235 10.9952 9.7936 11.0665C9.24809 11.1398 8.52509 11.141 7.48844 11.141H5.32145C4.2848 11.141 3.5618 11.1398 3.01629 11.0665C2.48636 10.9952 2.20574 10.8649 2.00586 10.6651C1.80598 10.4652 1.67567 10.1845 1.60442 9.65462C1.53108 9.10911 1.52993 8.38611 1.52993 7.34946V5.18327Z"
                                                                                                        stroke="#989898"
                                                                                                        stroke-width="1.08329"
                                                                                                    />
                                                                                                    <ellipse cx="8.02987" cy="4.64136" rx="1.08333" ry="1.08325" fill="#989898" />
                                                                                                </svg>
                                                                                            </OverlayTrigger>
                                                                                        </RenderIf>
                                                                                        <RenderIf isTrue={item.toLowerCase() === "video"}>
                                                                                            <OverlayTrigger
                                                                                                placement="top"
                                                                                                overlay={(props) => (
                                                                                                    <Tooltip id="button-tooltip" {...props}>
                                                                                                        Video
                                                                                                    </Tooltip>
                                                                                                )}
                                                                                            >
                                                                                                <svg width="20" height="" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path
                                                                                                        fill-rule="evenodd"
                                                                                                        clip-rule="evenodd"
                                                                                                        d="M6.76517 12.736C10.0476 12.736 12.7086 10.0753 12.7086 6.79305C12.7086 3.51085 10.0476 0.850098 6.76517 0.850098C3.48273 0.850098 0.821777 3.51085 0.821777 6.79305C0.821777 10.0753 3.48273 12.736 6.76517 12.736ZM5.9613 4.14518L9.68831 6.21559C10.1412 6.46718 10.1412 7.11852 9.68831 7.37012L5.9613 9.44053C5.43313 9.73393 4.78407 9.35201 4.78407 8.74781V4.8379C4.78407 4.2337 5.43313 3.85177 5.9613 4.14518Z"
                                                                                                        fill="#989898"
                                                                                                    />
                                                                                                </svg>
                                                                                            </OverlayTrigger>
                                                                                        </RenderIf>
                                                                                        <RenderIf isTrue={item.toLowerCase() === "text"}>
                                                                                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M20.063 10.5H13.5a2.25 2.25 0 0 1-2.25-2.25V1.687a.188.188 0 0 0-.188-.187H6.75a3 3 0 0 0-3 3v15a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-8.813a.188.188 0 0 0-.188-.187ZM15.75 18h-7.5a.75.75 0 1 1 0-1.5h7.5a.75.75 0 1 1 0 1.5Zm0-3.75h-7.5a.75.75 0 1 1 0-1.5h7.5a.75.75 0 1 1 0 1.5Z"></path>
                                                                                                <path d="m19.65 8.839-6.74-6.741a.093.093 0 0 0-.16.066v6.085a.75.75 0 0 0 .75.75h6.085a.094.094 0 0 0 .066-.16Z"></path>
                                                                                            </svg>
                                                                                        </RenderIf>
                                                                                        {/* </span> */}
                                                                                    </>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                        {/* info icon */}
                                                                        {/* <Button onClick={() => handleReadMoreClick(item)}> */}
                                                                        <svg
                                                                            width="21"
                                                                            height="21"
                                                                            viewBox="0 0 21 21"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="m-0"
                                                                            onClick={() => handleReadMoreClick(item)}
                                                                        >
                                                                            <circle cx="10.9883" cy="10.293" r="7.5" stroke="#333333" stroke-width="1.66667" />
                                                                            <path
                                                                                d="M11.4049 6.54313C11.4049 6.77325 11.2183 6.9598 10.9882 6.9598C10.7581 6.9598 10.5715 6.77325 10.5715 6.54313C10.5715 6.31301 10.7581 6.12646 10.9882 6.12646C11.2183 6.12646 11.4049 6.31301 11.4049 6.54313Z"
                                                                                fill="#333333"
                                                                                stroke="#333333"
                                                                                stroke-width="0.833333"
                                                                            />
                                                                            <path d="M10.9883 14.4598V8.62646" stroke="#333333" stroke-width="1.66667" />
                                                                        </svg>
                                                                        {/* </Button> */}
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
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{ borderBottom: "none" }} />
                <Modal.Body>
                    <Image src={modalContent.imgUrl} alt={modalContent.name} />
                    <h2 className="d-flex justify-content-center mt-3">{modalContent.name}</h2>
                    <p className="d-flex justify-content-center mt-3">{modalContent.description}</p>
                </Modal.Body>
            </Modal>
        </section>
    );
}
