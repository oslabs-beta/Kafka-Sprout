import React, { useState, useEffect } from "react";
import { TopicDisplay } from "./TopicDisplay";
import { BrokerDisplay } from "./BrokerDisplay";
import { StartCluster } from "./StartCluster";
import { ModalBackground } from "../UIComponents/StyledModal";
import { RootDiv } from "../UIComponents/UIComponents";

const Main = (props) => {
  if (props.status === "false") {
    return (
      <div>
        <ModalBackground>
          <TopicDisplay />
        </ModalBackground>
        <StartCluster />
      </div>
    );
  } else {
    return (
      <RootDiv className="root">
        <BrokerDisplay />
        <TopicDisplay />
      </RootDiv>
    );
  }
};

export default Main;
