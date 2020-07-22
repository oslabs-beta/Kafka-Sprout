import React from "react";
import { Topics } from "./Topics";
import { StartCluster } from "./StartCluster";
import { ModalBackground } from "../UIComponents/StyledModal";
import { RootDiv } from "../UIComponents/UIComponents";

const Main = (props) => {
  if (props.status === "false") {
    return (
      <div>
        <ModalBackground>
          <Topics />
        </ModalBackground>
        <StartCluster />
      </div>
    );
  } else {
    return (
      <RootDiv>
        <Topics />
      </RootDiv>
    );
  }
};

export default Main;
