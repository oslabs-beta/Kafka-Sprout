import React, { useEffect, useState } from "react";
import StartZookeeper from "./StartZookeeper";
import Main from "./Main";
import Loader from "react-loader-spinner";
import constants from "../UIComponents/constants";
import { RootDiv } from "../UIComponents/UIComponents";

export const App = () => {
  // State hook for Zookeeper server status
  const [status, setStatus] = useState("Online");

  // Sends GET request when app initializes to receive status on Zookeeper server
  //useEffect(() => {
  //  fetch("/checkStatus")
  //    .then((res) => res.text())
  //    // .then(() => console.log("starting server"))
  //    .then((status) => setStatus(status))
  //    .catch((err) => {
  //      console.log("erorrroror <3 mmmmm", err);
  //    });
  //}, []);

  if (status === "Offline") {
    return <StartZookeeper />;
  } else if (status === "Online") {
    return <Main />;
  } else {
    // Load loading bar
    return (
      <RootDiv>
        <Loader
          type="Hearts"
          color={constants.LIGHTER_GREEN}
          height={80}
          width={80}
        />
      </RootDiv>
    );
  }
};
