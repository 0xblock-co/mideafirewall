import { useCallback } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import style from "./uploads.module.scss";
import CommonUtility from "@/utils/common.utils";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const CodeBlock = ({ codeData }) => {
  const router = useRouter();
  const { user } = useAuth();
console.log(user)
  const highlightCode = useCallback((code, language) => {
    return (
      <SyntaxHighlighter language={language?.toLowerCase()} style={oneDark}>
        {code}
      </SyntaxHighlighter>
    );
  }, []);

  return (
    <div className={`p-1 my_tabs ${style.curl__program__tab}`}>
      <Tabs defaultActiveKey="0" variant="pills">
        {codeData.map((tab, index) => {
          return(
            <Tab key={index} eventKey={index} title={tab.title}>
            <h6 className="mt-3 mb-3">Moderate by submitting an Image URL</h6>
            <p>{highlightCode(CommonUtility.replaceApiSecretAndFilters(tab.urlSnippets, user?.id, user?.token, router.query.filters), tab.title)}</p>
            <h6 className="mt-3 mb-3">Moderate by submitting file</h6>
            <p>{highlightCode(CommonUtility.replaceApiSecretAndFilters(tab.fileSnippets, user?.id, user?.token, router.query.filters), tab.title)}</p>
          </Tab>
        )})}
      </Tabs>
    </div>
  );
};
export default CodeBlock;
