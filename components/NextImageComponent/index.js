import Image from "next/image";
import React, { useState } from "react";

import { AltUrlType, staticImagesUrl } from "@/utils/constants";

const NextImageComponent = ({
  url,
  altUrlType,
  isOriginalCheck,
  imageQuality,
}) => {
  const [isError, setIsError] = useState(false);

  const getStaticUrl = () => {
    if (
      [AltUrlType.user, AltUrlType.userNewLogo, AltUrlType.DSLogo].includes(
        altUrlType
      )
    ) {
      return staticImagesUrl.DSLogo;
    }
    // Add other fallback URLs here if needed
    return staticImagesUrl.DSLogo;
  };

  const onError = () => {
    setIsError(true);
  };

  const imageProps = {
    src: url,
    onError: onError,
    className: "img-fluid nextImg",
    layout: "fill",
    srcSet: staticImagesUrl.DSLogo,
    alt: `image-${altUrlType}`,
    title: `image-${altUrlType}`,
    quality: imageQuality || 75,
  };

  return !isError ? (
    <Image {...imageProps} />
  ) : (
    <img
      src={getStaticUrl()}
      className="img-fluid nextImg"
      alt="image-comp"
      title="image"
    />
  );
};

export default NextImageComponent;
