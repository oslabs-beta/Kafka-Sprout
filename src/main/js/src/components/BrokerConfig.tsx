import React, { useState, useEffect } from 'react';
import PopupContainer from '../UIComponents/PopupContainer';
import { Button } from "../UIComponents/Buttons";
import { StyledLabeledInput } from "../UIComponents/LabeledInput";
import Loader from 'react-loader-spinner';
import constants from '../UIComponents/constants';

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

type Props = {
  [key: string]: any;
};

export const BrokerConfig: React.FC<Props> = (props: Props) => {
  const [config, setConfig] = useState<ConfigModel>({ broker_id: null, directory: '', port: '', properties: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const updateConfig = e => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value
    });
  };

  const getProperties = () => {
    fetch('/getProperties', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setConfig({
          properties: res.path,
          directory: res.logPath,
          broker_id: res.id,
          port: res.port
        });
      });
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleSubmit = () => {
    const validateConfig = { ...config };
    // C:\kafka_2.12-2.5.0\config --> C:\\kafka_2.12-2.5.0\\config
    validateConfig.directory = validateConfig.directory.replace(/\\/g, '\\\\');
    validateConfig.properties = validateConfig.properties.replace(/\\/g, '\\\\');
    setLoading(true);
    fetch("/startBroker", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validateConfig)
    })
      .then(res => res.text())
      .then(res => {
        setLoading(false)
        if (res === 'true') {
          props.updateBrokerList();
          setError('');
        }
        else {
          throw new Error(res);
        }
      })
      .catch(err => {
        setError('Error in starting broker: ' + err);
      });
  };

  return (
    <PopupContainer>
      <StyledLabeledInput
        vertical
        name={'broker_id'}
        labelText={'Broker ID'}
        toolTipText={'Provide a unique ID number (e.g. 13)'}
        onChange={updateConfig}
        value={config.broker_id}
      />
      <StyledLabeledInput
        vertical
        name={'directory'}
        labelText={'Data folder path'}
        toolTipText={'Provide path to folder to store logs (e.g. C:/kafka_2.13-2.5.0/data)'}
        onChange={updateConfig}
        value={config.directory}
      />
      <StyledLabeledInput
        vertical
        name={'port'}
        labelText={'Port #'}
        toolTipText={'Provide a port to start broker on (e.g. 9092)'}
        onChange={updateConfig}
        value={config.port}
      />
      <StyledLabeledInput
        vertical
        name={'properties'}
        labelText={'Properties folder path'}
        toolTipText={'Provide path to folder to write configuration file to (e.g. C:/kafka_2.13-2.5.0/config)'}
        onChange={updateConfig}
        value={config.properties}
      />
      {loading ? <Loader type="TailSpin" color={constants.LIGHTER_GREEN} height={30} width={30}/> : <Button onClick={handleSubmit}>Start Broker</Button>}
      {error.length > 0 && <div>"please try again \n" {error}</div>}
    </PopupContainer>
  );
};