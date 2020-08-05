import React, { useRef, useState } from "react";
import { Button } from "../UIComponents/Buttons";
import SockJsClient from "react-stomp";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
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
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const MetricsDisplay = () => {
  const clientRef = useRef(null);
  const [waitTime, setWaitTime] = useState(0);
  const [requestTotal, setRequestTotal] = useState(0);

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
        setWaitTime(Number(msg["io-wait-time-ns-avg"][0]));

        setRequestTotal(Number(msg["request-total"][0]));
      }}
      ref={(client) => {
        clientRef.current = client;
      }}
    />
  );

  //"The number of responses received per second"
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
      <Line data={data} />
    </>
  );
};

export default MetricsDisplay;
