import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {BrowserRouter} from "react-router-dom"
import allReducers from "./Reducers";
import "./index.css"
import 'antd/dist/antd.css';


const store = createStore(allReducers, composeWithDevTools());


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter
      //  history={history}  
       forceRefresh={true}
       >
    <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
