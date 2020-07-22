import React from "react";
import { Modal } from "../UIComponents/StyledModal";
import { StartClusterButton } from "../UIComponents/Buttons";

export const StartCluster = () => {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <Modal className="cluster">
      <StartClusterButton onClick={handleClick}>
        Start Cluster
      </StartClusterButton>
    </Modal>
  );
};
