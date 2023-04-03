import Image from "next/image";
import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import CodeBlock from "./CodeBlock";
export default function UploadTabs() {
  const code = `const greeting = "Hello, world!";
  console.log(greeting);`;
  return (
    <div className="mdf__upload__tab bg-white mt-5 rounded ">
      <Tabs defaultActiveKey="web" id="uncontrolled-tab-example">
        <Tab eventKey="web" className="p-3" title="Web">
          <div className="text-center">
            <h1>Please upload your files </h1>
            <Image
              className="w-25 mt-5"
              layout="fill"
              src="/images/upload.png"
              alt="A globe icon with filter and text."
            />
            <Form.Group controlId="formFile" className="mt-4">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button type="button" variant="primary" className="mt-3 py-2 px-5">
              Upload
            </Button>
          </div>
        </Tab>
        <Tab eventKey="program" className="p-3" title="Program">
          <CodeBlock language="javascript" code={code} />
        </Tab>
        <Tab eventKey="amazon" className="p-3" title="Amazons3">
          When I have seen by Time's fell hand defac'd The rich-proud cost of
          outworn buried age; When sometime lofty towers I see down-raz'd, And
          brass eternal slave to mortal rage; When I have seen the hungry ocean
          gain Advantage on the kingdom of the shore, And the firm soil win of
          the watery main, Increasing store with loss, and loss with store; When
          I have seen such interchange of state, Or state itself confounded, to
          decay;
        </Tab>
      </Tabs>
    </div>
  );
}
