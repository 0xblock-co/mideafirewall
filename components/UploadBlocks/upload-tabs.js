import Router from "next/router";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { constantCodeData } from "@/utils/constants";

import DropZoneComponent from "../DropZone";
import CodeBlock from "./CodeBlock";

export default function UploadTabs() {
  const [codeData, setcodeData] = useState(constantCodeData);
  const onChangeContentData = (files) => {
    console.log("files :>> ", files);
  };
  const handleOnClickUploadFiles = () => {
    Router.push("/demo-page");
  };
  const code = `function helloWorld() {
    console.log("Hello, world!");
  }`;

  return (
    <div className="mdf__upload__tab bg-white my-4 rounded ">
      <Tabs defaultActiveKey="web" className="upload__main__tab nav-fill" id="uncontrolled-tab-example">
        <Tab eventKey="web" className="p-3" title="Web">
          <div className="text-center">
            <DropZoneComponent onContentDrop={(e) => onChangeContentData(e)} />
            <Button
              onClick={handleOnClickUploadFiles}
              type="button"
              variant="primary"
              className="mt-3 py-2 px-5"
            >
              Upload
            </Button>
          </div>
        </Tab>
        <Tab eventKey="program" className="p-3" title="Program">
          <CodeBlock codeData={codeData} />
        </Tab>
        <Tab eventKey="amazon" className="p-3" title="Amazons3">
          <div className="text-center"></div>
          Web Program Amazon S3 Are you looking to seamlessly integrate with
          Amazon S3 for your platform? Contact us now!
          <Button
            onClick={() => Router.push("/contact-us")}
            type="button"
            variant="primary"
            className="mt-3 py-2 px-5"
          >
            Contact us
          </Button>
        </Tab>
      </Tabs>
    </div>
  );
}
