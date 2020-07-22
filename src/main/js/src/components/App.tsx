import React, { useEffect, useState } from "react";
import StartZookeeper from "./StartZookeeper";
import Main from "./Main";
import Loader from "react-loader-spinner";
import constants from "../UIComponents/constants";
import { RootDiv } from "../UIComponents/UIComponents";

export const App = () => {
  // State hook for Zookeeper server status
  const [zkStatus, setZkStatus] = useState("");
  const [kafkaStatus, setKafkaStatus] = useState("");

  // Sends GET request when app initializes to receive status on Zookeeper server
  useEffect(() => {
    fetch("/checkStatus")
      .then((res) => res.json())
      // STATUS STRUCTURE
      // { zookeeper: "Online"/"Offline", kafka: "true"/"false"}
      .then((status) => {
        setZkStatus(status.zookeeper);
        setKafkaStatus(status.kafka);
      })
      .catch((err) => {
        console.log("erorrroror <3 mmmmm", err);
      });
  });

  if (zkStatus === "Offline") {
    return <StartZookeeper />;
  } else if (zkStatus === "Online") {
    return <Main status={kafkaStatus} />;
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
