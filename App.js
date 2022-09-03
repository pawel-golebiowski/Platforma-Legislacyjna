import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { AppBoot } from "./AppBoot";
import allReducer from "./shared/redux/reducers";

const store = createStore(allReducer);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppBoot></AppBoot>
      </Provider>
    </>
  );
};

export default App;
