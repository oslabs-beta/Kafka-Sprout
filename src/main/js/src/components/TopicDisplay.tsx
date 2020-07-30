import React, { useState } from "react";
import {
  GridSectionContainer,
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/GridSection";
import { StyledGridTitle } from "../UIComponents/StyledGridTitle";

export const TopicDisplay = (props) => {
  const [click, setClick] = useState(false);

  // TODO: add elements to get user input (name, number of partitions, replicas)
  const handleClick = () => {
    // Create a modal form
    setClick(true);

    const name = "";
    const partitions = 0;
    const replicas = 0;

    // Make a post request to add topic
    fetch("/addTopic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        partitions,
        replicas,
      }), // add data from input
    });
  };

  const headers = props.topicData[0];
  const rows = props.topicData.slice(1, props.topicData.length);
  return (
    // name, leader, partition, replica
    <GridSectionContainer>
      <StyledGridTitle
        title="Topics"
        buttonText="+ Add Topic"
        handleClick={handleClick}
        
      />
      <GridContainer columns={headers.length}>
        <HeaderRow headers={headers} />
        {rows.map(row => (
          <ContentRow content={row}/>
        ))}
      </GridContainer>
    </GridSectionContainer>
  );
};