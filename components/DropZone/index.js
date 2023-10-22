import { newInfoAlert } from "@/utils/toastMessage.utils";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { HiOutlineX } from "react-icons/hi";

const DropZoneComponent = ({
  onContentDrop,
  filePreviews,
  setFilePreviews,
}) => {
  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "too-many-files") {
            newInfoAlert(
              "Upload failed",
              `You can only upload 1 content per request.`,
              "warning",
              "OK"
            );
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
        <div style={{ width: "15%", margin: "0 auto" }}>
          <Image
            className="mt-2"
            layout="fill"
            src="/images/upload.png"
            alt="A globe icon with filter and text."
          />
        </div>
        <Form.Group
          controlId="formFile"
          className="mt-4"
          {...getRootProps()}
          style={{ border: "1px dashed", padding: 20, borderRadius: 6 }}
        >
          <Form.Label>Drop files here or click to upload</Form.Label>
          <Form.Control type="file" {...getInputProps()} />
        </Form.Group>
      </div>
      <div className="d-flex gap-3 overflow-auto">
        <div className="position-relative">
          {filePreviews.map((file, index) => (
            <div key={index}>
              {file.type.startsWith("image/") ? ( // Check if the file is an image
                <>
                  <img
                    key={index}
                    src={file.preview}
                    alt=""
                    className="object-fit rounded-4 image_hover mt-3"
                  />
                  <div
                    className="icon_sm_top position-absolute d-flex justify-content-center align-items-center"
                    onClick={() => removeFile(index)}
                  >
                    <HiOutlineX style={{ fontSize: "18px" }} />
                  </div>
                </>
              ) : file.type.startsWith("video/") ? ( // Check if the file is a video
                <>
                  <video
                    key={index}
                    src={file.preview}
                    alt=""
                    className="object-fit rounded-4 image_hover mt-3"
                    controls
                  />
                  <div
                    className="icon_sm_top position-absolute d-flex justify-content-center align-items-center"
                    onClick={() => removeFile(index)}
                  >
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
