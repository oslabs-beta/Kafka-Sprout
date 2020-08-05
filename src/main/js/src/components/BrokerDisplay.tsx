import React, { useState, useEffect } from "react";
import {
  GridSectionContainer,
  GridContainer,
  HeaderRow,
  ContentRow,
  BrokerRow,
} from "../UIComponents/GridSection";
import { GridTitleContainer, GridTitle } from "../UIComponents/GridTitle";
import { ButtonWithPopup } from "../UIComponents/Buttons";
import { BrokerConfig } from "./BrokerConfig";

export const BrokerDisplay = (props) => {
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
  console.log("DATA FROM BROKER DISPLAY", brokerConfig);
  return (
    <GridSectionContainer>
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
    </GridSectionContainer>
  );
};

export default BrokerDisplay;
