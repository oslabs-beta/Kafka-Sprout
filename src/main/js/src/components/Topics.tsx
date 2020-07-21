import React, { useState, useEffect } from "react";
import {
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/StyledGrid";
import { Button } from "../UIComponents/Buttons";

export const Topics = () => {
  const [response, setResponse] = useState(null);
  const [headers, setHeaders] = useState([
    "Name",
    "# of Partitions",
    "Replicas",
    "Leader",
  ]);
  useEffect(() => {
    fetch("/describeAllTopics")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setResponse(res);
      })
      .catch((err) => {
        console.log("Error in getting topics:", err);
      });
  }, []);

  if (response === null) return null;
  else {
    return (
      // name, leader, partition, replica
      <div>
        <span>
          <h3>Topics</h3> <Button>+ Add Topics</Button>
        </span>
        <GridContainer columns={headers.length}>
          <HeaderRow headers={headers} />
          {Object.keys(response).map((key) => (
            <TopicRow name={key} data={response[key]} />
          ))}
        </GridContainer>
      </div>
    );
  }
};

const TopicRow = (props) => {
  // content strings should be in the same order as headers
  console.log("inside topic row");
  const content: string[] = [props.name];

  content.push(props.data.partition.length);
  content.push(props.data.replicas.length);
  content.push(props.data.leader[0].id);

  return <ContentRow content={content} />;
};
