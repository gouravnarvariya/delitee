import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './assets/css/font-awesome.min.css'
import "./assets/css/all.min.css";
import "./input.css";
import "./style.css";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./Redux/Store.js";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
