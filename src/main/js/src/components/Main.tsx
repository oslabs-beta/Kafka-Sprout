import React, { useState, useEffect } from "react";
import { TopicDisplay } from "./TopicDisplay";
import { BrokerDisplay } from "./BrokerDisplay";
import { StartCluster } from "./StartCluster";
import { ModalBackground } from "../UIComponents/StyledModal";
import { RootDiv } from "../UIComponents/UIComponents";

const Main = (props) => {
  const [broker, setBroker] = useState(null);
  const [topic, setTopic] = useState(null);

  // const updateBrokerList = () => {
  //   fetch("/describeCluster")
  //   .then(res => res.json())
  //   .then(res => {
  //     console.log(res)
  //     setBroker(res);
  //     console.log("setBroker ran")
  //   })
  //   .catch((err) => {
  //     console.log("Error in getting brokers:", err)
  //   })
  // };

  // useEffect(() => {
  //   updateBrokerList();

  //   fetch("/describeAllTopics")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.status !== 500) {
  //         setTopic(res);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error in getting topics:", err);
  //     });
  // }, []);

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
