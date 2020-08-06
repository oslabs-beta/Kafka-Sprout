import React, { useState, useEffect } from "react";
import TopicDisplay from "./TopicDisplay";
import BrokerDisplay from "./BrokerDisplay";
import Loader from "react-loader-spinner";
import constants from "../UIComponents/constants";
import MetricsDisplay from "./MetricsDisplay";
import FlexContainer from "../UIComponents/FlexContainer";

const Main = (props) => {
  const [broker, setBroker] = useState(null);
  const [topic, setTopic] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateBrokerList = () => {
    fetch("/describeBrokers")
      .then((res) => res.json())
      .then((res) => {
        console.log("create a broker");
        setBroker(res);
      })
      .catch((err) => {
        throw new Error("Error in getting brokers" + err);
      });
  };

  const updateTopicList = () => {
    fetch("/describeTopics")
      .then((res) => res.json())
      .then((res) => {
        setTopic(res);
      })
      .catch((err) => {
        throw new Error("Error in getting topics" + err);
      });
  };

  const updateList = async () => {
    const res = await fetch("/describeTopicsAndBrokers");
    if (!res.ok) {
      throw new Error("Error in loading data" + res);
    }
    const data = await res.json();
    setTopic(data.Topics);
    setBroker(data.Brokers);
  };

  useEffect(() => {
    updateList().then(() => setIsLoaded(true));
  }, []);

  if (isLoaded) {
    if (props.status === "false") {
      return (
        <FlexContainer addlStyles={"width: 100%; height: 100%;"}>
          <BrokerDisplay brokerData={broker} />
          <TopicDisplay topicData={topic} />
        </FlexContainer>
      );
    } else {
      return (
        <FlexContainer addlStyles={"width: 100%; height: 100%;"}>
          <MetricsDisplay />
          <FlexContainer
            flexDirection="column"
            addlStyles={"width: 100%; height: 100%;"}
          >
            <BrokerDisplay
              brokerData={broker}
              updateBrokerList={updateBrokerList}
            />
            <TopicDisplay topicData={topic} updateTopicList={updateTopicList} />
          </FlexContainer>
        </FlexContainer>
      );
    }
  } else {
    return (
      <FlexContainer addlStyles={"width: 100%; height: 100%;"}>
        <Loader
          type="Hearts"
          color={constants.LIGHTER_GREEN}
          height={80}
          width={80}
        />
      </FlexContainer>
    );
  }
};

export default Main;
