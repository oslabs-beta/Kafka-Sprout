import React, { useState, useEffect } from "react";
import {
  GridSectionContainer,
  GridContainer,
  HeaderRow,
  TopicRow,
  ConfigInfo,
} from "../UIComponents/GridSection";
import { ButtonWithPopup } from "../UIComponents/Buttons";
import { StyledGridTitle } from "../UIComponents/StyledGridTitle";
import { TopicConfig } from "./TopicConfig";

const TopicDisplay = (props) => {
  const headers = props.topicData[0];
  const rows = props.topicData.slice(1, props.topicData.length);

  const [topicConfig, setTopicConfig] = useState({});

  const updateList = async () => {
    const res = await fetch("/describeTopicAndBrokerConfig");
    const data = await res.json();
    console.log(data);
    setTopicConfig(data.Topic);
  };

  useEffect(() => {
    updateList();
  }, []);

  // useEffect(() => {
  //   fetch("/describeTopicAndBrokerConfig")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setBrokerList(res["Brokers"]);
  //       setTopicList(res["Topic"]);
  //     })
  //     .then(() => {
  //       console.log("THIS IS BROKER LIST", brokerList);
  //       console.log("THIS IS TOPIC LIST", topicList);
  //     });
  // }, [brokerList, topicList]);

  console.log("THIS IS TOPIC LIST", topicConfig);
  return (
    // name, leader, partition, replica
    <GridSectionContainer>
      <StyledGridTitle
        title="Topics"
        buttonText="+ Add Topic"
        popup={<TopicConfig updateBrokerList={props.updateBrokerList} />}
      />
      <GridContainer columns={headers.length}>
        <HeaderRow headers={headers} />
        {rows.map((row) => (
          <TopicRow content={row} />
        ))}
      </GridContainer>
    </GridSectionContainer>
  );
};

export default TopicDisplay;
