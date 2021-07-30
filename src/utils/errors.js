import { toast } from "react-toastify";

export const showErrorToast = ({ data, status }) => {
  let _showMessage;
  if(status === 401) 
    _showMessage = data.message;
  toast.error(_showMessage);
}