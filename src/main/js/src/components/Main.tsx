import React, { useState, useEffect } from "react";
import { TopicDisplay } from "./TopicDisplay";
import { StartCluster } from "./StartCluster";
import { ModalBackground } from "../UIComponents/StyledModal";
import { BrokerDisplay } from "./BrokerDisplay";
import { RootDiv } from "../UIComponents/UIComponents";

const Main = () => {
  // cluster is false, meaning that there are no clusters
  const [cluster, setCluster] = useState(true);

  if (cluster === false) {
    return (
      <div>
        <ModalBackground>
          <BrokerDisplay />
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
    )
  }
};

export default Main;
