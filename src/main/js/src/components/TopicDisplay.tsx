import React, { useState, useEffect } from "react";
import {
  GridSectionContainer,
  GridContainer,
  HeaderRow,
  ContentRow,
  TopicRow,
} from "../UIComponents/GridSection";
import { GridTitleContainer, GridTitle } from "../UIComponents/GridTitle";
import { ButtonWithPopup, WhiteButtonWithPopup } from "../UIComponents/Buttons";
import TopicConfig from "./TopicConfig";
import TopicDelete from "./TopicDelete";
import TopicDoughnut from "./TopicDoughnut";

const TopicDisplay = (props) => {
  const [topicConfig, setTopicConfig] = useState([]);

  const updateList = async () => {
    const res = await fetch("/describeTopicAndBrokerConfig");
    const data = await res.json();
    setTopicConfig(data.Topic);
  };

  useEffect(() => {
    updateList();
  }, []);

  const headers = props.topicData[0];
  const rows = props.topicData.slice(1, props.topicData.length);
  // NOTE: this relies on the topic name always being the first thing in the row'
  const topicNames = rows.map((row) => row[0]);

  console.log(topicConfig);
  return (
    // name, leader, partition, replica
    <GridSectionContainer>
      <GridTitleContainer>
        <GridTitle>Topics</GridTitle>
        <ButtonWithPopup
          popup={<TopicConfig updateTopicList={props.updateTopicList} />}
        >
          + Add Topic
        </ButtonWithPopup>
        <WhiteButtonWithPopup
          popup={
            <TopicDelete
              topicNames={topicNames}
              updateTopicList={props.updateTopicList}
            />
          }
        >
          Delete Topic
        </WhiteButtonWithPopup>
      </GridTitleContainer>
      <GridContainer columns={headers.length}>
        <HeaderRow content={headers} />
        {rows.map((row, index) => (
          <TopicRow key={index} content={row} configInfo={topicConfig} rowNum={index}/>
        ))}
      </GridContainer>
      <TopicDoughnut content={rows} />
    </GridSectionContainer>
  );
};

export default TopicDisplay;
