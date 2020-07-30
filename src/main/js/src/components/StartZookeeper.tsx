import React, { useState, useEffect } from "react";
import { StyledLabeledInput } from "../UIComponents/StyledLabeledInput";
import { RootDiv, Form } from "../UIComponents/UIComponents";
import { StartClusterButton } from "../UIComponents/Buttons";

const StartZookeeper = (props) => {
  const [configPath, setConfigPath] = useState<String>('');
  const [error, setError] = useState<String>('')

  const handleChange = (e) => {
    setConfigPath(e.target.value);
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("test value", configPath);
    let path = configPath.trim();
    path = path.replace(/\\/g, '\\\\');
    const request = { path };
    fetch("/startCluster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then(res => res.json())
      .then(res => {
        console.log('startCluster response', res);
        if (res === true) {
          props.setStatus({
            zookeeper: "Online",
            kafka: "true"
          });
          setError('');
        } else {
          throw new Error('Error in starting cluster');
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <RootDiv>
      <h1 id="hello">Hello</h1>
      <Form>
        <StyledLabeledInput
          vertical
          name={"config files folder"}
          labelText={"Path to your config files folder:"}
          onChange={handleChange}
        />
        <StartClusterButton onClick={handleClick}>
          Start Cluster
        </StartClusterButton>
        {error.length > 0 && <div>{error}</div>}
      </Form>
    </RootDiv>
  );
};

export default StartZookeeper;
