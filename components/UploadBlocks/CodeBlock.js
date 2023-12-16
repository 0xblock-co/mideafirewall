import { useCallback } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { useAuthV3 } from "@/contexts-v2/auth.context";
import CommonUtility from "@/utils/common.utils";
import { useRouter } from "next/router";
import style from "./uploads.module.scss";

const CodeBlock = ({ codeData }) => {
    const router = useRouter();
    const { user } = useAuthV3();
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
                    return (
                        <Tab key={index} eventKey={index} title={tab.title}>
                            <h6 className="mt-3 mb-3">Moderate by submitting an Image URL</h6>
                            <p>
                                {highlightCode(
                                    CommonUtility.replaceApiSecretAndFilters(tab.urlSnippets, user?.userDetails?.email, user?.api_secret, router.query.filters, user?.tokens?.accessToken),
                                    tab.title
                                )}
                            </p>
                            <h6 className="mt-3 mb-3">Moderate by submitting file</h6>
                            <p>
                                {highlightCode(
                                    CommonUtility.replaceApiSecretAndFilters(tab.fileSnippets, user?.userDetails?.email, user?.api_secret, router.query.filters, user?.tokens?.accessToken),
                                    tab.title
                                )}
                            </p>
                        </Tab>
                    );
                })}
            </Tabs>
        </div>
    );
};
export default CodeBlock;
