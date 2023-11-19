import { useAuth } from "@/contexts/AuthContext";
import { asyncGenerateProofsByEmail, asyncGetContentEventLogs } from "@/services/product/product.service";
import { cloneDeep } from "lodash";

import RenderIf from "@/components/ConditionalRender/RenderIf";
import CommonUtility from "@/utils/common.utils";
import { getUrlVars } from "@/utils/globalFunctions";
import { ToastMessage } from "@/utils/toastMessage.utils";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Tab, Table, Tabs } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { MagnifyingGlass } from "react-loader-spinner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import style from "../components/DemoPage/demo-page.module.scss";

const fetchInterval = 5000;
const shouldStopFetching = (data) => {
    const routerData = getUrlVars();
    if (CommonUtility.isNotEmpty(routerData?.filters)) {
        const appliedFiltersLength = routerData.filters.split(",").length;
        return data?.operationStatus && Object.keys(data?.operationStatus).length == appliedFiltersLength;
        // return data?.featureStatus && Object.keys(data?.featureStatus).length > 0;
    }
    // return data?.featureStatus && Object.keys(data?.featureStatus).length > 0;
};

function findFalseValueKeysV2(obj1, obj2) {
    const falseValueKeys = Object.keys(obj1).filter((key) => obj1[key] === false);
    const matchingKeys = falseValueKeys.filter((key) => obj2.hasOwnProperty(key));
    return matchingKeys;
}

function getMatchingValues(data) {
    console.log("data: ", data);
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
        console.log("matchingValues: ", matchingValues);
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

export default function DemoPage() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const { user, checkAuthRouteV2 } = useAuth();
    const [isFetchingState, setIsFetchingState] = useState(true);
    // const [eventLogData, setEventLogData] = useState({
    //   videoId: "V490787171680137_sams@trek.com_URL_61743",
    //   userId: "sams@trek.com",
    //   complete: false,
    //   requestType: "URL",
    //   eventStartTime: "2023-10-09T07:06:21.797",
    //   processExitStatus: false,
    //   startTime: "2023-10-09T07:06:21.797",
    //   eventLog: {
    //     A: {
    //       modelId: "A",
    //       webFeatureKey: "Nudity",
    //       eventId:
    //         "sams@trek.com_V490787171680137_sams@trek.com_URL_61743_A_2023-10-09T07:06:23:675548_2023-10-09T07:06:29:651765",
    //       processingStartTime: "2023-10-09T07:06:23:675548",
    //       processingEndTime: "2023-10-09T07:06:29:651765",
    //       report: {
    //         imageUrls: [],
    //         clipUrls: [],
    //         videoUrls: [],
    //         documentReport: {
    //           report: {
    //             Model: "Success",
    //             Model_Name: "Nudity",
    //             InputVideoUrl:
    //               "https://mediafirewall.s3.ap-south-1.amazonaws.com/inputvideos/half_nude_1.png",
    //             TotalFramesProcessed: "1",
    //             "Video processing time in minutes": "0.09960",
    //           },
    //         },
    //       },
    //       operations: 1,
    //     },
    //     2: {
    //       modelId: "2",
    //       webFeatureKey: "Type",
    //       eventId:
    //         "sams@trek.com_V490787171680137_sams@trek.com_URL_61743_2_2023-10-09T07:06:45:357037_2023-10-09T07:06:45:357338",
    //       processingStartTime: "2023-10-09T07:06:45:357037",
    //       processingEndTime: "2023-10-09T07:06:45:357338",
    //       report: {
    //         imageUrls: [],
    //         clipUrls: [],
    //         videoUrls: [],
    //         documentReport: {
    //           report: {
    //             Model: "Success",
    //             InputVideoUrl:
    //               "https://mediafirewall.s3.ap-south-1.amazonaws.com/inputvideos/half_nude_1.png",
    //             "Image Quality": "Bad",
    //             "Total Frames processed": "0",
    //             "Video processing time in minutes": "0.00",
    //           },
    //         },
    //       },
    //       operations: 0,
    //     },
    //   },
    //   operations: 1,
    //   modelStatus: {
    //     A: false,
    //     Nudity: false,
    //     2: false,
    //     Type: false,
    //   },
    //   featureStatus: {},
    //   video: {
    //     inputVideoURL:
    //       "https://mediafirewall.s3.ap-south-1.amazonaws.com/inputvideos/half_nude_1.png",
    //     videoSizeInKB: 0,
    //     videoSizeInMB: 0,
    //     videoDurationInSeconds: 0,
    //     type: "IMAGE",
    //     frames: 0,
    //     fps: 0,
    //   },
    // });
    const [eventLogData, setEventLogData] = useState(null);
    console.log("eventLogData: ", eventLogData);
    // const [eventLogDataV2, setEventLogDataV2] = useState(null);

    const [selectedOption, setSelectedOption] = useState("email"); // Default option is 'email'
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    // useEffect(() => {
    //     if (eventLogDataV2 && CommonUtility.isNotEmptyObject(eventLogDataV2) && eventLogDataV2.hasOwnProperty("eventLogsV2")) {
    // const cloneEventDataV2 = cloneDeep(eventLogDataV2);
    // delete cloneEventDataV2["eventLogsV2"];
    // setEventLogDataV2(cloneEventDataV2);
    //     }
    // }, [eventLogDataV2]);
    useEffect(() => {
        const { isActive, route } = checkAuthRouteV2();

        if (!isActive) {
            Router.push(route);
            return;
        }
        let isFetching = true;
        setIsFetchingState(true);

        const fetchData = async () => {
            while (isFetching && router.query.videoId && CommonUtility.isNotEmpty(router.query.videoId)) {
                try {
                    const response = await asyncGetContentEventLogs(
                        user?.userDetails?.email, // "sams@trek.com",
                        encodeURIComponent(router.query.videoId),
                        user?.api_secret
                    );

                    if (response.isSuccess) {
                        const resData = response.data;
                        console.log("response.data: ", response.data);
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
                        <div onClick={() => !isFetchingState && router.push("/network-blog")} style={{ cursor: isFetchingState ? "not-allowed" : "pointer" }}>
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
                            <Tabs defaultActiveKey="table" className={` ${style.upload__main__tab}`} id="">
                                <Tab eventKey="table" className="pt-3" title="Table">
                                    <Col lg={12}>
                                        <section>
                                            <RenderIf isTrue={!isFetchingState && !CommonUtility.isValidArray(Object.keys(getMatchingValues(eventLogData)))}>
                                                <>
                                                    <Table bordered>
                                                        <thead>
                                                            <tr style={{ background: "#7b5b9e", color: "#fff" }}>
                                                                <th>#</th>
                                                                <th>Filter</th>
                                                                <th>File</th>
                                                                <th>Request Type</th>
                                                                <th>No Of Operations</th>
                                                                <th>Response</th>
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
                                                                    <td className="d-flex justify-content-center align-items-center gap-2">
                                                                        <span style={{ color: "rgb(40,201,55)" }}>Safe Content</span>
                                                                        <img loading="lazy" className="lazyload" src="/images/svgs/correct.svg" style={{ width: "16px", height: "16px" }} />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </>
                                            </RenderIf>
                                            <RenderIf isTrue={CommonUtility.isValidArray(Object.keys(getMatchingValues(eventLogData)))}>
                                                <Table bordered>
                                                    <thead>
                                                        <tr style={{ background: "#7b5b9e", color: "#fff" }}>
                                                            <th>#</th>
                                                            <th>Filter</th>
                                                            <th>File</th>
                                                            <th>Request Type</th>
                                                            <th>No Of Operations</th>
                                                            <th>Response</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Object.keys(getMatchingValues(eventLogData)).map((key, index) => {
                                                            console.log("key: ", key);
                                                            const item = eventLogData.eventLogsV2[key];
                                                            console.log("item: ", item);
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
                                                                    <RenderIf isTrue={item.isSuccess}>
                                                                        <td className="d-flex justify-content-between align-items-center gap-2">
                                                                            <span style={{ color: "rgb(40,201,55)" }}>Safe Content</span>
                                                                            <img loading="lazy" className="lazyload" src="/images/svgs/correct.svg" style={{ width: "16px", height: "16px" }} />
                                                                        </td>
                                                                    </RenderIf>
                                                                    <RenderIf isTrue={!item.isSuccess}>
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
                                                                    </RenderIf>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </RenderIf>
                                            <RenderIf isTrue={isFetchingState}>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <MagnifyingGlass height="60" width="60" color="#7B5B9E" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={isFetchingState} />
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
                        </Row>
                    </Col>

                    <Col lg={4} style={{ maxHeight: "400px" }}>
                        <RenderIf isTrue={CommonUtility.isValidArray(Object.keys(getMatchingValuesV2(eventLogData)))}>
                            <Card
                                className="box_show_msg h-100 shadow-lg border-primary rounded-4 d-flex justify-content-center align-items-center"
                                style={{
                                    maxHeight: "350px; !important",
                                }}
                            >
                                <div className="p-5 m-3 text-center">
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
                    </Col>
                </Row>
            </Container>
            {renderGenerateProofModal()}
        </div>
    );
}
