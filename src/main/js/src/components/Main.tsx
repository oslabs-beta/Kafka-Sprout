import React, { useState, useEffect } from "react";
import { TopicDisplay } from "./TopicDisplay";
import { BrokerDisplay } from "./BrokerDisplay";
import { StartCluster } from "./StartCluster";
import { ModalBackground } from "../UIComponents/StyledModal";
import { RootDiv } from "../UIComponents/UIComponents";

const Main = (props) => {
  const [broker, setBroker] = useState(null);
  const [topic, setTopic] = useState(null);

  const updateList = () => {
    fetch("/describeEverything")
    .then(res => res.json())
    .then(res => {
      console.log('describeEverything', res);
      setTopic(res.Topics);
      setBroker(res.Brokers);
    })
  }

  useEffect(() => {
    updateList();
  }, [])

  if (props.status === "false") {
    return (
      <RootDiv>
        <ModalBackground>
          {broker && <BrokerDisplay brokerData={broker} />}
          {topic && <TopicDisplay topicData={topic} />}
        </ModalBackground>
        <StartCluster />
      </RootDiv>
    );
  } else {
    return (
      <RootDiv>
        {broker && <BrokerDisplay brokerData={broker} updateBrokerList={updateList} />}
        {topic && <TopicDisplay topicData={topic} />}
      </RootDiv>
    );
  }
};

export default Main;
