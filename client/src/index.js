import React from "react";
import ReactDOM from "react-dom";
import "./themes/index.css";
import App from "./config/App";
import * as serviceWorker from "./utils/serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
