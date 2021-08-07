import { toast } from "react-toastify";

export const showErrorToast = ({ message}) => {
  toast.error(message);
}

// Funcion para verificar si hay error
export const axiosErrorHandler = (error, callback) => {
  if(error.response) {
    const {data, status} = error.response;
    callback({
      data,
      status: status
    });
  }else if(error.request) {
    const { status, responseText } = error.request;
    callback(callback({
      data: responseText,
      status:   status
    }));
  }else {
    callback({ 
      status: 400, 
      data: error.message 
    })
  }
}