/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { asyncGenerateProofsByEmail, asyncGetContentEventLogs } from "@/services/product/product.service";
import { cloneDeep } from "lodash";

import RenderIf from "@/components/ConditionalRender/RenderIf";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import ProtectRoute from "@/contexts-v2/protectedRoute";
import CommonUtility from "@/utils/common.utils";
import { getUrlVars } from "@/utils/globalFunctions";
import { ToastMessage } from "@/utils/toastMessage.utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Tab, Table, Tabs } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { MagnifyingGlass } from "react-loader-spinner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import style from "../components/DemoPage/demo-page.module.scss";

const fetchInterval = 5000;
const maxTimeout = 120000; // 2 minute in milliseconds

const shouldStopFetching = (data) => {
    const routerData = getUrlVars();
    if (CommonUtility.isNotEmpty(routerData?.filters)) {
        const appliedFiltersLength = routerData.filters.split(",").length;

        if (data?.errorLog) {
            return true;
        }
        return data?.operationStatus && Object.keys(data?.operationStatus).length == appliedFiltersLength;
    }
};

function findFalseValueKeysV2(obj1, obj2) {
    const falseValueKeys = Object.keys(obj1).filter((key) => obj1[key] === false);
    const matchingKeys = falseValueKeys.filter((key) => obj2.hasOwnProperty(key));
    return matchingKeys;
}

function getMatchingValues(data) {
    if (data && data.featureStatus && data.eventLog) {
        const { featureStatus, eventLog, operationStatus } = data;
        const matchingValues = {};
        for (const key in featureStatus) {
            if (featureStatus[key] === true) {
                if (eventLog[key]) {
                    matchingValues[key] = eventLog[key];
                    matchingValues[key].isSuccess = false;
                }
            } else {
                const falseValueKeys = findFalseValueKeysV2(featureStatus, operationStatus);
                CommonUtility.isValidArray(falseValueKeys) &&
                    falseValueKeys.map((item) => {
                        matchingValues[item] = {
                            webFeatureKey: item,
                            eventId: "",
                            isSuccess: true,
                            processingStartTime: "",
                            processingEndTime: "",
                            report: {
                                imageUrls: [],
                                clipUrls: [],
                                videoUrls: [],
                                documentReport: {
                                    report: {
                                        Model: "Success",
                                        InputVideoUrl: data.video.inputVideoURL,
                                        TotalFramesProcessed: "",
                                        "Video processing time in minutes": "",
                                    },
                                },
                            },
                        };
                    });
            }
        }
        return { ...matchingValues };
    }
    return {};
}

function getMatchingValuesV3(data) {
    if (data && data.featureStatus && data.eventLog) {
        const { featureStatus, eventLog, operationStatus } = data;
        const matchingValues = {};
        for (const key in featureStatus) {
            if (featureStatus[key] === true) {
                if (eventLog[key]) {
                    matchingValues[key] = eventLog[key];
                    matchingValues[key].isSuccess = false;
                }
            } else {
                const falseValueKeys = findFalseValueKeysV2(featureStatus, operationStatus);
                CommonUtility.isValidArray(falseValueKeys) &&
                    falseValueKeys.map((item) => {
                        matchingValues[item] = {
                            webFeatureKey: item,
                            eventId: "",
                            isSuccess: true,
                            processingStartTime: "",
                            processingEndTime: "",
                            report: {
                                imageUrls: [],
                                clipUrls: [],
                                videoUrls: [],
                                documentReport: {
                                    report: {
                                        Model: "Success",
                                        InputVideoUrl: "https://mediafirewall.s3.ap-south-1.amazonaws.com/inputvideos/half_nude_1.png",
                                        TotalFramesProcessed: "",
                                        "Video processing time in minutes": "",
                                    },
                                },
                            },
                        };
                    });
            }
        }
        return { ...matchingValues };
    }
    return {};
}

function getMatchingValuesV2(data) {
    if (data && data.featureStatus && data.eventLog && data.operationStatus) {
        const routerData = getUrlVars();
        if (CommonUtility.isNotEmpty(routerData?.filters)) {
            const appliedFiltersLength = routerData.filters.split(",").length;
            if (data?.operationStatus && Object.keys(data?.operationStatus).length == appliedFiltersLength) {
                const { featureStatus, eventLog } = data;
                const matchingValues = {};
                for (const key in featureStatus) {
                    if (featureStatus[key] === true) {
                        if (eventLog[key]) {
                            matchingValues[key] = eventLog[key];
                        }
                    }
                }
                return { ...matchingValues };
            }
        }
    }
    return {};
}

const DemoPage = () => {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const { user } = useAuthV3();

    const [isFetchingState, setIsFetchingState] = useState(true);
    const [eventLogData, setEventLogData] = useState(null);
    const [selectedOption, setSelectedOption] = useState("email"); // Default option is 'email'
    const [isTaggingModelV2, setIsTaggingModelV2] = useState(0);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        let isFetching = true;
        setIsFetchingState(true);

        if (typeof window !== "undefined") {
            const routerData = getUrlVars();
            const data = router.query.filters || routerData.filters;
            if (CommonUtility.isNotEmpty(data)) {
                const payloadLength = data.split(",").length;
                if (payloadLength === 1) {
                    if (data.includes("Tagging")) {
                        setIsTaggingModelV2(1);
                    } else {
                        setIsTaggingModelV2(2);
                    }
                } else if (payloadLength >= 1) {
                    if (data.includes("Tagging")) {
                        setIsTaggingModelV2(3);
                    } else {
                        setIsTaggingModelV2(4);
                    }
                }
            }
        }

        const fetchData = async () => {
            const startTime = Date.now(); // Record the start time

            while (isFetching && router.query.videoId && CommonUtility.isNotEmpty(router.query.videoId)) {
                try {
                    const response = await asyncGetContentEventLogs(
                        user?.userDetails?.email, // "sams@trek.com",
                        encodeURIComponent(router.query.videoId),
                        user?.api_secret
                    );

                    if (response.isSuccess) {
                        const resData = response.data;
                        if (CommonUtility.isNotEmptyObject(resData) && resData?.errorLog) {
                            isFetching = false;
                            setIsFetchingState(false);
                        }
                        // ToastMessage.success("Uploaded successfully.");
                        const updatedEventLogObj = getMatchingValuesV3(resData);
                        resData.eventLogsV2 = updatedEventLogObj;
                        setEventLogData(resData);
                    } else {
                        ToastMessage.error("Failed to fetch event logs.");
                    }

                    if (response.data == null || shouldStopFetching(response.data)) {
                        isFetching = false;
                        setIsFetchingState(false);
                    }
                } catch (error) {
                    // ToastMessage.error("An error occurred while fetching event logs.");
                    isFetching = false;
                    setIsFetchingState(false);
                }

                const elapsedTime = Date.now() - startTime;
                if (elapsedTime >= maxTimeout) {
                    isFetching = false;
                    setIsFetchingState(false);
                    setEventLogData({
                        ...eventLogData,
                        errorLog: {
                            error: "MAX_TME_EXCEED",
                            errorCode: "9000",
                            description:
                                "Connection Issue: The operation couldn't be completed. Confirm your internet connection and retry. Moderation processes are typically quicker than what you're experiencing.",
                        },
                    });
                    // there is a problem with connecting to the servers please try again
                }
                await new Promise((resolve) => setTimeout(resolve, fetchInterval));
            }
        };

        fetchData();

        return () => {
            setIsFetchingState(false);
            isFetching = false;
        };
    }, [router]);

    const { control, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("videoID", router.query.videoId);

            if (selectedOption === "both") {
                // If "both" is selected, send both email and WhatsApp data
                formData.append("recipients", `Email: ${data.email}, WhatsApp: ${data.whatsapp}`);
            } else {
                // Otherwise, send data based on the selected option
                formData.append("recipients", data[selectedOption].toString());
            }

            const res = await asyncGenerateProofsByEmail(user.api_secret, formData);

            if (res.isSuccess) {
                if (selectedOption === "both") {
                    ToastMessage.success("Proofs are sent to email.");
                } else {
                    ToastMessage.success(`Proofs are sent to ${data[selectedOption].toString()}.`);
                }
                reset();
            } else {
                ToastMessage.error("Failed to generate proofs.");
            }
        } catch (error) {
            ToastMessage.error("An error occurred while generating proofs.");
        }

        // Close the modal
        handleCloseModal();
    };

    const returnJsonFormatRes = () => {
        if (eventLogData && CommonUtility.isNotEmptyObject(eventLogData) && eventLogData.hasOwnProperty("eventLogsV2")) {
            const cloneEventDataV2 = cloneDeep(eventLogData);
            delete cloneEventDataV2["eventLogsV2"];
            return JSON.stringify(cloneEventDataV2, null, 2);
        }
    };

    const renderGenerateProofModal = () => {
        return (
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Provide Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="selectOption">
                            <Form.Label>Select an option</Form.Label>
                            <Form.Control as="select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="email">Email</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="both">Both</option> {/* New option */}
                            </Form.Control>
                        </Form.Group>

                        {(selectedOption === "email" || selectedOption === "both") && (
                            <Form.Group controlId="email" className="mt-2 mb-2 position-relative">
                                <Form.Label>Email</Form.Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Form.Control type="email" placeholder="Enter your correct email" className={`fs-6`} {...field} />}
                                />
                            </Form.Group>
                        )}

                        {(selectedOption === "whatsapp" || selectedOption === "both") && (
                            <Form.Group className="mb-2 position-relative" controlId="whatsapp">
                                <Form.Label>WhatsApp</Form.Label>
                                <Controller
                                    name="whatsapp"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Form.Control type="text" placeholder="Enter your whatsApp number" {...field} />}
                                />
                            </Form.Group>
                        )}
                        <div className="text-center mt-4">
                            <Button variant="primary" className="rounded-pill px-5 py-3" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    };

    const highlightCode = useCallback((code, language) => {
        return (
            <SyntaxHighlighter style={oneDark} language={language?.toLowerCase()}>
                {code}
            </SyntaxHighlighter>
        );
    }, []);

    return (
        <div className="py-5" style={{ minHeight: "70vh" }}>
            <Container>
                <Row className="justify-content-center">
                    <div className="d-flex gap-2 p-1">
                        <div onClick={() => !isFetchingState && router.push("/features-list")} style={{ cursor: isFetchingState ? "not-allowed" : "pointer" }}>
                            <svg
                                width="46"
                                height="46"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M11.69 15.75 7.969 12l3.72-3.75"></path>
                                <path d="M8.486 12h7.546"></path>
                                <path d="M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z"></path>
                            </svg>
                        </div>
                        <h1 className="fw-bold text-shadow mb-2">Content Moderation Logs & Verification</h1>
                    </div>
                    <p className="fw-semibold mb-2">Gain a deeper understanding of our content moderation procedures by delving into the event logs.</p>
                    <Col lg={8}>
                        <Row>
                            {CommonUtility.doesKeyExist(eventLogData, "errorLog") && (
                                <div className="mt-2">
                                    <span style={{ color: "red", marginRight: "3px" }}>
                                        <b>Error:</b>
                                    </span>
                                    <br />
                                    {eventLogData?.errorLog?.description || "The size of the URL is exceeding the limit of 50 MB"}
                                </div>
                            )}

                            {!CommonUtility.doesKeyExist(eventLogData, "errorLog") && (
                                <Tabs defaultActiveKey="table" className={`table table-fit  ${style.upload__main__tab}`} id="">
                                    <Tab eventKey="table" className="pt-3" title="Table">
                                        <Col lg={12}>
                                            <section>
                                                <RenderIf isTrue={!isFetchingState && !CommonUtility.isValidArray(Object.keys(getMatchingValues(eventLogData)))}>
                                                    <>
                                                        <div style={{ whiteSpace: "nowrap" }}>
                                                            <Table bordered responsive>
                                                                <thead>
                                                                    <tr style={{ background: "#7b5b9e", color: "#fff" }}>
                                                                        <th>#</th>
                                                                        <th>Filter</th>
                                                                        <th>File</th>
                                                                        <th>Request Type</th>
                                                                        <th>No Of Operations</th>
                                                                        <RenderIf isTrue={isTaggingModelV2 === 1}>
                                                                            <th>Tags</th>
                                                                        </RenderIf>
                                                                        <RenderIf isTrue={isTaggingModelV2 === 3}>
                                                                            <th>Response</th>
                                                                            <th>Tags</th>
                                                                        </RenderIf>
                                                                        <RenderIf isTrue={isTaggingModelV2 === 2 || isTaggingModelV2 === 4}>
                                                                            <th>Response</th>
                                                                        </RenderIf>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {eventLogData && (
                                                                        <tr>
                                                                            <th scope="row">1</th>
                                                                            <td>{router.query.filters}</td>
                                                                            <td>
                                                                                <Link href={eventLogData.video.inputVideoURL} target="_blank">
                                                                                    {eventLogData?.video?.videoName}
                                                                                </Link>
                                                                            </td>
                                                                            <td>{eventLogData?.requestType}</td>
                                                                            <td>{eventLogData?.operations}</td>

                                                                            <RenderIf isTrue={isTaggingModelV2 === 1}>
                                                                                <td style={{ overflowX: "auto", maxWidth: "160px" }}>Tag</td>
                                                                            </RenderIf>

                                                                            <RenderIf isTrue={isTaggingModelV2 === 3}>
                                                                                <td className="d-flex justify-content-center align-items-center gap-2">
                                                                                    <span style={{ color: "rgb(40,201,55)" }}>Safe Content</span>
                                                                                    <img loading="lazy" className="lazyload" src="/images/svgs/correct.svg" style={{ width: "16px", height: "16px" }} />
                                                                                </td>
                                                                                <td style={{ overflowX: "auto", maxWidth: "160px" }}>Tag</td>
                                                                            </RenderIf>
                                                                            <RenderIf isTrue={isTaggingModelV2 === 2 || isTaggingModelV2 === 4}>
                                                                                <td className="d-flex justify-content-center align-items-center gap-2">
                                                                                    <span style={{ color: "rgb(40,201,55)" }}>Safe Content</span>
                                                                                    <img loading="lazy" className="lazyload" src="/images/svgs/correct.svg" style={{ width: "16px", height: "16px" }} />
                                                                                </td>
                                                                            </RenderIf>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </>
                                                </RenderIf>
                                                <RenderIf isTrue={CommonUtility.isValidArray(Object.keys(getMatchingValues(eventLogData)))}>
                                                    <div style={{ whiteSpace: "nowrap" }}>
                                                        <Table bordered responsive>
                                                            <thead>
                                                                <tr style={{ background: "#7b5b9e", color: "#fff" }}>
                                                                    <th>#</th>
                                                                    <th>Filter</th>
                                                                    <th>File</th>
                                                                    <th>Request Type</th>
                                                                    <th>No Of Operations</th>
                                                                    <RenderIf isTrue={isTaggingModelV2 === 1}>
                                                                        <th>Tags</th>
                                                                    </RenderIf>
                                                                    <RenderIf isTrue={isTaggingModelV2 === 3}>
                                                                        <th>Response</th>
                                                                        <th>Tags</th>
                                                                    </RenderIf>
                                                                    <RenderIf isTrue={isTaggingModelV2 === 2 || isTaggingModelV2 === 4}>
                                                                        <th>Response</th>
                                                                    </RenderIf>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Object.keys(getMatchingValues(eventLogData)).map((key, index) => {
                                                                    const item = eventLogData.eventLogsV2[key];
                                                                    const tagsList = item?.report?.documentReport?.report?.Tag?.split(",");
                                                                    return (
                                                                        <tr key={key}>
                                                                            <th scope="row">{index + 1}</th>
                                                                            <td>{item?.report?.documentReport?.report?.Model_Name || item?.webFeatureKey}</td>
                                                                            <td>
                                                                                <Link href={eventLogData.video.inputVideoURL} target="_blank">
                                                                                    Uploaded Link
                                                                                </Link>
                                                                            </td>
                                                                            <td>{eventLogData?.requestType}</td>
                                                                            <td>{eventLogData.operationStatus[item.webFeatureKey]}</td>
                                                                            <RenderIf isTrue={isTaggingModelV2 === 1}>
                                                                                {item.isSuccess ? (
                                                                                    <td>
                                                                                        dds
                                                                                        {CommonUtility.isValidArray(tagsList) &&
                                                                                            tagsList.map((tag) => <span key={tag}>{CommonUtility.toTitleCase(tag || "")}</span>)}
                                                                                    </td>
                                                                                ) : (
                                                                                    <td style={{ overflowX: "auto", maxWidth: "160px" }}>
                                                                                        <span style={{ wordBreak: "break-word" }}>
                                                                                            {CommonUtility.isValidArray(tagsList) ? <>{item?.report?.documentReport?.report?.Tag}</> : "--"}
                                                                                        </span>
                                                                                    </td>
                                                                                )}
                                                                            </RenderIf>

                                                                            <RenderIf isTrue={isTaggingModelV2 === 3}>
                                                                                {item.isSuccess ? (
                                                                                    <>
                                                                                        <td className="d-flex justify-content-between align-items-center gap-2">
                                                                                            {item.webFeatureKey !== "Tagging" ? (
                                                                                                <>
                                                                                                    <span style={{ color: "rgb(40,201,55)" }}>Safe Content</span>
                                                                                                    <img
                                                                                                        loading="lazy"
                                                                                                        className="lazyload"
                                                                                                        src="/images/svgs/correct.svg"
                                                                                                        style={{ width: "16px", height: "16px" }}
                                                                                                    />
                                                                                                </>
                                                                                            ) : (
                                                                                                "--"
                                                                                            )}
                                                                                        </td>
                                                                                        <td style={{ overflowX: "auto", maxWidth: "160px" }}>
                                                                                            <span>
                                                                                                {CommonUtility.isValidArray(tagsList) ? <>{item?.report?.documentReport?.report?.Tag}</> : "--"}
                                                                                            </span>
                                                                                        </td>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <td className="d-flex justify-content-between align-items-center gap-2">
                                                                                            {item.webFeatureKey !== "Tagging" ? (
                                                                                                <>
                                                                                                    <span style={{ color: "rgb(230,62,50)" }}>Unsafe Content</span>
                                                                                                    <img
                                                                                                        src="/images/svgs/wrong.svg"
                                                                                                        loading="lazy"
                                                                                                        className="lazyload"
                                                                                                        style={{
                                                                                                            width: "16px",
                                                                                                            height: "16px",
                                                                                                        }}
                                                                                                    />
                                                                                                </>
                                                                                            ) : (
                                                                                                "--"
                                                                                            )}
                                                                                        </td>
                                                                                        <td style={{ overflowX: "auto", maxWidth: "160px" }}>
                                                                                            <span>
                                                                                                {CommonUtility.isValidArray(tagsList) ? <>{item?.report?.documentReport?.report?.Tag}</> : "--"}
                                                                                            </span>
                                                                                        </td>
                                                                                    </>
                                                                                )}
                                                                            </RenderIf>

                                                                            <RenderIf isTrue={isTaggingModelV2 === 2 || isTaggingModelV2 === 4}>
                                                                                {item.isSuccess ? (
                                                                                    <td className="d-flex justify-content-between align-items-center gap-2">
                                                                                        <span style={{ color: "rgb(40,201,55)" }}>Safe Content</span>
                                                                                        <img
                                                                                            loading="lazy"
                                                                                            className="lazyload"
                                                                                            src="/images/svgs/correct.svg"
                                                                                            style={{ width: "16px", height: "16px" }}
                                                                                        />
                                                                                    </td>
                                                                                ) : (
                                                                                    <td className="d-flex justify-content-between align-items-center gap-2">
                                                                                        <span style={{ color: "rgb(230,62,50)" }}>Unsafe Content</span>
                                                                                        <img
                                                                                            src="/images/svgs/wrong.svg"
                                                                                            loading="lazy"
                                                                                            className="lazyload"
                                                                                            style={{
                                                                                                width: "16px",
                                                                                                height: "16px",
                                                                                            }}
                                                                                        />
                                                                                    </td>
                                                                                )}
                                                                            </RenderIf>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </RenderIf>
                                                <RenderIf isTrue={isFetchingState}>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <MagnifyingGlass
                                                            height="60"
                                                            width="60"
                                                            color="#7B5B9E"
                                                            ariaLabel="circles-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                            visible={isFetchingState}
                                                        />
                                                        AI is in the process of verifying your information. This may take a moment.
                                                        {/* We are verifying your records, kindly wait for a moment. */}
                                                    </div>
                                                </RenderIf>
                                            </section>
                                        </Col>
                                    </Tab>
                                    <Tab eventKey="json" className="pt-3" title="Json">
                                        {highlightCode(returnJsonFormatRes(), "json")}
                                    </Tab>
                                </Tabs>
                            )}
                        </Row>
                    </Col>

                    <Col lg={4} style={{ maxHeight: "400px" }}>
                        {isTaggingModelV2 >= 2 && (
                            <RenderIf isTrue={CommonUtility.isValidArray(Object.keys(getMatchingValuesV2(eventLogData)))}>
                                <Card
                                    className="box_show_msg h-100 shadow-lg border-primary rounded-4 d-flex justify-content-center align-items-center"
                                    style={{
                                        maxHeight: "350px; !important",
                                    }}
                                >
                                    <div className={`p-5 text-center m-3 `}>
                                        <h5 className="text_gredient text-shadow">
                                            Proofs for content moderation in the sent media, including clips and images, are now available for your review. <br /> <br />
                                            Click the button below to access and verify.
                                        </h5>
                                        <Button variant="primary" className="bn13 btn-lg rounded-pill px-5 fs-6 mt-3" onClick={handleShowModal}>
                                            Request Proof
                                        </Button>
                                    </div>
                                </Card>
                            </RenderIf>
                        )}
                    </Col>
                </Row>
            </Container>
            {renderGenerateProofModal()}
        </div>
    );
};

export default ProtectRoute(DemoPage);
