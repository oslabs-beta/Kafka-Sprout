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

  const data = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label:
          "The number of network operations (reads or writes) on all connections per second",
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

  const options = {
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: -1, // minimum will be 0, unless there is a lower value.
            // OR //
            suggestedMax: 2,
          },
        },
      ],
    },
  };

  // const data = {
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       lineTension: 0,
  //       borderDash: [8, 4],
  //       data: [],
  //     },
  //   ],
  // };

  // const options = {
  //   scales: {
  //     xAxes: [
  //       {
  //         type: "realtime",
  //         realtime: {
  //           onRefresh: function () {
  //             data.datasets[0].data.push({
  //               x: Date.now(),
  //               y: Math.random() * 100,
  //             });
  //           },
  //           delay: 2000,
  //         },
  //       },
  //     ],
  //   },
  // };

  const handleClick = () => {
    console.log("im button");
    clientRef.current.sendMessage(
      "/app/metrics",
      JSON.stringify({ message: "FROM SOCKET" })
    );
  };

  const client = (
    <SockJsClient
      url="/socketConnect"
      topics={["/topic/metrics"]}
      onMessage={(msg) => {
        console.log(msg);
        setWaitTime(Number(msg["io-wait-time-ns-avg"]));
        setRequestTotal(Number(msg["request-total"]));
        let rate = networkRate.concat(Number(msg["network-io-rate"]));
        // let rate = Number(msg["network-io-rate"]);
        if (rate.length > 11) {
          rate = rate.slice(1);
        }

        setNetworkRate(rate);
        console.log(networkRate);
      }}
      ref={(client) => {
        clientRef.current = client;
      }}
    />
  );

  //"The number of responses received per second" DO NOT DELETE
  return (
    <>
      <div>
        The average length of time the I/O thread spent waiting for a socket
        ready for reads or writes in nanoseconds
        {waitTime}
      </div>
      <div>
        The total number of requests sent
        {requestTotal}
      </div>
      {client}
      <Button onClick={handleClick}>Send Socket</Button>
      <Line data={data} width={500} options={options} />
    </>
  );
};

export default MetricsDisplay;
