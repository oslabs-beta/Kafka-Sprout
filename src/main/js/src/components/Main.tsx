import React from "react";
import { TopicDisplay } from "./TopicDisplay";
import { StartCluster } from "./StartCluster";
import { ModalBackground } from "../UIComponents/StyledModal";

const Main = () => {
  return (
    <div>
      <ModalBackground>
        <TopicDisplay />
      </ModalBackground>
      <StartCluster />
    </div>
  );
};

export default Main;
