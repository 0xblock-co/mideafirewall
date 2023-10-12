import { newInfoAlert } from "@/utils/toastMessage.utils";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const DropZoneComponent = ({
  onContentDrop,
  filePreviews,
  setFilePreviews,
}) => {
  // OnDrop content
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
    // Clean up previews when component unmounts
    return () => {
      filePreviews.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [filePreviews]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    name: "content",
    accept: "image/*, video/*",
    maxFiles: 1,
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
          style={{ border: "1px dashed", padding: 20 }}
        >
          <Form.Label>Drop files here or click to upload</Form.Label>
          <Form.Control type="file" {...getInputProps()} />
        </Form.Group>
      </div>
      <div className="d-flex gap-3 overflow-auto">
        {filePreviews.map((file, index) => (
          <img
            key={index}
            src={file.preview}
            alt=""
            className="object-fit rounded-4 image_hover mt-3"
          />
        ))}
      </div>
    </section>
  );
};

export default DropZoneComponent;
