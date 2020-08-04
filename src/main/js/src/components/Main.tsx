import React, { useState, useEffect } from "react";
import TopicDisplay from "./TopicDisplay";
import BrokerDisplay from "./BrokerDisplay";
import { StartCluster } from "./StartCluster";
import { RootDiv } from "../UIComponents/UIComponents";
import Loader from "react-loader-spinner";
import constants from "../UIComponents/constants";
import { Line } from "react-chartjs-2";

const Main = (props) => {
  const [broker, setBroker] = useState(null);
  const [topic, setTopic] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [time, setTime] = useState([65, 59, 80, 81, 56, 55, 40]);

  const updateBrokerList = () => {
    fetch("/describeBrokers")
      .then((res) => res.json())
      .then((res) => {
        console.log("describeBrokers", res);
        setBroker(res);
      })
      .catch((err) => {
        console.log("Error in getting brokers", err);
      });
  };

  const updateTopicList = () => {
    fetch("/describeTopics")
      .then((res) => res.json())
      .then((res) => {
        console.log("describeTopics", res);
        setTopic(res);
      })
      .catch((err) => {
        console.log("Error in getting topics", err);
      });
  };

  const updateList = async () => {
    const res = await fetch("/describeTopicsAndBrokers");
    if (!res.ok) {
      console.log("Error in loading data", res);
    }
    const data = await res.json();
    setTopic(data.Topics);
    setBroker(data.Brokers);
  };

  useEffect(() => {
    updateList().then(() => setIsLoaded(true));
  }, []);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
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
        data: time,
      },
    ],
  };

  //console.log('NEW RENDER');
  //console.log('brokerdata', broker);
  //console.log('topicData', topic);
  if (isLoaded) {
    console.log("isLoaded");
    if (props.status === "false") {
      return (
        <RootDiv>
          <BrokerDisplay brokerData={broker} />
          <TopicDisplay topicData={topic} />
          <StartCluster />
        </RootDiv>
      );
    } else {
      return (
        <RootDiv>
          <Line data={data} />
          <BrokerDisplay
            brokerData={broker}
            updateBrokerList={updateBrokerList}
          />
          <TopicDisplay topicData={topic} updateTopicList={updateTopicList} />
        </RootDiv>
      );
    }
  } else
    return (
      <RootDiv>
        <Loader
          type="Hearts"
          color={constants.LIGHTER_GREEN}
          height={80}
          width={80}
        />
      </RootDiv>
    );
};

export default Main;
