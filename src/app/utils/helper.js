import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

export const showToastMessage = (text, responseCode, options) => {
  const type = responseCode === 200 ? "success" : "error";

  const toastAlert = toast?.[type || "success"];

  toastAlert(text, {
    ...options,
  });
};
