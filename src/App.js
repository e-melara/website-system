import React from "react";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

// import React from "react";
// import { useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";

// import { LoginPage } from "./views/Login";
// import Loading from "./components/common/Loading";

// function App() {
//   const { loading } = useSelector((state) => state.ui);

//   return (
//     <>
//       {loading && <Loading />}
//       <LoginPage />
//       <ToastContainer
//         position="top-center"
//         autoClose={true}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//       />
//     </>
//   );
// }

// export default App;
