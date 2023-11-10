/* eslint-disable no-undef */
import React from "react";

interface RenderIfElseProps {
    condition: boolean;
    trueContent: React.ReactElement<any, any> | null;
    falseContent: React.ReactElement<any, any> | null;
}

const RenderIfElse: React.FC<RenderIfElseProps> = ({ condition, trueContent, falseContent }) => (condition ? trueContent : falseContent);

export default RenderIfElse;
