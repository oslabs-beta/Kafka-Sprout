import React, { useState, useEffect } from 'react';
import FlexContainer from '../UIComponents/FlexContainer';
import {
  GridContainer,
  HeaderRow,
  ContentRow,
  TopicRow,
} from '../UIComponents/GridSection';
import { GridTitleContainer, GridTitle } from '../UIComponents/GridTitle';
import { ButtonWithPopup, WhiteButtonWithPopup } from '../UIComponents/Buttons';
import TopicConfig from './TopicConfig';
import TopicDelete from './TopicDelete';
import TopicDoughnut from './TopicDoughnut';

const TopicDisplay = props => {
  const [topicConfig, setTopicConfig] = useState([]);

  const updateList = async () => {
    const res = await fetch('/describeTopicAndBrokerConfig');
    const data = await res.json();
    setTopicConfig(data.Topic);
  };

  useEffect(() => {
    updateList();
  }, []);

  const headers = props.topicData[0];
  const rows = props.topicData.slice(1, props.topicData.length);
  // NOTE: this relies on the topic name always being the first thing in the row'
  const topicNames = rows.map(row => row[0]);

  return (
    <FlexContainer
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      addlStyles={
        `width: 100%;
        height: 100%;
        overflow-x: auto;
        & > * {
          width: 100%;
          max-width: 50rem;
        }`
      }
    >
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
          <TopicRow key={index} content={row} configInfo={topicConfig} rowNum={index} />
        ))}
      </GridContainer>
      <TopicDoughnut content={rows} />
    </FlexContainer>
  );
};

export default TopicDisplay;
