import React, {useState} from 'react';
import ReactTooltip from "react-tooltip";

interface ConfigModel {
  // broker.id
  broker_id: number;
  // log.dirs
  directory: string;
  // listeners PLAINTEST://:9093
  port: string;
}

export const BrokerConfig: React.FC = () => {
  const [config, setConfig] = useState<ConfigModel>({broker_id: null, directory: "", port: ""});

  const updateConfig = e => {
    if (e.target.name === "port") {
      setConfig({
        ...config,
        port: "PLAINTEST://" + e.target.value,
      })  
    } else {
      setConfig({
        ...config,
        [e.target.name]: e.target.value
      });
    }
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
      <label>
        BROKER ID <img src="https://img.icons8.com/flat_round/64/000000/question-mark.png" data-tip data-for="broker_id"/>: 
        <input type="text" name="broker_id" onChange={updateConfig}/>
      </label>
      <ReactTooltip id="broker_id" place="top" effect="solid">
        Provide a unique ID number (e.g. 13)
      </ReactTooltip>
      <label>
        DIRECTORY <img src="https://img.icons8.com/flat_round/64/000000/question-mark.png" data-tip data-for="directory"/>: 
        <input type="text" name="directory" onChange={updateConfig}/>
      </label>
      <ReactTooltip id="directory" place="top" effect="solid">
        Provide a folder to store logs (e.g. C:/kafka_2.13-2.5.0/data/kafka)
      </ReactTooltip>
      <label>
        PORT <img src="https://img.icons8.com/flat_round/64/000000/question-mark.png" data-tip data-for="port"/>: 
        <input type="text" name="port" onChange={updateConfig}/>
      </label>
      <ReactTooltip id="port" place="top" effect="solid">
        Provide a port to start broker on (e.g. 9092)
      </ReactTooltip>
      <button onClick={handleSubmit}> START BROKER SERVER </button>
    </div>
  )
}