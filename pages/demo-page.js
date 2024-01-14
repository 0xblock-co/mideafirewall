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
const maxTimeout = 180000; // 2 minute in milliseconds

const shouldStopFetching = (data) => {
    const routerData = getUrlVars();
    if (CommonUtility.isNotEmpty(routerData?.filters)) {
        const appliedFiltersLength = routerData.filters.split(",").length;

        if (data?.errorLog || data?.errorLog_v2) {
            return true;
        }
        //         if (data?.processStatus && CommonUtility.isNotEmptyObject(data?.processStatus)) {
        //             return data?.processStatus?.complete && data?.processStatus?.inProcess == 0;
        //         }
        return data?.operationsPerFeature && Object.keys(data?.operationsPerFeature).length == appliedFiltersLength;
    }
};

function findFalseValueKeysV2(obj1, obj2) {
    const falseValueKeys = Object.keys(obj1).filter((key) => obj1[key] === false);
    const matchingKeys = falseValueKeys.filter((key) => obj2.hasOwnProperty(key));
    return matchingKeys;
}

function getMatchingValues(data) {
    if (data && data.processStatus?.featureStatus && data?.eventLog && data?.operationsPerFeature) {
        const { processStatus, eventLog, operationsPerFeature } = data;
        const matchingValues = {};
        const featureStatus = processStatus?.featureStatus;
        for (const key in featureStatus) {
            if (featureStatus[key] === true) {
                Object.keys(eventLog) &&
                    Object.keys(eventLog)?.length > 0 &&
                    Object.keys(eventLog).map((eventLogKey) => {
                        if (eventLog[eventLogKey]?.webFeatureKey == key) {
                            matchingValues[key] = eventLog[eventLogKey];
                            matchingValues[key].isSuccess = false;
                        }
                    });
                // if (eventLog[key]) {
                //     matchingValues[key] = eventLog[key];
                //     matchingValues[key].isSuccess = false;
                // }
            } else {
                const falseValueKeys = findFalseValueKeysV2(featureStatus, operationsPerFeature);
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
    if (data && data?.processStatus?.featureStatus) {
        const { processStatus, eventLog, operationsPerFeature } = data;

        const matchingValues = {};
        const featureStatus = processStatus?.featureStatus;
        for (const key in featureStatus) {
            if (featureStatus[key] === true) {
                Object.keys(eventLog) &&
                    Object.keys(eventLog)?.length > 0 &&
                    Object.keys(eventLog).map((eventLogKey) => {
                        if (eventLog[eventLogKey]?.webFeatureKey == key) {
                            matchingValues[key] = eventLog[eventLogKey];
                            matchingValues[key].isSuccess = false;
                        }
                    });
                // if (eventLog[key]) {
                //     matchingValues[key] = eventLog[key];
                //     matchingValues[key].isSuccess = false;
                //
                // }
            } else {
                const falseValueKeys = findFalseValueKeysV2(featureStatus, operationsPerFeature);
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

function getMatchingValuesV2(data, isFetchingState) {
    if (data && data?.processStatus?.featureStatus && data.eventLog && data.operationsPerFeature) {
        const routerData = getUrlVars();
        if (CommonUtility.isNotEmpty(routerData?.filters)) {
            const appliedFiltersLength = routerData.filters.split(",").length;
            if (data?.operationsPerFeature && (Object.keys(data?.operationsPerFeature).length == appliedFiltersLength || !isFetchingState)) {
                const { processStatus, eventLog } = data;
                const matchingValues = {};
                const featureStatus = processStatus?.featureStatus;
                for (const key in featureStatus) {
                    if (featureStatus[key] === true) {
                        Object.keys(eventLog) &&
                            Object.keys(eventLog)?.length > 0 &&
                            Object.keys(eventLog).map((eventLogKey) => {
                                if (eventLog[eventLogKey]?.webFeatureKey == key) {
                                    matchingValues[key] = eventLog[eventLogKey];
                                }
                            });
                        // if (eventLog[key]) {
                        //     matchingValues[key] = eventLog[key];
                        // }
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
            let responseData = eventLogData;
            while (isFetching && router.query.videoId && CommonUtility.isNotEmpty(router.query.videoId)) {
                try {
                    const response = await asyncGetContentEventLogs(
                        user?.userDetails?.email, // "sams@trek.com",
                        encodeURIComponent(router.query.videoId),
                        user?.api_secret
                    );

                    if (response.isSuccess) {
                        const resData = response.data;
                        if (CommonUtility.isNotEmptyObject(resData) && (resData?.errorLog || resData?.errorLog_v2)) {
                            isFetching = false;
                            setIsFetchingState(false);
                        }
                        // ToastMessage.success("Uploaded successfully.");
                        const updatedEventLogObj = getMatchingValuesV3(resData);
                        resData.eventLogsV2 = updatedEventLogObj;
                        responseData = resData;
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
                    // if (responseData && responseData?.processStatus?.totalProcessingFeatures !== responseData?.processStatus?.completedProcesses) {
                    if (responseData && (responseData?.processStatus?.totalProcessingFeatures !== responseData?.processStatus?.completedProcesses || responseData?.processStatus?.inProcess > 0)) {
                        const routerDataA = getUrlVars();
                        const routerData = router?.query?.sf_id || routerDataA.sf_id;
                        const totalSelectedFeatures = routerData?.split(",") || [];
                        const notFilteredFeatures = totalSelectedFeatures.filter((item) => !responseData.processStatus.featureStatus.hasOwnProperty(item)).toString();

                        const createFeatureObject = (initialValue) =>
                            totalSelectedFeatures
                                .filter((item) => !responseData.processStatus.featureStatus.hasOwnProperty(item))
                                .reduce((acc, feature) => {
                                    acc[feature] = initialValue;
                                    return acc;
                                }, {});

                        const objPreparation = totalSelectedFeatures
                            .filter((item) => !responseData.processStatus.featureStatus.hasOwnProperty(item))
                            .reduce((acc, feature) => {
                                acc[feature] = {
                                    webFeatureKey: feature,
                                    eventId: "",
                                    isSuccess: false,
                                    processingStartTime: "",
                                    processingEndTime: "",
                                    isTimeout: true,
                                    report: {
                                        imageUrls: [],
                                        clipUrls: [],
                                        videoUrls: [],
                                        documentReport: {
                                            report: {
                                                Model: "False",
                                                InputVideoUrl: "https://mediafirewall.s3.ap-south-1.amazonaws.com/inputvideos/half_nude_1.png",
                                                TotalFramesProcessed: "0",
                                                "Video processing time in minutes": "0",
                                            },
                                        },
                                    },
                                };
                                return acc;
                            }, {});

                        const objPreparation2 = createFeatureObject(false);
                        const objPreparation3 = createFeatureObject("99999");
                        setEventLogData({
                            ...responseData,
                            eventLogsV2: {
                                ...responseData.eventLogsV2,
                                ...objPreparation,
                            },
                            processStatus: {
                                ...responseData.processStatus,
                                featureStatus: {
                                    ...responseData.processStatus.featureStatus,
                                    ...objPreparation2,
                                },
                            },
                            operationsPerFeature: {
                                ...responseData.operationsPerFeature,
                                ...objPreparation3,
                            },
                            errorLog_v2: {
                                error: "NOT_PROCESS_COMPLETED",
                                errorCode: "9001",
                                description: `${notFilteredFeatures} could not be processed. Please contact the administrator for assistance`,
                            },
                        });
                        return;
                    }
                    setEventLogData({
                        ...responseData,
                        errorLog_v2: {
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
    const handleDownload = async () => {
        // Fetch the JSON data from the server
        const data = returnJsonFormatRes();

        // Create a Blob containing the JSON data
        const blob = new Blob([data], { type: "application/json" });

        // Create a link element and trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "response_mfw_moderation.json";
        link.click();
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
                    <p className="fw-semibold mb-2">
                        <div className="d-flex flex-column justify-content-center">
                            <span>
                                {" "}
                                Currently Selected filters are{" "}
                                <span style={{ fontSize: "18px" }}>
                                    <b> {router?.query?.filters}</b>
                                </span>
                                .{" "}
                            </span>
                        </div>
                    </p>
                    <p className="fw-semibold mb-2">
                        <div className="d-flex flex-column justify-content-center">
                            <span style={{ fontSize: "14px" }}>
                                Please use reference ID
                                <span style={{ fontSize: "16px" }}>
                                    {" "}
                                    <b>&apos;{router?.query?.videoId}&apos;</b>{" "}
                                </span>
                                for any references.{" "}
                            </span>
                        </div>
                    </p>

                    <Col lg={8}>
                        <Row>
                            {(CommonUtility.doesKeyExist(eventLogData, "errorLog_v2") || CommonUtility.doesKeyExist(eventLogData, "errorLog")) && (
                                <div className="mt-2 mb-2">
                                    <span style={{ color: "red", marginRight: "3px" }}>
                                        <b>Error:</b>
                                    </span>
                                    <br />
                                    {eventLogData?.errorLog_v2?.description || eventLogData?.errorLog?.description || "The size of the URL is exceeding the limit of 50 MB"}
                                </div>
                            )}

                            {!CommonUtility.doesKeyExist(eventLogData, "errorLog") && (
                            <Tabs defaultActiveKey="table" className={`table table-fit  ${style.upload__main__tab}`} id="">
                                <Tab eventKey="table" className="pt-3" title="Table">
                                    <Col lg={12}>
                                        <section>
                                            <RenderIf isTrue={!CommonUtility.isValidArray(Object.keys(getMatchingValues(eventLogData)))}>
                                                <>
                                                    <div style={{ whiteSpace: "nowrap" }}>
                                                        <Table bordered responsive>
                                                            <thead>
                                                                <tr style={{ background: "#7b5b9e", color: "#fff" }}>
                                                                    <th>#</th>
                                                                    <th>Filter</th>
                                                                    <th>File</th>
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
                                                                    <th>Request Type</th>
                                                                    <th>No Of Operations</th>
                                                                    <th>Reference Id</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {eventLogData &&
                                                                    CommonUtility.isNotEmpty(router.query.sf_id) &&
                                                                    router.query.sf_id.split(",").map((filter, index) => {
                                                                        const operationCount = eventLogData?.operationsPerFeature.hasOwnProperty(filter)
                                                                            ? eventLogData?.operationsPerFeature[filter]
                                                                            : 0;

                                                                        return (
                                                                            operationCount > 0 && (
                                                                                <tr key={index}>
                                                                                    <th scope="row">{index + 1}</th>
                                                                                    <td>{filter}</td>
                                                                                    <td>
                                                                                        <Link href={eventLogData.video.inputVideoURL} target="_blank">
                                                                                            {eventLogData?.video?.videoName || "Uploaded Link"}
                                                                                        </Link>
                                                                                    </td>
                                                                                    <RenderIf isTrue={isTaggingModelV2 === 1}>
                                                                                        <td style={{ overflowX: "auto", maxWidth: "160px" }}>Tag</td>
                                                                                    </RenderIf>

                                                                                    <RenderIf isTrue={isTaggingModelV2 === 3}>
                                                                                        <>
                                                                                            {operationCount !== "99999" ? (
                                                                                                <td className="d-flex justify-content-center align-items-center gap-2">
                                                                                                    {CommonUtility.doesKeyExist(eventLogData, "errorLog_v2") &&
                                                                                                    (eventLogData?.errorLog_v2?.errorCode !== "9000" || eventLogData?.errorLog_v2?.errorCode !== "9001") ? (
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
                                                                                                        <>
                                                                                                            <span style={{ color: "rgb(40,201,55)" }}>Safe Content</span>
                                                                                                            <img
                                                                                                                loading="lazy"
                                                                                                                className="lazyload"
                                                                                                                src="/images/svgs/correct.svg"
                                                                                                                style={{ width: "16px", height: "16px" }}
                                                                                                                alt="Correct"
                                                                                                            />
                                                                                                        </>
                                                                                                    )}
                                                                                                </td>
                                                                                            ) : (
                                                                                                <td className="d-flex justify-content-center align-items-center gap-2">
                                                                                                    <>
                                                                                                        <span style={{ color: "gray" }}>Timeout</span>
                                                                                                        <svg width="20" height="20" fill="gray" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                                                                                                            <path d="M9.96 2.4a.6.6 0 1 0 0 1.2h.6v1.284a8.401 8.401 0 1 0 5.742 15.383A8.4 8.4 0 0 0 18.109 7.7a.56.56 0 0 0 .015-.015l.425-.425.424.425a.6.6 0 1 0 .848-.848l-1.697-1.698a.6.6 0 1 0-.848.848l.425.425-.425.425a.611.611 0 0 0-.014.014 8.368 8.368 0 0 0-4.301-1.965V3.6h.6a.6.6 0 0 0 0-1.2h-3.6Zm2.4 6.72v4.08a.6.6 0 0 1-.6.6h-4.2a.6.6 0 1 1 0-1.2h3.6V9.12a.6.6 0 1 1 1.2 0Z"></path>
                                                                                                        </svg>
                                                                                                    </>
                                                                                                </td>
                                                                                            )}

                                                                                            <td style={{ overflowX: "auto", maxWidth: "160px" }}>Tag</td>
                                                                                        </>
                                                                                    </RenderIf>
                                                                                    <RenderIf isTrue={isTaggingModelV2 === 2 || isTaggingModelV2 === 4}>
                                                                                        {operationCount !== "99999" ? (
                                                                                            <td className="d-flex justify-content-center align-items-center gap-2">
                                                                                                {CommonUtility.doesKeyExist(eventLogData, "errorLog_v2") &&
                                                                                                (eventLogData?.errorLog_v2?.errorCode !== "9000" || eventLogData?.errorLog_v2?.errorCode !== "9001") ? (
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
                                                                                                    <>
                                                                                                        <span style={{ color: "rgb(40,201,55)" }}>Safe Content</span>
                                                                                                        <img
                                                                                                            loading="lazy"
                                                                                                            className="lazyload"
                                                                                                            src="/images/svgs/correct.svg"
                                                                                                            style={{ width: "16px", height: "16px" }}
                                                                                                            alt="Correct"
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </td>
                                                                                        ) : (
                                                                                            <>
                                                                                                <td className="d-flex justify-content-between align-items-center gap-2">
                                                                                                    <>
                                                                                                        <span style={{ color: "gray" }}>Timeout</span>
                                                                                                        <svg width="20" height="20" fill="gray" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                                                                                                            <path d="M9.96 2.4a.6.6 0 1 0 0 1.2h.6v1.284a8.401 8.401 0 1 0 5.742 15.383A8.4 8.4 0 0 0 18.109 7.7a.56.56 0 0 0 .015-.015l.425-.425.424.425a.6.6 0 1 0 .848-.848l-1.697-1.698a.6.6 0 1 0-.848.848l.425.425-.425.425a.611.611 0 0 0-.014.014 8.368 8.368 0 0 0-4.301-1.965V3.6h.6a.6.6 0 0 0 0-1.2h-3.6Zm2.4 6.72v4.08a.6.6 0 0 1-.6.6h-4.2a.6.6 0 1 1 0-1.2h3.6V9.12a.6.6 0 1 1 1.2 0Z"></path>
                                                                                                        </svg>
                                                                                                    </>
                                                                                                </td>
                                                                                            </>
                                                                                        )}
                                                                                    </RenderIf>
                                                                                    <td>{eventLogData?.requestType}</td>
                                                                                    <td>{operationCount !== "99999" ? operationCount : "0"}</td>
                                                                                    <td>{eventLogData?.videoId}</td>
                                                                                </tr>
                                                                            )
                                                                        );
                                                                    })}
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
                                                                <th>Request Type</th>
                                                                <th>No Of Operations</th>
                                                                <th>Reference Id</th>
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
                                                                        <RenderIf isTrue={isTaggingModelV2 === 1}>
                                                                            {item.isSuccess ? (
                                                                                <td>
                                                                                    {CommonUtility.isValidArray(tagsList) &&
                                                                                        tagsList.map((tag) => <span key={tag}>{CommonUtility.toTitleCase(tag || "")}</span>)}
                                                                                </td>
                                                                            ) : (
                                                                                <td style={{ overflowX: "auto", maxWidth: "160px" }}>
                                                                                    {item?.isTimeout !== true ? (
                                                                                        <>
                                                                                            <span style={{ wordBreak: "break-word" }}>
                                                                                                {CommonUtility.isValidArray(tagsList) ? <>{item?.report?.documentReport?.report?.Tag}</> : "--"}
                                                                                            </span>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <span style={{ color: "gray" }}>Timeout</span>
                                                                                            <svg width="20" height="20" fill="gray" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.96 2.4a.6.6 0 1 0 0 1.2h.6v1.284a8.401 8.401 0 1 0 5.742 15.383A8.4 8.4 0 0 0 18.109 7.7a.56.56 0 0 0 .015-.015l.425-.425.424.425a.6.6 0 1 0 .848-.848l-1.697-1.698a.6.6 0 1 0-.848.848l.425.425-.425.425a.611.611 0 0 0-.014.014 8.368 8.368 0 0 0-4.301-1.965V3.6h.6a.6.6 0 0 0 0-1.2h-3.6Zm2.4 6.72v4.08a.6.6 0 0 1-.6.6h-4.2a.6.6 0 1 1 0-1.2h3.6V9.12a.6.6 0 1 1 1.2 0Z"></path>
                                                                                            </svg>
                                                                                        </>
                                                                                    )}
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
                                                                                        <span>{CommonUtility.isValidArray(tagsList) ? <>{item?.report?.documentReport?.report?.Tag}</> : "--"}</span>
                                                                                    </td>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {item?.isTimeout !== true ? (
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
                                                                                    ) : (
                                                                                        <>
                                                                                            <td className="d-flex justify-content-between align-items-center gap-2">
                                                                                                <>
                                                                                                    <span style={{ color: "gray" }}>Timeout</span>
                                                                                                    <svg width="20" height="20" fill="gray" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path d="M9.96 2.4a.6.6 0 1 0 0 1.2h.6v1.284a8.401 8.401 0 1 0 5.742 15.383A8.4 8.4 0 0 0 18.109 7.7a.56.56 0 0 0 .015-.015l.425-.425.424.425a.6.6 0 1 0 .848-.848l-1.697-1.698a.6.6 0 1 0-.848.848l.425.425-.425.425a.611.611 0 0 0-.014.014 8.368 8.368 0 0 0-4.301-1.965V3.6h.6a.6.6 0 0 0 0-1.2h-3.6Zm2.4 6.72v4.08a.6.6 0 0 1-.6.6h-4.2a.6.6 0 1 1 0-1.2h3.6V9.12a.6.6 0 1 1 1.2 0Z"></path>
                                                                                                    </svg>
                                                                                                </>
                                                                                            </td>
                                                                                            <td style={{ overflowX: "auto", maxWidth: "160px" }}>
                                                                                                <span>
                                                                                                    {CommonUtility.isValidArray(tagsList) ? <>{item?.report?.documentReport?.report?.Tag}</> : "--"}
                                                                                                </span>
                                                                                            </td>
                                                                                        </>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </RenderIf>

                                                                        <RenderIf isTrue={isTaggingModelV2 === 2 || isTaggingModelV2 === 4}>
                                                                            {item.isSuccess ? (
                                                                                <td className="d-flex justify-content-between align-items-center gap-2">
                                                                                    <span style={{ color: "rgb(40,201,55)" }}>Safe Content</span>
                                                                                    <img loading="lazy" className="lazyload" src="/images/svgs/correct.svg" style={{ width: "16px", height: "16px" }} />
                                                                                </td>
                                                                            ) : (
                                                                                <>
                                                                                    {item?.isTimeout !== true ? (
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
                                                                                    ) : (
                                                                                        <td className="d-flex justify-content-between align-items-center gap-2">
                                                                                            <span style={{ color: "gray" }}>Timeout</span>
                                                                                            <svg width="20" height="20" fill="gray" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.96 2.4a.6.6 0 1 0 0 1.2h.6v1.284a8.401 8.401 0 1 0 5.742 15.383A8.4 8.4 0 0 0 18.109 7.7a.56.56 0 0 0 .015-.015l.425-.425.424.425a.6.6 0 1 0 .848-.848l-1.697-1.698a.6.6 0 1 0-.848.848l.425.425-.425.425a.611.611 0 0 0-.014.014 8.368 8.368 0 0 0-4.301-1.965V3.6h.6a.6.6 0 0 0 0-1.2h-3.6Zm2.4 6.72v4.08a.6.6 0 0 1-.6.6h-4.2a.6.6 0 1 1 0-1.2h3.6V9.12a.6.6 0 1 1 1.2 0Z"></path>
                                                                                            </svg>
                                                                                        </td>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </RenderIf>
                                                                        <td>{eventLogData?.requestType}</td>
                                                                        <td>
                                                                            {eventLogData.operationsPerFeature[item?.webFeatureKey] !== "99999"
                                                                                ? eventLogData.operationsPerFeature[item?.webFeatureKey]
                                                                                : 0}
                                                                        </td>
                                                                        <td>{eventLogData?.videoId}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </RenderIf>
                                            {isFetchingState ? (
                                                <div className="d-flex flex-column justify-content-center">
                                                    <MagnifyingGlass height="60" width="60" color="#7B5B9E" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={isFetchingState} />
                                                    <span>
                                                        {" "}
                                                        AI is actively verifying your information, and as of now,{" "}
                                                        <span style={{ fontSize: "18px" }}>
                                                            <b> {eventLogData?.processStatus?.completedProcesses || 0}</b>
                                                        </span>{" "}
                                                        out of the{" "}
                                                        <span style={{ fontSize: "18px" }}>
                                                            <b> {eventLogData?.processStatus?.totalProcessingFeatures || 0}</b>
                                                        </span>{" "}
                                                        filters have been successfully processed. Kindly wait for the completion of the task.
                                                    </span>
                                                    {/* AI is in the process of verifying your information. This may take a moment. */}
                                                </div>
                                            ) : (
                                                <div className="d-flex flex-column justify-content-center mt-2">
                                                    <span>
                                                        <b>Note:</b>
                                                    </span>
                                                    {eventLogData && eventLogData?.processStatus?.totalProcessingFeatures !== eventLogData?.processStatus?.completedProcesses ? (
                                                        <span>
                                                            {" "}
                                                            The AI has successfully verified the provided information using{" "}
                                                            <span style={{ fontSize: "18px" }}>
                                                                <b>{eventLogData?.processStatus?.completedProcesses || 0}</b>
                                                            </span>{" "}
                                                            out of the{" "}
                                                            <span style={{ fontSize: "18px" }}>
                                                                <b> {eventLogData?.processStatus?.totalProcessingFeatures || router?.query?.sf_id?.split(",").length || 0}</b>
                                                            </span>{" "}
                                                            selected filters.
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {" "}
                                                            The AI has successfully verified the provided information using all{" "}
                                                            <span style={{ fontSize: "18px" }}>
                                                                <b> {eventLogData?.processStatus?.totalProcessingFeatures || router?.query?.sf_id?.split(",").length || 0}</b>
                                                            </span>{" "}
                                                            selected filters.
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </section>
                                        {/* <section>
                                                {eventLogData?.processStatus?.completedProcesses}/{eventLogData?.processStatus?.totalProcessingFeatures}
                                            </section> */}
                                    </Col>
                                </Tab>
                                <Tab eventKey="json" className="pt-3" title="Json">
                                    <div className="d-flex justify-content-end">
                                        <Button variant="primary" className="rounded-pill button_primary py-2 px-4" onClick={() => handleDownload()}>
                                            <i className="fa fa-download" aria-hidden="true" style={{ marginRight: "5px" }}></i> Download JSON Response
                                        </Button>{" "}
                                    </div>
                                    {highlightCode(returnJsonFormatRes(), "json")}
                                </Tab>
                            </Tabs>
                            )}
                        </Row>
                    </Col>

                    <Col lg={4} style={{ maxHeight: "400px" }}>
                        {isTaggingModelV2 >= 2 && (
                            <RenderIf isTrue={CommonUtility.isValidArray(Object.keys(getMatchingValuesV2(eventLogData, isFetchingState)))}>
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
