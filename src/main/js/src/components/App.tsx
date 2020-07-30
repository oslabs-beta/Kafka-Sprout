import React, { useEffect, useState } from "react";
import StartZookeeper from "./StartZookeeper";
import Main from "./Main";
import Loader from "react-loader-spinner";
import constants from "../UIComponents/constants";
import { RootDiv } from "../UIComponents/UIComponents";

export const App = () => {
  // State hook for Zookeeper server status
  const [status, setStatus] = useState({
    zookeeper: "",
    kafka: ""
  })

  // Sends GET request when app initializes to receive status on Zookeeper server
  useEffect(() => {
    if (navigator.userAgent.toLowerCase().indexOf('windows') < 0) {
      fetch("/checkStatus")
        .then((res) => res.json())
        // STATUS STRUCTURE
        // { zookeeper: "Online"/"Offline", kafka: "true"/"false"}
        .then((status) => {
          console.log(status);
          setStatus(status);
        })
        .catch((err) => {
          console.log("erorrroror <3 mmmmm", err);
        });
    }
    else {
      setStatus({
        zookeeper: "Online",
        kafka: "true"
      });
    }
  }, []);

  if (status.zookeeper === "Offline") {
    return <StartZookeeper setStatus={setStatus} />;
  } else if (status.zookeeper === "Online") {
    return <Main status={status.kafka} />;
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
