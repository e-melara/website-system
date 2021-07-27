import React from 'react'
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { LoginPage } from "./views/Login";

function App() {
  return (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
}

export default App;
