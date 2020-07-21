import React, { useState, useEffect } from "react";
import {
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/StyledGrid";
import { StyledGridTitle } from "../UIComponents/StyledGridTitle";

export const BrokerDisplay = () => {
  const [response, setResponse] = useState(null);
  const headers = [
    "Address",
  ];

  const handleClick = () => {};

  useEffect(() => {
    fetch("/describeCluster")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setResponse(res);
      })
      .catch((err) => {
        console.log("Error in getting brokers:", err);
      });
  }, []);

  if (response === null) return null;
  else {
    return (
      <div>
        <StyledGridTitle title="Brokers" buttonText="+ Add Broker" handleClick={handleClick} />
        <GridContainer columns={headers.length}>
          <HeaderRow headers={headers} />
          {Object.keys(response).map((key) => (
            <BrokerRow name={key} data={response[key]} />
          ))}
        </GridContainer>
      </div>
    );
  }
};

const BrokerRow = (props) => {
  // content strings should be in the same order as headers
  console.log("inside broker row");
  const content: string[] = [props.name];

  content.push(props.data.partition.length);
  content.push(props.data.replicas.length);
  content.push(props.data.leader[0].id);

  return <ContentRow content={content} />;
}