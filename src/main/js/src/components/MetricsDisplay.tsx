import React, { useRef, useState } from "react";
import { Button } from "../UIComponents/Buttons";
import SockJsClient from "react-stomp";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

const MetricsDisplay = () => {
  const clientRef = useRef(null);
  const [waitTime, setWaitTime] = useState(0);
  const [requestTotal, setRequestTotal] = useState(0);
  const [networkRate, setNetworkRate] = useState([]);
  const [responseRate, setResponseRate] = useState([]);

  const networkData = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Network I/O Rate (/s)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: networkRate,
      },
    ],
  };

  const responseData = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Response Rate (/s)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: responseRate,
      },
    ],
  };

  const networkOptions = {
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: -1, // minimum will be 0, unless there is a lower value
            suggestedMax: 2,
          },
        },
      ],
    },
  };

  const responseOptions = {
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: -1,
            suggestedMax: 1,
          },
        },
      ],
    },
  };

  const client = (
    <SockJsClient
      url="/socketConnect"
      topics={["/topic/metrics"]}
      onMessage={(msg) => {
        console.log(msg);
        setWaitTime(Number(msg["io-wait-time-ns-avg"]));
        setRequestTotal(Number(msg["request-total"]));
        let network = networkRate.concat(Number(msg["network-io-rate"]));
        if (network.length > 11) {
          network = network.slice(1);
        }

        setNetworkRate(network);
        console.log(networkRate);

        let response = responseRate.concat(Number(msg["response-rate"]));
        if (response.length > 11) {
          response = response.slice(1);
        }

        setResponseRate(response);
      }}
      ref={(client) => {
        clientRef.current = client;
      }}
    />
  );

  return (
    <>
      <div>
        Average I/O Time (/ns)
        {waitTime}
      </div>
      <div>
        Total Requests
        {requestTotal}
      </div>
      {client}
      <div>
        <Line data={networkData} options={networkOptions} />
        <Line data={responseData} options={responseOptions} />
      </div>
    </>
  );
};

export default MetricsDisplay;
