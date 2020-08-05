import React from "react";
import { RootDiv } from "../UIComponents/RootDiv"
import { StartClusterButton } from "../UIComponents/Buttons";

export const StartCluster = () => {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <RootDiv>
      <StartClusterButton onClick={handleClick}>
        Start Cluster
      </StartClusterButton>
    </RootDiv>
  );
};
