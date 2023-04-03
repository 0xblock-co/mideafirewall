import React from "react";
import { Circles } from "react-loader-spinner";
const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="loader-main">
        <Circles
          height="60"
          width="60"
          color="#7B5B9E"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={isLoading}
        />
      </div>
    )
  );
};

export default Loader;
