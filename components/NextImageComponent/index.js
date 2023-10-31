import React, { useState } from "react";

const NextImageComponent = (props) => {
  const { url, isOriginalCheck, imageQuality } = props;
  const [isError, setIsError] = useState(false);

  const getStaticUrl = () => {
    // Add other fallback URLs here if needed
    return "imageslogo.png";
  };

  const onError = () => {
    setIsError(true);
  };

  return (
    <>
      {!isError ? (
        <img
          src={url}
          onError={onError}
          className="img-fluid nextImg"
          // quality={imageQuality || 75}
          srcSet={"/images/logo.png"}
          alt={`image`}
          title={`image`}
        />
      ) : (
        <img
          src={getStaticUrl()}
          className="img-fluid nextImg"
          alt="image-comp"
          title="image"
        />
      )}
    </>
  );
};

export default NextImageComponent;
