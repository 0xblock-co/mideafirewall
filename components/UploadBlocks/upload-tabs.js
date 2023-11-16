import Router, { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { contentUploadStaticObj } from "@/constants/global.constants";
import { useAuth } from "@/contexts/AuthContext";
import { UPLOAD_USING_CODE_STUBS } from "@/data";
import { asyncUploadContentByUrl, asyncUploadFileContent } from "@/services/product/product.service";
import CommonUtility from "@/utils/common.utils";
import { checkContentValidation } from "@/utils/contentUpload";
import { ToastMessage, newInfoAlert } from "@/utils/toastMessage.utils";
import { cloneDeep, findIndex } from "lodash";
import { useState } from "react";
import DropZoneComponent from "../DropZone";
import Loader from "../Loader";
import CodeBlock from "./CodeBlock";
import style from "./uploads.module.scss";

export default function UploadTabs() {
    const router = useRouter();
    const { user } = useAuth();

    const [maxFileUpload] = useState(1);
    const [isUploading, setIsUploading] = useState(false);
    const [contentData, setContentData] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [filePreviews, setFilePreviews] = useState([]);

    const onChangeContentData = async (fileData) => {
        if (fileData?.length > 0) {
            const cloneContentData = cloneDeep(contentData);
            if (fileData && fileData.length !== 0 && fileData.length > maxFileUpload && fileData.length + cloneContentData.length > maxFileUpload) {
                newInfoAlert("You can only upload 1 content per request.", "", "OK")
                    .then(() => {
                        setContentData([]);
                    })
                    .catch(() => {});
                return;
            }

            let newData = [];
            Array.from(fileData).map((data) => {
                newData.push(data);
            });
            if (newData && newData[0].type.includes("video")) {
                cloneContentData.splice(0);
                cloneContentData.push({ ...contentUploadStaticObj, index: 0 });
                cloneContentData[0].file = newData[0];
            } else {
                if (newData && newData.length > 0) {
                    const nullFileIndex = findIndex(cloneContentData, { file: null });
                    cloneContentData.splice(nullFileIndex, 1);
                    newData.map((file) => {
                        if (file?.type.includes("image")) {
                            if (cloneContentData.length < maxFileUpload) {
                                cloneContentData.push({
                                    ...contentUploadStaticObj,
                                    file,
                                    index: cloneContentData.length,
                                });
                            }
                        }
                    });
                }

                if (cloneContentData.length < maxFileUpload) {
                    cloneContentData.push({
                        ...contentUploadStaticObj,
                        index: cloneContentData.length,
                    });
                }
            }

            // check validation
            let validationResult = await checkContentValidation(cloneContentData, true);

            if (validationResult) {
                setContentData(cloneContentData);
            } else {
                setFilePreviews([]);
                setContentData([]);
            }
        } else {
            setContentData([]);
        }
    };

    // const handleOnClickUploadFilesV0 = async () => {
    //   // if (user.api_secret === "") {
    //   //   newInfoAlert(
    //   //     "Free quota exceeded",
    //   //     "Unlock additional features by subscribing to access extended operations beyond the current limit.",
    //   //     "OK",
    //   //     "warning"
    //   //   ).then(() => {
    //   //     router.push("/pricing");
    //   //   });
    //   //   return;
    //   // }
    //   await setIsUploading(true);
    //   if (CommonUtility.isValidArray(contentData)) {
    //     const cloneContentData = cloneDeep(contentData);
    //     const finalFIles = cloneContentData.filter((data) => data.file !== null);
    //     const response = await asyncUploadFileContent(
    //       { file: finalFIles[0].file },
    //       user?.userDetails?.email,
    //       {
    //         apikey: user?.api_secret,
    //         filters: router.query.filters,
    //       }
    //     );
    //     await setIsUploading(false);
    //     if (
    //       response?.isSuccess &&
    //       CommonUtility.isNotEmpty(response.data.videoId)
    //     ) {
    //       ToastMessage.success("Uploaded successfully.");
    //       setContentData([]);
    //       await setIsUploading(false);
    //       newInfoAlert(
    //         "Content Upload Successful",
    //         "Your content has been uploaded successfully. We will now proceed with moderation. If you wish to view proofs, please click the 'View Proofs' button below.",
    //         "View Proofs",
    //         "success"
    //       ).then(() => {
    //         router.push(
    //           `/demo-page?videoId=${response.data.videoId}&filters=${router.query.filters}`
    //         );
    //       });
    //       // const contentEventLogs = await asyncGetContentEventLogs(
    //       //   user.id,
    //       //   response.data.videoId,
    //       //   user.token
    //       // );
    //     } else {
    //       await setIsUploading(false);
    //     }
    //   } else if (imageUrl && router.query?.filters !== "") {
    //     const response = await asyncUploadContentByUrl(user?.userDetails?.email, {
    //       filters: router.query.filters,
    //       mediaUrl: imageUrl,
    //       apikey: user?.api_secret,
    //     });
    //     if (
    //       response.isSuccess &&
    //       CommonUtility.isNotEmpty(response.data.videoId)
    //     ) {
    //       await setIsUploading(false);
    //       ToastMessage.success("Uploaded successfully.");
    //       newInfoAlert(
    //         "Content Upload Successful",
    //         "Your content has been uploaded successfully. We will now proceed with moderation. If you wish to view proofs, please click the 'View Proofs' button below.",
    //         "View Proofs",
    //         "success"
    //       ).then(() => {
    //         router.push(
    //           `/demo-page?videoId=${response.data.videoId}&filters=${router.query.filters}`
    //         );
    //       });
    //       // const contentEventLogs = await asyncGetContentEventLogs(
    //       //   user.id,
    //       //   response.data.videoId,
    //       //   user.token
    //       // );
    //     } else {
    //       await setIsUploading(false);
    //     }
    //   } else {
    //     await setIsUploading(false);
    //     newInfoAlert(
    //       "Content Upload Needed",
    //       "To proceed, you need to either upload an image/video or provide a valid image/video URL. Please check that the necessary image/video content is included.",
    //       "OK",
    //       "error"
    //     );
    //   }
    //   await setIsUploading(false);
    // };
    const handleOnClickUploadFiles = async () => {
        try {
            await setIsUploading(true);

            if (CommonUtility.isValidArray(contentData)) {
                const cloneContentData = cloneDeep(contentData);
                const finalFiles = cloneContentData.filter((data) => data.file !== null);
                if (finalFiles.length === 0) {
                    throw new Error("No files selected for upload.");
                }
                const response = await asyncUploadFileContent({ file: finalFiles[0].file }, user?.userDetails?.email, {
                    apikey: user?.api_secret,
                    filters: router.query.filters,
                });

                if (response?.isSuccess && CommonUtility.isNotEmpty(response.data.videoId)) {
                    ToastMessage.success("Uploaded successfully.");
                    setContentData([]);
                    newInfoAlert(
                        "Content Upload Successful",
                        "Your content has been uploaded successfully. We will now proceed with moderation. If you wish to view proofs, please click the 'View Proofs' button below.",
                        "View Proofs",
                        "success"
                    ).then(() => {
                        router.push(`/demo-page?videoId=${response.data.videoId}&filters=${router.query.filters}`);
                    });
                } else {
                    throw new Error("Upload failed. Please try again.");
                }
            } else if (imageUrl && router.query?.filters !== "") {
                const response = await asyncUploadContentByUrl(user?.userDetails?.email, {
                    filters: router.query.filters,
                    mediaUrl: imageUrl,
                    apikey: user?.api_secret,
                });

                if (response.isSuccess && CommonUtility.isNotEmpty(response.data.videoId)) {
                    // ToastMessage.success("Uploaded successfully.");
                    newInfoAlert(
                        "Content Upload Successful",
                        "Your content has been uploaded successfully. We will now proceed with moderation. If you wish to view proofs, please click the 'View Proofs' button below.",
                        "View Proofs",
                        "success"
                    ).then(() => {
                        router.push(`/demo-page?videoId=${response.data.videoId}&filters=${router.query.filters}`);
                    });
                } else {
                    throw new Error("Upload failed. Please try again.");
                }
            } else {
                throw new Error("Invalid input. Please upload files or provide a valid image/video URL.");
            }
        } catch (error) {
            console.log("error: ", error);
            newInfoAlert(
                "Free quota exceeded",
                error?.message || "Demo user quota is exceeded :Please subscribe to the Free Tier to continue experiencing our services with Media Firewall",
                "OK",
                "error"
            ).then(() => {
                router.push("/pricing");
            });
            // console.error("Error during content upload:", error.message);
            // newInfoAlert("Content Upload Error", `An error occurred during content upload: ${error.message}`, "OK", "error");
        } finally {
            await setIsUploading(false);
        }
    };

    return (
        <>
            <div className={`bg-white my-4 rounded ${style.mdf__upload__tab}`}>
                <Tabs defaultActiveKey="web" className={`nav-fill ${style.upload__main__tab}`} id="">
                    <Tab eventKey="web" className="p-3" title="Web">
                        <div className="text-center">
                            <div className="text-center">
                                {/* <h3>Upload Your Files or Provide Image URLs </h3> */}
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="pills-url-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-url"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-url"
                                            aria-selected="true"
                                        >
                                            Paste a url
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-dropzone-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-dropzone"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-dropzone"
                                            aria-selected="false"
                                        >
                                            Upload Files
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-url" role="tabpanel" aria-labelledby="pills-url-tab">
                                        <Form.Group controlId="formFile" className="mt-4">
                                            <Form.Control type="text" placeholder="Input URL for analysis" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                                        </Form.Group>

                                        <Button onClick={handleOnClickUploadFiles} type="button" variant="primary" className="mt-3 py-2 px-5">
                                            Moderate
                                        </Button>
                                    </div>
                                    <div className="tab-pane fade" id="pills-dropzone" role="tabpanel" aria-labelledby="pills-dropzone-tab">
                                        <DropZoneComponent filePreviews={filePreviews} setFilePreviews={setFilePreviews} onContentDrop={(e) => onChangeContentData(e)} />

                                        <Button onClick={handleOnClickUploadFiles} type="button" variant="primary" className="mt-3 py-2 px-5">
                                            Upload
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="program" className="p-3" title="Program">
                        <CodeBlock codeData={UPLOAD_USING_CODE_STUBS} />
                    </Tab>

                    <Tab eventKey="amazon" className="p-3" title="Large Scale(Async channels)">
                        <div className="text-center"></div>
                        When it comes to moderating a large amount of media content, we recommend the use of asynchronous integration. Feel free to reach out to us if you have any questions or need
                        further information.
                        <br />
                        <Button onClick={() => Router.push("/contact-us")} type="button" variant="primary" className="mt-3 py-2 px-5">
                            Contact us
                        </Button>
                    </Tab>
                </Tabs>
            </div>
            <Loader isLoading={isUploading} />
        </>
    );
}
