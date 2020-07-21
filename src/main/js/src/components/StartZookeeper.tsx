import React, { useState, useEffect } from "react";
import { StyledLabeledInput } from "../UIComponents/StyledLabeledInput";
import { RootDiv, Form, Button } from "../UIComponents/UIComponents";

export const StartZookeeper = () => {
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
      //when response from RestController is just a Java String
      //Content-Type is set to text/plain;charset=UTF-8 so can't use .json()
      //.then(res => res.json())
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    console.log(e.currentTarget.innerHTML);
  };

  return (
    <RootDiv>
      <h1 id="hello">Hello</h1>
      <Form>
        <StyledLabeledInput
          vertical
          refToPass={configPathRef}
          name={"config files folder"}
          label={"Path to your config files folder:"}
        />
        <Button onClick={handleClick}>Start Cluster</Button>
      </Form>
    </RootDiv>
  );
};

export default StartZookeeper;
