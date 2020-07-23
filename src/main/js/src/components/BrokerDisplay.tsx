import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import {
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/StyledGrid";
import { StyledGridTitle } from "../UIComponents/StyledGridTitle";
import { FullWidthDiv } from "../UIComponents/UIComponents";
import { BrokerConfig } from "./BrokerConfig";
import { Button } from "../UIComponents/Buttons";

export const BrokerDisplay = (props) => {
  const headers = ["ID", "Host", "Port", "Controller", "# of Partitions"];

  const handleClick = () => {}

  return (
    <FullWidthDiv>
      <h3>Brokers</h3>
      <Popup trigger={<Button>Add Broker</Button>} position="right center">
        <BrokerConfig />
      </Popup>
      {/* <StyledGridTitle
        title="Brokers"
        buttonText="+ Add Broker"
        handleClick={handleClick}
      /> */}
      <GridContainer columns={headers.length}>
        <HeaderRow headers={headers} />
        {props.brokerData && Object.keys(props.brokerData.nodes).map((key) => (
          <BrokerRow
            id={key}
            data={props.brokerData.nodes[key]}
            controller={props.brokerData.controller}
          />
        ))}
      </GridContainer>
    </FullWidthDiv>
  );
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
