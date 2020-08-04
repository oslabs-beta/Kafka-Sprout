import React, { useState, useEffect } from "react";
import {
  GridSectionContainer,
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/GridSection";
import { GridTitleContainer, GridTitle } from "../UIComponents/GridTitle";
import { ButtonWithPopup } from "../UIComponents/Buttons";
import { BrokerConfig } from "./BrokerConfig";


export const BrokerDisplay = (props) => {
  const headers = props.brokerData[0];
  const rows = props.brokerData.slice(1, props.brokerData.length);
  return (
    <GridSectionContainer>
      <GridTitleContainer>
        <GridTitle>Brokers</GridTitle>
        <ButtonWithPopup popup={<BrokerConfig updateBrokerList={props.updateBrokerList} />}>
          + Add Broker
        </ButtonWithPopup>
      </GridTitleContainer>
      <GridContainer columns={headers.length}>
        <HeaderRow headers={headers} />
        {rows.map(row => (
          <ContentRow content={row} />
        ))}
      </GridContainer>
    </GridSectionContainer>
  );
};

export default BrokerDisplay;
