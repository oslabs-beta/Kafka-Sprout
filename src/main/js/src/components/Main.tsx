import React from "react";
import { Topics } from "./Topics";
import { StartCluster } from "./StartCluster";
import { ModalBackground } from "../UIComponents/StyledModal";

const Main = () => {
  return (
    <div>
      <ModalBackground>
        <Topics />
      </ModalBackground>
      <StartCluster />
    </div>
  );
};

export default Main;
