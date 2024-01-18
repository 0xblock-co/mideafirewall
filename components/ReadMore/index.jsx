import { useState } from "react";

const ReadMore = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (text.length <= maxLength) {
        return <p>{text}</p>;
    }

    return (
        <div className="read-more">
            <p>
                {isExpanded ? text : `${text.slice(0, maxLength)}...`}
                <span
                    className="text-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsExpanded(!isExpanded);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <b> {isExpanded ? " less" : " more"}</b>
                </span>
            </p>
        </div>
    );
};

export default ReadMore;
