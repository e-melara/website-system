import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { store } from "./redux/store";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </Provider>
  );
}
