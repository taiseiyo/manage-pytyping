import React, {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import "./App.css";

function App() {
  const [pydata, setPyData] = useState("");
  useEffect(() => {
    const flow = async () => {
      const request = fetch(
        "https://script.google.com/macros/s/AKfycbydKMo4v5V8oi5BXRKM6afe3BtNWBE_4SKnOsu7R2RlIY9C2kw7zVKFNesWJOsmre3Rgg/exec",
      );

      const response = await request;
      const text = await response.text();
      setPyData(text);
    };
    flow();
  }, []); // 第 2 引数なし → アップデートした時に関数呼びだし

  let {score_array} = get_Weekly_Score(pydata),
    {week_date} = make_dates(),
    // 一日の最大点数を取得
    {split_score} = make_max_score(week_date, score_array);

  let labels = [],
    scores = [];

  split_score = split_score.sort();
  for (let score of split_score) {
    for (let s of score) {
      let tmp = String(s).split("\t");
      labels.push(tmp[0].slice(5, 10));
      scores.push(tmp[5]);
    }
  }
  console.log(labels, scores);
  const {data, options} = graph_data(labels, scores);

  return (
    <div className="App">
      <div style={{color: "blue", fontSize: 100}}>Pytyping の評価シート</div>
      <div>
        <Line
          chartType="LineChart"
          data={data}
          options={options}
          height={130}
        />
      </div>
    </div>
  );
}

let make_max_score = (week_date, score_array) => {
  let split_data = [],
    split_score = [];

  for (let date of week_date) {
    for (let score of score_array) {
      if (date === score.slice(0, 10)) {
        split_data.push(score);
      }
    }
    if (split_data.length) {
      split_score.push(split_data);
      split_data = [];
    }
  }

  return {split_score};
};

let get_Weekly_Score = (pydata) => {
  let split_data = pydata.split("\n");
  let score_array = [];

  for (let line of split_data) {
    if (line.match("taisei")) {
      let date = new Date();
      let month = Number(date.getMonth()) + 1;
      for (let minus = 0; minus <= 7; minus++) {
        let target = date.getFullYear() + "-0" + month + "-" + date.getDate();
        if (line.slice(0, 10) === target) {
          score_array.push(line);
        }
        date.setDate(date.getDate() - 1);
      }
    }
  }
  return {score_array};
};

let make_dates = () => {
  let date = new Date(),
    week_date = [];
  let month = Number(date.getMonth()) + 1;
  for (let minus = 0; minus <= 7; minus++) {
    week_date.push(date.getFullYear() + "-0" + month + "-" + date.getDate());
    date.setDate(date.getDate() - 1);
  }
  return {week_date};
};

let graph_data = (labels, scores) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: scores,
        label: "taisei score",
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "日付",
            fontColor: "赤色",
            fontSize: 60,
          },
          ticks: {
            fontSize: 60,
          },
        },
      ],

      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "得点",
            fontColor: "青色",
            fontSize: 60,
          },
          ticks: {
            fontSize: 60,
          },
        },
      ],
    },
  };
  return {data, options};
};

export default App;

// https://script.google.com/macros/s/AKfycbydKMo4v5V8oi5BXRKM6afe3BtNWBE_4SKnOsu7R2RlIY9C2kw7zVKFNesWJOsmre3Rgg/exec
