import React, {useState} from 'react';
import ReactTooltip from "react-tooltip";

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

export const BrokerConfig: React.FC = () => {
  const [config, setConfig] = useState<ConfigModel>({broker_id: null, directory: "", port: "", properties: ""});

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
  }

  return(
    <div>
      <label data-tip data-for="broker_id">
        BROKER ID ⍰: 
        <input type="text" name="broker_id" onChange={updateConfig}/>
      </label>
      <ReactTooltip id="broker_id" place="top" effect="solid">
        Provide a unique ID number (e.g. 13)
      </ReactTooltip>
      <label data-tip data-for="directory">
        DIRECTORY ⍰: 
        <input type="text" name="directory" onChange={updateConfig}/>
      </label>
      <ReactTooltip id="directory" place="top" effect="solid">
        Provide path to folder to store logs (e.g. C:/kafka_2.13-2.5.0/data/kafka)
      </ReactTooltip>
      <label data-tip data-for="port">
        PORT ⍰: 
        <input type="text" name="port" onChange={updateConfig}/>
      </label>
      <ReactTooltip id="port" place="top" effect="solid">
        Provide a port to start broker on (e.g. 9092)
      </ReactTooltip>
      <label data-tip data-for="properties">
        PROPERTIES FOLDER ⍰: 
        <input type="text" name="properties" onChange={updateConfig}/>
      </label>
      <ReactTooltip id="properties" place="top" effect="solid">
        Provide path to folder to write configuration file to (e.g. C:/kafka_2.13-2.5.0/config)
      </ReactTooltip>
      <button onClick={handleSubmit}> START BROKER SERVER </button>
    </div>
  )
}