import React, { useState, useEffect } from "react";
import { TopicDisplay } from "./TopicDisplay";
import { BrokerDisplay } from "./BrokerDisplay";
import { StartCluster } from "./StartCluster";
import { ModalBackground } from "../UIComponents/StyledModal";
import { RootDiv } from "../UIComponents/UIComponents";

const Main = (props) => {
  const [broker, setBroker] = useState(null);
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    fetch("/describeCluster")
      .then((res) => res.json())
      .then((res) => {
        setBroker(res);
      })
      .catch((err) => {
        console.log("Error in getting brokers:", err);
      });

    fetch("/describeAllTopics")
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 500) {
          setTopic(res);
        }
      })
      .catch((err) => {
        console.log("Error in getting topics:", err);
      });
  }, []);

  if (props.status === "false") {
    return (
      <div>
        <ModalBackground>
          <TopicDisplay topicData={topic} />
        </ModalBackground>
        <StartCluster />
      </div>
    );
  } else {
    return (
      <RootDiv className="root">
        <BrokerDisplay brokerData={broker} />
        <TopicDisplay topicData={topic} />
      </RootDiv>
    );
  }
};

export default Main;
