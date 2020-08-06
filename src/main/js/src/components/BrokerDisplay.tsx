import React, { useState, useEffect } from "react";
import FlexContainer from '../UIComponents/FlexContainer';
import {
  GridContainer,
  HeaderRow,
  BrokerRow,
} from "../UIComponents/Grid";
import { GridTitleContainer, GridTitle } from "../UIComponents/GridTitle";
import { ButtonWithPopup } from "../UIComponents/Buttons";
import { BrokerConfig } from "./BrokerConfig";

export const BrokerDisplay = props => {
  const [brokerConfig, setBrokerConfig] = useState([]);

  const updateList = async () => {
    const res = await fetch("/describeTopicAndBrokerConfig");
    const data = await res.json();
    setBrokerConfig(data.Brokers);
  };

  useEffect(() => {
    updateList();
  }, []);

  const headers = props.brokerData[0];
  const rows = props.brokerData.slice(1, props.brokerData.length);

  return (
    <FlexContainer
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      addlStyles={
        `width: 100%;
        height: 100%;
        overflow-x: auto;
        & > * {
          width: 100%;
          max-width: 50rem;
        }`
      }
    >
      <GridTitleContainer>
        <GridTitle>Brokers</GridTitle>
        <ButtonWithPopup
          popup={<BrokerConfig updateBrokerList={props.updateBrokerList} />}
        >
          + Add Broker
        </ButtonWithPopup>
      </GridTitleContainer>
      <GridContainer columns={headers.length}>
        <HeaderRow content={headers} />
        {rows.map((row, index) => (
          <BrokerRow key={index} content={row} rowNum={index} configInfo={brokerConfig}/>
        ))}
      </GridContainer>
    </FlexContainer>
  );
};

export default BrokerDisplay;
