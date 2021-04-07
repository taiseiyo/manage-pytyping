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

const flow = async () => {
  const request = await fetch(
    "https://script.google.com/macros/s/AKfycbydKMo4v5V8oi5BXRKM6afe3BtNWBE_4SKnOsu7R2RlIY9C2kw7zVKFNesWJOsmre3Rgg/exec",
  );
  const data = await request.text();
  await ReactDOM.render(
    <React.StrictMode>
      {name_list.map((one_name) => (
        <App name={one_name} text_data={data} />
      ))}
    </React.StrictMode>,
    document.getElementById("root"),
  );
};

flow();
// https://lsnl.jp/cgi-bin/pytyping?id=lsnl-training&action=list

reportWebVitals();
