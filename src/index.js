import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./client/Store/configureStore";

import App from "./App";
import { startGetUser } from "./client/Actions/userAction";
import { startGetProfile } from "./client/Actions/profileAction";
import { startGetFund } from "./client/Actions/addFundAction";
import {startGetTransferFund} from "./client/Actions/transferFundAction";


const store = configureStore();
console.log(store.getState());

store.subscribe(() => {
  console.log(store.getState());
});

if (localStorage.getItem("authToken")) {
  console.log("authtoken");
  store.dispatch(startGetUser());
}
if (localStorage.getItem("authToken")) {
  console.log("authtoken");
  store.dispatch(startGetProfile());
}
if (localStorage.getItem("authToken")) {
  console.log("authtoken");
  store.dispatch(startGetFund());
}
if (localStorage.getItem("authToken")) {
  console.log("authtoken");
  store.dispatch(startGetTransferFund());
}
const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  jsx,

  document.getElementById("root")
);


