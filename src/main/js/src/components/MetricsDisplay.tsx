import React, { useRef, useState } from "react";
import SockJsClient from "react-stomp";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import FlexContainer from '../UIComponents/FlexContainer';
import constants from '../UIComponents/constants'

const MetricsDisplay = () => {
  const clientRef = useRef(null);
  const [waitTime, setWaitTime] = useState(0);
  const [requestTotal, setRequestTotal] = useState(0);
  const [networkRate, setNetworkRate] = useState([]);
  const [responseRate, setResponseRate] = useState([]);

  const networkData = {
    labels: new Array(10).fill(''),
    datasets: [
      {
        label: "Network I/O Rate (/s)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: constants.GREEN, //"rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: constants.GREEN,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: constants.GREEN,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: networkRate,
      },
    ],
  };

  const responseData = {
    labels: new Array(10).fill(''),
    datasets: [
      {
        label: "Response Rate (/s)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: constants.GREEN, //"rgba(75,192,192,1)"
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: constants.GREEN,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: constants.GREEN,
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
        setWaitTime(Number(msg["io-wait-time-ns-avg"]));
        setRequestTotal(Number(msg["request-total"]));
        let network = networkRate.concat(Number(msg["network-io-rate"]));
        if (network.length > 11) {
          network = network.slice(1);
        }

        setNetworkRate(network);

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
    <FlexContainer
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      addlStyles={
        `width: 100%; 
        height: 100%;
        padding: 1rem;
        box-sizing: border-box`
      }
    >
      <p>{`Average I/O Time: ${waitTime ? (waitTime/1000000).toFixed(3) : 0} ms`}</p>
      <p>{`Total Requests: ${requestTotal}`}</p>
      {client}
        <Line data={networkData} options={networkOptions} />
        <Line data={responseData} options={responseOptions} />
    </FlexContainer>
  );
};

export default MetricsDisplay;
