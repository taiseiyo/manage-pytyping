import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// let name_list = [
//   "ohsaki",
//   "taisei",
//   "soma",
//   "yuki",
//   "keita",
//   "michika",
//   "joe",
//   "kei",
//   "takeaki",
// ];

ReactDOM.render(
  <React.StrictMode>
    <App name={"taisei"} />
    <App name={"hagi"} />
    <App name={"michika"} />
    <App name={"yuki"} />
  </React.StrictMode>,
  document.getElementById("root"),
);

// https://lsnl.jp/cgi-bin/pytyping?id=lsnl-training&action=list

reportWebVitals();
