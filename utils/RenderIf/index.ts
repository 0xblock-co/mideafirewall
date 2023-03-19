import React, { ReactNode, ReactElement } from "react";

interface IRenderIfProps {
    isTrue: boolean;
    children: ReactNode;
}

const RenderIf: React.FC<IRenderIfProps> = ({ isTrue, children }) => {
    if (isTrue) {
        return children as ReactElement<any>;
    }
    return null;
};

export default RenderIf;
