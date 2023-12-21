/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const ResponsiveImage = ({ url, alt, altUrlType }) => {
    const [isError, setIsError] = useState(false);

    const getStaticUrl = () => {
        return "/images/logo.png";
    };

    const onError = () => {
        setIsError(true);
    };

    return (
        <div className="responsive-image-container">
            {!isError ? (
                <img src={url} onError={onError} className="responsive-image" alt={alt || `image-${altUrlType}`} title={alt || `image-${altUrlType}`} />
            ) : (
                <img src={getStaticUrl()} className="responsive-image" alt="image-comp" title="image" />
            )}
        </div>
    );
};

export default ResponsiveImage;
