import React, {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import "./App.css";

const App = ({name, text_data}) => {
  const [pydata, setPyData] = useState("");

  useEffect(() => {
    setPyData(text_data);
  }, []); // 第 2 引数なし → アップデートした時に関数呼びだし

  let {score_array} = get_Weekly_Score(pydata, name);
  let labels = [],
    scores = [];

  score_array = score_array.slice(-7);
  for (let score of score_array) {
    score = score.split("\t");
    labels.push(score[0].slice(5, 10));
    scores.push(score[5]);
  }

  const {data, options} = graph_data(labels, scores, name);
  return (
    <div className="App">
      <div className="caption">Pytyping の評価シート({name})</div>
      <div className="figure">
        <Line
          chartType="LineChart"
          data={data}
          options={options}
          height={130}
        />
      </div>
    </div>
  );
};

let get_Weekly_Score = (pydata, name) => {
  let split_data = pydata.split("\n");
  let score_array = [];

  for (let line of split_data) {
    if (line.split("\t")[3] === name) {
      let dates = new Date();

      for (let minus = 0; minus <= 7; minus++) {
        let day = dates.getDate(),
          month = dates.getMonth() + 1;

        if (1 <= Number(day) && Number(day) <= 9) {
          day = "0" + dates.getDate();
        }
        let target = dates.getFullYear() + "-0" + month + "-" + day;

        if (line.slice(0, 10) === target) {
          score_array.push(line);
        }
        dates.setDate(dates.getDate() - 1);
        if (dates.getDate() === 0) {
          dates.setMonth(dates.getMonth() - 1);
        }
      }
    }
  }
  return {score_array};
};

let graph_data = (labels, scores, name) => {
  const color_data = [
      "rgba(212,6,6,0.2)",
      "rgba(0,153,255,0.2)",
      "rgba(119,255,0,0.3)",
      "rgba(246,255,0,0.4)",
      "rgba(255,0,238,0.3)",
    ],
    color_num = Math.floor(Math.random() * color_data.length + 1);
  let color = color_data[color_num];

  const data = {
    labels: labels,
    datasets: [
      {
        data: scores,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        backgroundColor: color,
        pointHitRadius: 20,
        label: name,
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
            fontSize: 25,
          },
          ticks: {
            fontSize: 25,
          },
        },
      ],

      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "得点",
            fontColor: "青色",
            fontSize: 25,
          },
          ticks: {
            fontSize: 25,
          },
        },
      ],
      maintainAspectRatio: false,
    },
  };
  return {data, options};
};

export default App;

// https://script.google.com/macros/s/AKfycbydKMo4v5V8oi5BXRKM6afe3BtNWBE_4SKnOsu7R2RlIY9C2kw7zVKFNesWJOsmre3Rgg/exec
