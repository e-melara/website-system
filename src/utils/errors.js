import { toast } from "react-toastify";

export const showErrorToast = ({ response }) => {
  let _showMessage;
  const { data, status } = response;

  if(status === 401) {
    _showMessage = data.message;
  }

  toast.error(_showMessage);
}