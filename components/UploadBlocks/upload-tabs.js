import Router, { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { contentUploadStaticObj } from "@/constants/global.constants";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { UPLOAD_USING_CODE_STUBS } from "@/data";
import Api from "@/services/RTK/axiosAPI.handler";
import { getAllHeaderDataOptionsUpdated, getMFWSatisfactionMetricsCount, getSupportedMediaTypes } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { checkContentValidation } from "@/utils/contentUpload";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { cloneDeep, findIndex } from "lodash";
import { useRef, useState } from "react";
import RenderIf from "../ConditionalRender/RenderIf";
import DropZoneComponent from "../DropZone";
import Loader from "../Loader";
import CodeBlock from "./CodeBlock";
import style from "./uploads.module.scss";
const api = Api.getInstance();
const MAX_FILE_UPLOAD = 1;

export default function UploadTabs() {
    const router = useRouter();
    const { user } = useAuthV3();
    const imageUrlRef = useRef("");
    const satisFactionMetricsCount = useAppSelector(getMFWSatisfactionMetricsCount);
    const supportedMediaTypes = useAppSelector(getSupportedMediaTypes);

    const [isUploading, setIsUploading] = useState(false);

    const [contentData, setContentData] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);

    const asyncUploadContent = async (uploadType, payload, routerQueryData1, routerQueryData2) => {
        console.log('routerQueryData1, routerQueryData2: ', routerQueryData1, routerQueryData2);
        try {
            setIsUploading(true);
            const isFileUpload = uploadType === "file";
            const endpoint = isFileUpload ? "filters" : "url/filters";
            let queryString = {};
            if (isFileUpload) {
                queryString = new URLSearchParams({
                    apikey: user?.api_secret,
                }).toString();
            } else {
                queryString = new URLSearchParams({
                    apikey: user?.api_secret,
                    filters: router.query.filters,
                    mediaUrl: imageUrlRef?.current,
                }).toString();
            }
            api.post(
                `/mfw/media/${user?.userDetails?.email}/${endpoint}?${queryString}`,
                isFileUpload ? payload : {},
                {
                    headers: isFileUpload
                        ? {
                              "Content-Type": "multipart/form-data",
                          }
                        : {},
                },
                true,
                false
            )
                .then((response) => {
                    if (response.isSuccess && response.data.videoId) {
                        newInfoAlert(
                            "Content Upload Successful",
                            "Your content has been uploaded successfully. We will now proceed with moderation. If you wish to View Results, please click the 'View Results' button below.",
                            "View Results",
                            "success",
                            true,
                            "Cancel",
                            false
                        )
                            .then(() => {
                                setIsUploading(false);
                                cleanup();
                                router.push(`/demo-page?videoId=${response.data.videoId}&filters=${routerQueryData1}&sf_id=${routerQueryData2}`);
                                // router.push(`/demo-page?videoId=${response.data.videoId}&filters=${router.query.filters}&sf_id=${router.query.sf_id}`);
                            })
                            .catch(cleanup);
                    }
                })
                .catch((e) => {
                    setIsUploading(false);
                    handleError(e);
                });
        } catch (error) {
            handleError(error);
        }
    };

    const onChangeContentData = async (fileData) => {
        if (fileData?.length > 0) {
            const cloneContentData = cloneDeep(contentData);
            if (fileData && fileData.length !== 0 && fileData.length > MAX_FILE_UPLOAD && fileData.length + cloneContentData.length > MAX_FILE_UPLOAD) {
                newInfoAlert("You can only upload 1 content per request.", "", "OK")
                    .then(() => {
                        setContentData([]);
                    })
                    .catch(() => {
                        setIsUploading(false);
                    });
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
                            if (cloneContentData.length < MAX_FILE_UPLOAD) {
                                cloneContentData.push({
                                    ...contentUploadStaticObj,
                                    file,
                                    index: cloneContentData.length,
                                });
                            }
                        }
                    });
                }

                if (cloneContentData.length < MAX_FILE_UPLOAD) {
                    cloneContentData.push({
                        ...contentUploadStaticObj,
                        index: cloneContentData.length,
                    });
                }
            }

            // check validation
            // const allowedExtensions = ["mp4", "mov", "png", "gif"];
            const allowedExtensions = CommonUtility.isValidArray(supportedMediaTypes) ? supportedMediaTypes.map((item) => item.extension) : ["mp4", "mov", "jpeg", "jpg", "png", "gif"];

            let validationResult = await checkContentValidation(cloneContentData, true, satisFactionMetricsCount?.mediaSizeLimit || 50, allowedExtensions);

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
    const headerData = useAppSelector(getAllHeaderDataOptionsUpdated);

    function isFileTypeSupported(webFeatureKey, file) {
        const selectedFeature = headerData[0].features.find((feature) => feature.webFeatureKey == webFeatureKey);
        console.log("selectedFeature: ", selectedFeature);
        if (selectedFeature && selectedFeature.mediaSupports) {
            const fileType = file.type || "";
            console.log("fileType: ", fileType);
            if (fileType.startsWith("image/") && !selectedFeature.mediaSupports.includes("IMAGE")) {
                return { supported: false, errorMessage: `${selectedFeature.name} filter supports videos only, images format is not allowed.`, featureName: selectedFeature.webFeatureKey };
            }
            if (fileType.startsWith("video/") && !selectedFeature.mediaSupports.includes("VIDEO")) {
                return { featureName: selectedFeature.webFeatureKey, supported: false, errorMessage: `${selectedFeature.name} filter supports images only, videos format is not allowed.` };
            }
        }

        return { supported: true, errorMessage: null };
    }

    // Function to check if a set of features support the file type
    function areFeaturesSupported(webFeatureKeys, file) {
        const selectedFeatureKeys = webFeatureKeys.split(",");

        for (const featureKey of selectedFeatureKeys) {
            const result = isFileTypeSupported(featureKey.trim(), file);
            console.log("result: ", result);
            if (!result.supported) {
                return result;
            }
        }

        return null;
    }
    const removeStringFromArray = (stringToRemove, originalStrings) => {
        console.log("stringToRemove, originalStrings: ", stringToRemove, originalStrings);
        const updatedStrings = originalStrings.split(",").filter((str) => !str.includes(stringToRemove));
        console.log("updatedStrings:", updatedStrings);
        return updatedStrings.toString();
    };
    const handleOnClickUploadFiles = async () => {
        try {
            await setIsUploading(true);

            if (router.query?.filters !== "") {
                if (CommonUtility.isValidArray(contentData)) {
                    const cloneContentData = cloneDeep(contentData);
                    const finalFiles = cloneContentData.filter((data) => data.file !== null);

                    if (finalFiles.length === 0) {
                        newInfoAlert("Invalid input.", "No files selected for upload.", "Okay", "error", true, "Cancel", false)
                            .then(() => {
                                cleanup();
                            })
                            .catch(cleanup);
                        // throw new Error("No files selected for upload.");
                    }
                    let newQuery = "";
                    if (headerData && headerData?.length > 0 && headerData[0]?.features?.length > 0) {
                        if (router.query?.sf_id && CommonUtility.isValidArray(router.query?.sf_id.split(","))) {
                            router.query?.sf_id.split(",").map(async (key) => {
                                const webFeatureKeys = key;
                                console.log("webFeatureKeys: ", webFeatureKeys);
                                const uploadedFileType = finalFiles[0].file;
                                const errorRes = areFeaturesSupported(webFeatureKeys, uploadedFileType);
                                if (errorRes) {
                                            const currentQuery = router.query;

                                    const filterQuery =await removeStringFromArray(errorRes.featureName, currentQuery.filters);
                                    const sq_id_Query = await removeStringFromArray(errorRes.featureName, currentQuery.sf_id);

                                    await newInfoAlert("Unsupported Media Types!", errorRes.errorMessage, `Process without ${errorRes.featureName}`, "warning", true, `Cancel`)
                                        .then(async () => {
                                            console.log("if");
                                            // newQuery = `filters=${filterQuery}&sf_id=${sq_id_Query}`;
                                            // router.replace(`/upload?${newQuery}`);
                                            await asyncUploadContent(
                                                "file",
                                                {
                                                    filters: filterQuery || router.query.filters,
                                                    file: finalFiles[0].file,
                                                },
                                                filterQuery,
                                                sq_id_Query
                                            );
                                        })
                                        .catch(() => {
                                            cleanup();
                                            return;
                                        });
                                    // await newInfoAlert("", errorMessage, "Okay", "warning", false)
                                    //     .then(() => {})
                                    //     .catch(() => {});
                                } else {
                                    // await asyncUploadContent(
                                    //     "file",
                                    //     {
                                    //         filters: router.query.filters,
                                    //         file: finalFiles[0].file,
                                    //     },
                                    //     router.query.filters,
                                    //     router.query.sq_id
                                    // );
                                }
                            });
                        }
                    }
                } else if (imageUrlRef?.current && imageUrlRef?.current !== "") {
                    const allowedExtensions = CommonUtility.isValidArray(supportedMediaTypes) ? supportedMediaTypes.map((item) => item.extension) : ["mp4", "mov", "jpeg", "jpg", "png", "gif"];
                    const isValidUrl = (url) => {
                        const urlPattern = /^https:\/\/.*/;
                        return urlPattern.test(url);
                    };
                    const isValidExtension = (url, allowedExtensions) => {
                        const urlParts = url.split(".");
                        const extension = urlParts[urlParts.length - 1].toLowerCase();
                        return allowedExtensions.includes(extension);
                    };

                    const isValidMediaFile = (url, allowedExtensions) => {
                        if (!isValidUrl(url)) {
                            return false; // URL is not valid
                        }

                        if (!isValidExtension(url, allowedExtensions)) {
                            return false; // Extension is not allowed
                        }

                        return true; // URL is valid with an allowed extension
                    };
                    if (isValidMediaFile(imageUrlRef?.current, allowedExtensions)) {
                        await asyncUploadContent("url", {
                            filters: router.query.filters,
                            mediaUrl: imageUrlRef?.current,
                        });
                    } else {
                        newInfoAlert("Invalid input.", `Kindly share a valid image or video URL with extensions such as ${allowedExtensions.toString()}`, "Okay", "error", true, "Cancel", false)
                            .then(() => {
                                cleanup();
                            })
                            .catch(cleanup);
                        setIsUploading(false);
                    }
                } else {
                    setIsUploading(false);
                    newInfoAlert("Invalid input.", "Please upload files or provide a valid image/video URL.", "Okay", "error", true, "Cancel", false)
                        .then(() => {
                            cleanup();
                        })
                        .catch(cleanup);
                    // throw new Error("Invalid input. Please upload files or provide a valid image/video URL.");
                }
            }
        } catch (error) {
            setIsUploading(false);
            handleError(error); // Use a common error handling function
        }
    };

    const handleError = (error) => {
        if (error && error != undefined) {
            const errorCode = error?.code;
            let errorMessage = "Special Preview: Website Early Access and Maintenance";
            let errorDescription =
                "We're thrilled to offer you early access to our website! Please note that the official website launch is scheduled for January 8th. Until then, certain features may undergo maintenance, and we appreciate your understanding and patience during this period.";

            if (errorCode == "429") {
                errorMessage = "Free quota exceeded";
                errorDescription = error?.apiMessageRes?.detail;
            }
            if (errorCode == 400 && error?.apiMessageRes?.errorCode == "912") {
                errorMessage = error?.apiMessageRes?.title;
                errorDescription = error?.apiMessageRes?.detail || "Please provide the valid url to moderate the content.";
            }
            if (error?.apiMessageRes?.errorCode == "910") {
                errorMessage = error?.apiMessageRes?.title;
                errorDescription = error?.apiMessageRes?.detail || "Please choose file less than 50mb limit.";
            }
            setIsUploading(false);
            newInfoAlert(errorMessage, errorDescription, "Okay", "error", true, "Cancel", false)
                .then(() => {
                    cleanup();
                    if (error?.code == "429") router.push("/pricing");
                })
                .catch(cleanup);
        }
    };

    const cleanup = () => {
        imageUrlRef.current = "";
        setFilePreviews([]);
        setIsUploading(false);
        setContentData([]);
    };

    const handleImageUrlChange = (e) => {
        imageUrlRef.current = e.target.value;
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
                                            <Form.Control type="text" placeholder="Input URL for analysis" onChange={handleImageUrlChange} />
                                            <span className="d-flex text-start mt-1" style={{ fontSize: "13px", color: "gray", padding: "0 3px" }}>
                                                For upload, please share the file URL, and verify that the file size is below {satisFactionMetricsCount?.mediaSizeLimit || 50} MB.
                                            </span>
                                            <span className="d-flex text-start mt-1" style={{ fontSize: "13px", color: "gray", padding: "0 3px" }}>
                                                Supported file types include:{" "}
                                                {CommonUtility.isValidArray(supportedMediaTypes)
                                                    ? supportedMediaTypes.map((item) => item.extension.toUpperCase()).toString()
                                                    : "MP4, MOV, JPEG, JPG, PNG, GIF"}
                                                .
                                            </span>
                                        </Form.Group>
                                        <Button onClick={handleOnClickUploadFiles} type="button" variant="primary" className="mt-3 py-2 px-5">
                                            Moderate
                                        </Button>
                                    </div>
                                    <div className="tab-pane fade" id="pills-dropzone" role="tabpanel" aria-labelledby="pills-dropzone-tab">
                                        <DropZoneComponent
                                            filePreviews={filePreviews}
                                            setFilePreviews={setFilePreviews}
                                            onContentDrop={(e) => onChangeContentData(e)}
                                            supportedMediaTypesString={`Supported file types include: 
                                                ${
                                                    CommonUtility.isValidArray(supportedMediaTypes)
                                                        ? supportedMediaTypes.map((item) => item.extension.toUpperCase()).toString()
                                                        : "MP4, MOV, JPEG, JPG, PNG, GIF"
                                                }.`}
                                        />
                                        <RenderIf isTrue={filePreviews && filePreviews.length > 0}>
                                            <Button onClick={handleOnClickUploadFiles} type="button" variant="primary" className="mt-3 py-2 px-5">
                                                Upload
                                            </Button>
                                        </RenderIf>
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
