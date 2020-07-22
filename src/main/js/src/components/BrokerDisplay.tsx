import React, { useState, useEffect } from "react";
import {
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/StyledGrid";
import { StyledGridTitle } from "../UIComponents/StyledGridTitle";
import { FullWidthDiv } from "../UIComponents/UIComponents";

export const BrokerDisplay = (props) => {
  const headers = ["ID", "Host", "Port", "Controller", "# of Partitions"];

  const handleClick = () => {};

  if (props.brokerData === null) return null;
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
          {Object.keys(props.brokerData.nodes).map((key) => (
            <BrokerRow
              id={key}
              data={props.brokerData.nodes[key]}
              controller={props.brokerData.controller}
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
