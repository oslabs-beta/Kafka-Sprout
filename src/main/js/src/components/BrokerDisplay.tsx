import React, { useState, useEffect } from "react";
import {
  GridSectionContainer,
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/GridSection";
import { StyledGridTitle } from "../UIComponents/StyledGridTitle";
import { BrokerConfig } from "./BrokerConfig";


export const BrokerDisplay = (props) => {
  const headers = props.brokerData[0];
  const rows = props.brokerData.slice(1, props.brokerData.length);
  return (
    <GridSectionContainer>
      <StyledGridTitle
        title="Brokers"
        buttonText="+ Add Broker"
        popup={<BrokerConfig updateBrokerList={props.updateBrokerList}/>}
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
