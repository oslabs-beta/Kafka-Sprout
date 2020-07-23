import React, { useState, useEffect } from "react";
import { StyledLabeledInput } from "../UIComponents/StyledLabeledInput";
import { RootDiv, Form } from "../UIComponents/UIComponents";
import { StartClusterButton } from "../UIComponents/Buttons";

const StartZookeeper = (props) => {
  const configPathRef = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("test ref value", configPathRef.current);
    const path = configPathRef.current.value.trim();
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
          })
        } else {
          // hmmmm
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <RootDiv>
      <h1 id="hello">Hello</h1>
      <Form>
        <StyledLabeledInput
          vertical
          refToPass={configPathRef}
          name={"config files folder"}
          labelText={"Path to your config files folder:"}
        />
        <StartClusterButton onClick={handleClick}>
          Start Cluster
        </StartClusterButton>
      </Form>
    </RootDiv>
  );
};

export default StartZookeeper;
