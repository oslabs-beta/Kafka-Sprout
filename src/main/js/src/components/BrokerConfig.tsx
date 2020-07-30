import React, { useState } from 'react';
import { Button } from "../UIComponents/Buttons";
import { StyledLabeledInput } from "../UIComponents/StyledLabeledInput";
import styled from "styled-components";

interface ConfigModel {
  // broker.id
  broker_id: number;
  // log.dirs
  directory: string;
  // listeners PLAINTEST://:9093
  port: string;
  // path to save properties file
  properties: string;
}

const Container = styled.div`
padding: 0.5rem;
box-sizing: border-box;
`

type Props = {
  [key: string]: any;
};

export const BrokerConfig: React.FC<Props> = (props: Props) => {
  const [config, setConfig] = useState<ConfigModel>({ broker_id: null, directory: "", port: "", properties: "" });

  const updateConfig = e => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    fetch("/startBroker", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    })
      .then(res => res.json())
      .then(res => {
        console.log('response from broker', res);
        if (res === true) {
          console.log('running updateBrokerLIst')
          props.updateBrokerList();
        }
      })
  }

  return (
    <Container>
      <StyledLabeledInput
        vertical
        name={'broker_id'}
        labelText={'Broker ID'}
        toolTipText={'Provide a unique ID number (e.g. 13)'}
        onChange={updateConfig}
      />
      <StyledLabeledInput
        vertical
        name={'directory'}
        labelText={'Data folder path'}
        toolTipText={'Provide path to folder to store logs (e.g. C:/kafka_2.13-2.5.0/data/kafka)'}
        onChange={updateConfig}
      />
      <StyledLabeledInput
        vertical
        name={'port'}
        labelText={'Port #'}
        toolTipText={'Provide a port to start broker on (e.g. 9092)'}
        onChange={updateConfig}
      />
      <StyledLabeledInput
        vertical
        name={'properties'}
        labelText={'Properties folder path'}
        toolTipText={'Provide path to folder to write configuration file to (e.g. C:/kafka_2.13-2.5.0/config)'}
        onChange={updateConfig}
      />
      <Button onClick={handleSubmit}>Start Broker</Button>
    </Container>
  )
}