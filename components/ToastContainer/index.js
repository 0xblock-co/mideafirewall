import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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