import { getMFWSatisfactionMetricsCount } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { HiOutlineX } from "react-icons/hi";

const DropZoneComponent = ({ onContentDrop, filePreviews, setFilePreviews, supportedMediaTypesString }) => {
    const satisFactionMetricsCount = useAppSelector(getMFWSatisfactionMetricsCount);

    const onDrop = useCallback(
        (acceptedFiles, fileRejections) => {
            fileRejections.forEach((file) => {
                file.errors.forEach((err) => {
                    if (err.code === "too-many-files") {
                        newInfoAlert("Upload failed", `You can only upload 1 content per request.`, "warning", "OK");
                    }
                    if (err.code === "file-too-large") {
                        newInfoAlert("Error: ", `${err.message}`, "OK")
                            .then(() => {})
                            .catch(() => {});
                    }

                    if (err.code === "file-invalid-type") {
                        newInfoAlert("Error: ", `${err.message}`, "OK")
                            .then(() => {})
                            .catch(() => {});
                    }
                });
            });

            const filesWithPreviews = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setFilePreviews(filesWithPreviews);
            onContentDrop(filesWithPreviews);
        },
        [onContentDrop]
    );

    useEffect(() => {
        // Clean up previews when the component unmounts
        return () => {
            filePreviews.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [filePreviews]);

    const removeFile = (index) => {
        const updatedPreviews = [...filePreviews];
        const removedFile = updatedPreviews.splice(index, 1);
        setFilePreviews(updatedPreviews);
        onContentDrop(updatedPreviews);
        URL.revokeObjectURL(removedFile[0].preview);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        name: "content",
        accept: "image/*, video/*",
        autoFocus: true,
        multiple: false,
    });

    return (
        <section>
            <div>
                <Form.Group controlId="formFile" className="mt-4" {...getRootProps()} style={{ border: "1px dashed", padding: 20, borderRadius: 6 }}>
                    <div style={{ width: "15%", margin: "10px auto" }}>
                        <Image className="mt-2" layout="fill" src="/images/upload.png" alt="A globe icon with filter and text." />
                    </div>
                    <Form.Label style={{ fontSize: "13px", color: "gray" }}>
                        Drop your files here or click to upload, making sure that the size of each file is less than {satisFactionMetricsCount?.mediaSizeLimit || 50} MB.
                    </Form.Label>
                    <Form.Label style={{ fontSize: "13px", color: "gray" }}>{supportedMediaTypesString}</Form.Label>
                    <p>or</p>
                    <span className="browse-button">Browse file</span>
                    <Form.Control type="file" {...getInputProps()} />
                </Form.Group>
            </div>
            <div className="d-flex gap-3 overflow-auto">
                <div className="position-relative">
                    {filePreviews.map((file, index) => (
                        <div key={index}>
                            {file.type.startsWith("image/") ? ( // Check if the file is an image
                                <>
                                    <img key={index} src={file.preview} loading="lazy" alt="" className="lazyload object-fit rounded-4 image_hover mt-3" />
                                    <div className="icon_sm_top position-absolute d-flex justify-content-center align-items-center" onClick={() => removeFile(index)}>
                                        <HiOutlineX style={{ fontSize: "18px" }} />
                                    </div>
                                </>
                            ) : file.type.startsWith("video/") ? ( // Check if the file is a video
                                <>
                                    <video key={index} src={file.preview} alt="" className="object-fit rounded-4 image_hover mt-3" controls />
                                    <div className="icon_sm_top position-absolute d-flex justify-content-center align-items-center" onClick={() => removeFile(index)}>
                                        <HiOutlineX style={{ fontSize: "18px" }} />
                                    </div>
                                </>
                            ) : (
                                // Handle other file types here
                                <p>Unsupported File Type</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DropZoneComponent;
