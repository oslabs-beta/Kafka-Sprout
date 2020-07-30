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
