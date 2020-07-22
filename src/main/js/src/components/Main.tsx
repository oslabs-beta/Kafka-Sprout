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
    const fetchData = async () => {
      await fetch("/describeCluster")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setBroker(res);
        })
        .catch((err) => {
          console.log("Error in getting brokers:", err);
        });

      await fetch("/describeAllTopics")
        .then((res) => res.json())
        .then((res) => {
          setTopic(res);
        })
        .catch((err) => {
          console.log("Error in getting topics:", err);
        });
    };

    fetchData();
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
        <TopicDisplay />
      </RootDiv>
    );
  }
};

export default Main;
