import Image from "next/image";
import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const DropZoneComponent = ({ onContentDrop }) => {
  // OnDrop content
  const onDrop = useCallback(
    (acceptedFiles) => {
      onContentDrop(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [onContentDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    name: "content",
    accept: "image/*, video/*",
  });

  return (
    <div className="text-center" {...getRootProps()}>
      <h1>Please upload your files </h1>
      <Image
        className="w-25 mt-5"
        layout="fill"
        src="/images/upload.png"
        alt="A globe icon with filter and text."
      />
      <Form.Group controlId="formFile" className="mt-4">
        <Form.Label>
          Please upload your files Please select the file to upload Upload
        </Form.Label>
        <Form.Control type="file" {...getInputProps()} />
      </Form.Group>
    </div>
  );
};

export default DropZoneComponent;
