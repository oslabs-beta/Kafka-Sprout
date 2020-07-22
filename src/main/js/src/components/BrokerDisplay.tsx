import React, { useState, useEffect } from "react";
import {
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/StyledGrid";
import { StyledGridTitle } from "../UIComponents/StyledGridTitle";
import { FullWidthDiv } from "../UIComponents/UIComponents";

export const BrokerDisplay = () => {
  const [response, setResponse] = useState(null);
  const headers = ["ID", "Host", "Port", "Controller", "# of Partitions"];

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
      <FullWidthDiv>
        <StyledGridTitle
          title="Brokers"
          buttonText="+ Add Broker"
          handleClick={handleClick}
        />
        <GridContainer columns={headers.length}>
          <HeaderRow headers={headers} />
          {Object.keys(response.nodes).map((key) => (
            <BrokerRow
              id={key}
              data={response.nodes[key]}
              controller={response.controller}
            />
          ))}
        </GridContainer>
      </FullWidthDiv>
    );
  }
};

const BrokerRow = (props) => {
  const content: string[] = [props.id];

  content.push(props.data.host);
  content.push(props.data.port);
  if (
    JSON.stringify(props.controller[props.id]) === JSON.stringify(props.data)
  ) {
    content.push("Yes");
  } else {
    content.push("No");
  }

  content.push("NEED TO GET PARTITIONS");

  return <ContentRow content={content} />;
};
