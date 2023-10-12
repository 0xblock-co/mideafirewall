import { useAuth } from "@/contexts/AuthContext";
import {
  asyncGenerateProofsByEmail,
  asyncGetContentEventLogs,
} from "@/services/product/product.service";

import { checkAuthRoute } from "@/utils/globalFunctions";
import { ToastMessage } from "@/utils/toastMessage.utils";
import Router, { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import style from "../components/DemoPage/demo-page.module.scss";
import CommonUtility from "@/utils/common.utils";
import Link from "next/link";
import { MagnifyingGlass } from "react-loader-spinner";
import { Controller, useForm } from "react-hook-form";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import RenderIf from "@/components/ConditionalRender/RenderIf";

const shouldStopFetching = (data) => {
  return data?.modelStatus && Object.keys(data?.modelStatus).length > 0;
};

const fetchInterval = 5000; // Adjust the interval as needed

function getMatchingValues(data) {
  console.log("data: ", data);
  if (data && Object.keys(data.modelStatus) && Object.keys(data.eventLog)) {
    console.log("1");
    const { modelStatus, eventLog } = data;
    const matchingValues = {};
    console.log("modelStatus: ", modelStatus);
    for (const key in modelStatus) {
      console.log("jemish", eventLog[key], key);
      if (modelStatus[key] === true) {
        if (eventLog[key]) {
          matchingValues[key] = eventLog[key];
        }
      }
    }
    return { ...matchingValues };
  }
  return {};
}

export default function DemoPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const [isFetchingState, setIsFetchingState] = useState(true);
  const [eventLogData, setEventLogData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("email"); // Default option is 'email'
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    const { isActive, route } = checkAuthRoute();
    let isFetching = true;
    setIsFetchingState(true);

    if (!isActive) {
      Router.push(route);
      return;
    }

    const fetchData = async () => {
      while (
        isFetching &&
        router.query.videoId &&
        router.query.videoId !== undefined &&
        router.query.videoId !== ""
      ) {
        try {
          const response = await asyncGetContentEventLogs(
            "sams@trek.com",
            encodeURIComponent(router.query.videoId),
            "91owFp3rCq48IC7IIMFkBCnPshIsGPZC"
          );
          if (response.isSuccess) {
            console.log("response", response);
            // ToastMessage.success("Uploaded successfully.");
            setEventLogData(response.data);
          } else {
            ToastMessage.error("Failed to fetch event logs.");
          }

          if (response.data == null || shouldStopFetching(response.data)) {
            isFetching = false;
            setIsFetchingState(false);
          }
        } catch (error) {
          console.error("Error fetching event logs:", error);
          ToastMessage.error("An error occurred while fetching event logs.");
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
  }, []);
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("videoID", router.query.videoId);

      if (selectedOption === "both") {
        // If "both" is selected, send both email and WhatsApp data
        formData.append(
          "recipients",
          `Email: ${data.email}, WhatsApp: ${data.whatsapp}`
        );
      } else {
        // Otherwise, send data based on the selected option
        formData.append("recipients", data[selectedOption].toString());
      }

      const res = await asyncGenerateProofsByEmail(user.token, formData);

      if (res.isSuccess) {
        console.log("Proofs generated successfully:", res.data);
        ToastMessage.success("Proofs generated successfully.");
        reset();
      } else {
        console.error("Failed to generate proofs:", res.errorMessage);
        ToastMessage.error("Failed to generate proofs.");
      }
    } catch (error) {
      console.error("An error occurred while generating proofs:", error);
      ToastMessage.error("An error occurred while generating proofs.");
    }

    // Close the modal
    handleCloseModal();
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
              <Form.Control
                as="select"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="both">Both</option> {/* New option */}
              </Form.Control>
            </Form.Group>

            {(selectedOption === "email" || selectedOption === "both") && (
              <Form.Group
                controlId="email"
                className="mt-2 mb-2 position-relative"
              >
                <Form.Label>Email</Form.Label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      type="email"
                      placeholder="Enter your correct email"
                      className={`fs-6`}
                      {...field}
                    />
                  )}
                />
              </Form.Group>
            )}

            {(selectedOption === "whatsapp" || selectedOption === "both") && (
              <Form.Group
                className="mb-2 position-relative"
                controlId="whatsapp"
              >
                <Form.Label>WhatsApp</Form.Label>
                <Controller
                  name="whatsapp"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      placeholder="Enter your whatsApp number"
                      {...field}
                    />
                  )}
                />
              </Form.Group>
            )}
            <div className="text-center mt-4">
              <Button
                variant="primary"
                className="rounded-pill px-5 py-3"
                type="submit"
              >
                Save Changes
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
    <div className="py-5">
      <Container>
        <Row className="justify-content-center">
          <h1 className="fw-bold text-shadow mb-2">
            Content Moderation Logs & Verification
          </h1>
          <p className="fw-semibold mb-2">
            Gain a deeper understanding of our content moderation procedures by
            delving into the event logs.
          </p>
          <Col lg={8}>
            <Row>
              <Tabs
                defaultActiveKey="table"
                className={` ${style.upload__main__tab}`}
                id=""
              >
                <Tab eventKey="table" className="pt-3" title="Table">
                  <Col lg={8}>
                    <section>
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
                          We are verifying your records, kindly wait for a
                          moment.
                          {/* Your uploaded content is being processed. */}
                        </div>
                      </RenderIf>
                      <RenderIf
                        isTrue={
                          !isFetchingState &&
                          !CommonUtility.isValidArray(
                            Object.keys(getMatchingValues(eventLogData))
                          )
                        }
                      >
                        <>
                          <Table bordered>
                            <thead>
                              <tr
                                style={{ background: "#560f90", color: "#fff" }}
                              >
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
                                    <Link
                                      href={eventLogData.video.inputVideoURL}
                                      target="_blank"
                                    >
                                      {eventLogData?.video?.videoName}
                                    </Link>
                                  </td>
                                  <td>{eventLogData?.requestType}</td>
                                  <td>{eventLogData?.operations}</td>
                                  <td className="d-flex justify-content-center align-items-center">
                                    <img
                                      src="/images/svgs/wrong.svg"
                                      style={{ width: "30px", height: "30px" }}
                                    />
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                          {/* <b className="fw-bold text-shadow mb-2">Note:</b>
                  <br />
                  Unfortunately, we couldn't find any moderation events that
                  match your uploaded content. To explore different results,
                  consider using different moderation events with varying
                  content. If you'd like to retry, you can{" "}
                  <Link href={`/upload?filters=${router.query.filters}`}>
                    click here
                  </Link>{" "}
                  to return to the previous screen and reupload your documents. */}
                        </>
                      </RenderIf>
                      <RenderIf
                        isTrue={CommonUtility.isValidArray(
                          Object.keys(getMatchingValues(eventLogData))
                        )}
                      >
                        <Table bordered>
                          <thead>
                            <tr
                              style={{ background: "#560f90", color: "#fff" }}
                            >
                              <th>#</th>
                              <th>Filter</th>
                              <th>File</th>
                              <th>Request Type</th>
                              <th>No Of Operations</th>
                              <th>Response</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(getMatchingValues(eventLogData)).map(
                              (key) => {
                                const item = eventLogData.eventLog[key];
                                return (
                                  <tr key={key}>
                                    <th scope="row">1</th>
                                    <td>
                                      {
                                        item.report?.documentReport?.report
                                          ?.Model_Name
                                      }
                                    </td>
                                    <td>
                                      <Link
                                        href={eventLogData.video.inputVideoURL}
                                        target="_blank"
                                      >
                                        Uploaded Link
                                      </Link>
                                    </td>
                                    <td>{eventLogData?.requestType}</td>
                                    <td>{item.operations}</td>
                                    <td className="d-flex justify-content-center align-items-center">
                                      <img
                                        src="/images/svgs/wrong.svg"
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                        }}
                                      />
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </Table>
                      </RenderIf>
                    </section>
                  </Col>
                </Tab>
                <Tab eventKey="json" className="pt-3" title="Json">
                  {highlightCode(JSON.stringify(eventLogData, null, 2), "json")}
                </Tab>
              </Tabs>
            </Row>
          </Col>

          <Col lg={4}>
            <RenderIf
              isTrue={CommonUtility.isValidArray(
                Object.keys(getMatchingValues(eventLogData))
              )}
            >
              <Card
                className="box_show_msg h-100 shadow-lg border-primary rounded-4 d-flex justify-content-center align-items-center"
                style={{
                  maxHeight: "300px; !important",
                }}
              >
                <div className="p-5 m-3 text-center">
                  <h4 className="text_gredient text-shadow">
                    Curious to verify? Press the button to request proof.
                  </h4>
                  <Button
                    variant="primary"
                    className="bn13 btn-lg rounded-pill px-5 fs-6 mt-3"
                    onClick={handleShowModal}
                  >
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
