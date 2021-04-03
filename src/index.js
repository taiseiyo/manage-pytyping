import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let name_list = [
  "ohsaki",
  "taisei",
  "soma",
  "yuki",
  "keita",
  "michika",
  "joe",
  "kei",
  "takeaki",
];

ReactDOM.render(
  <React.StrictMode>
    {name_list.map((one_name) => (
      <App name={one_name} />
    ))}
  </React.StrictMode>,
  document.getElementById("root"),
);

// https://lsnl.jp/cgi-bin/pytyping?id=lsnl-training&action=list

reportWebVitals();
