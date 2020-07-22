import React, { useState, useEffect } from "react";
import {
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/StyledGrid";
import { StyledGridTitle } from "../UIComponents/StyledGridTitle";
import { FullWidthDiv } from "../UIComponents/UIComponents";

export const TopicDisplay = (props) => {
  const [click, setClick] = useState(false);
  const headers = ["Name", "# of Partitions", "Replicas", "Leader"];

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

  console.log("props.topic", props.topic);
  if (!props.topic) return null;
  else {
    return (
      // name, leader, partition, replica
      <FullWidthDiv>
        <StyledGridTitle
          title="Topics"
          buttonText="+ Add Topic"
          handleClick={handleClick}
        />
        <GridContainer columns={headers.length}>
          <HeaderRow headers={headers} />
          {Object.keys(props.topic).map((key) => (
            <TopicRow name={key} data={props.topic[key]} />
          ))}
        </GridContainer>
      </FullWidthDiv>
    );
  }
};

const TopicRow = (props) => {
  // content strings should be in the same order as headers
  // console.log("inside topic row");
  const content: string[] = [props.name];

  content.push(props.data.partition.length);
  content.push(props.data.replicas.length);
  content.push(props.data.leader[0].id);

  return <ContentRow content={content} />;
};
