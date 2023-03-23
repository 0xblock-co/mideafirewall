import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

const ToastContainerConfig = () => {
  return (
    <ToastContainer
      position="top-right"
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      enableMultiContainer
      containerId="notification"
      limit={6}
    />
  );
};

export default ToastContainerConfig;