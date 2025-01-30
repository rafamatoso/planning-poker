import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions: ToastOptions<unknown> = {
  position: "top-right",
  theme: "colored",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const Toast = {
  // Exibe um toast de sucesso
  success: (message, options = {}) => {
    toast.success(message, {
      ...toastOptions,
      ...options,
    });
  },

  // Exibe um toast de erro
  error: (message, options = {}) => {
    toast.error(message, {
      ...toastOptions,
      ...options,
    });
  },

  // Exibe um toast de alerta
  warning: (message, options = {}) => {
    toast.warning(message, {
      ...toastOptions,
      ...options,
    });
  },

  // Exibe um toast de informação
  info: (message, options = {}) => {
    toast.info(message, {
      ...toastOptions,
      ...options,
    });
  },
};

export default Toast;
