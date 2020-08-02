import React, { useState } from 'react';
import {
  GridSectionContainer,
  GridContainer,
  HeaderRow,
  ContentRow,
} from '../UIComponents/GridSection';
import { StyledGridTitle } from '../UIComponents/StyledGridTitle';
import { TopicConfig } from './TopicConfig';

const TopicDisplay = (props) => {
  const headers = props.topicData[0];
  const rows = props.topicData.slice(1, props.topicData.length);
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
          <ContentRow content={row} />
        ))}
      </GridContainer>
    </GridSectionContainer>
  );
};

export default TopicDisplay;
