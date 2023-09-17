import { useCallback } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ codeData }) => {
  const highlightCode = useCallback((code, language) => {
    return (
      <SyntaxHighlighter language={language?.toLowerCase()} style={tomorrow}>
        {code}
      </SyntaxHighlighter>
    );
  }, []);

  return (
    <div className="p-3 curl__program__tab">
      <h3 className="mb-3">Moderate by submitting an Image URL</h3>
      <Tabs defaultActiveKey="0"  variant="pills" >
        {codeData.map((tab, index) => (
          <Tab key={index} eventKey={index} title={tab.title}>
            <p>{highlightCode(tab.content, tab.title)}</p>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
export default CodeBlock;
