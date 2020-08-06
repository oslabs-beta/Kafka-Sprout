import React, { useState, useEffect } from "react";
import LabeledInput from "../UIComponents/LabeledInput";
import FlexContainer from "../UIComponents/FlexContainer";
import { StartClusterButton } from "../UIComponents/Buttons";
import Loader from "react-loader-spinner";
import constants from "../UIComponents/constants";

const StartZookeeper = (props) => {
  const [configPath, setConfigPath] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e) => {
    setConfigPath(e.target.value);
  };

  const getPath = () => {
    fetch("/getPath", {
      method: "GET",
    })
      .then((res) => res.text())
      .then((res) => setConfigPath(res));
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let path = configPath.trim();
    path = path.replace(/\\/g, "\\\\");

    const request = { path };

    fetch("/startCluster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        if (res === true) {
          props.setStatus({
            zookeeper: "Online",
            kafka: "true",
          });
          setError("");
        } else {
          throw new Error("Error in starting cluster");
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    getPath();
  }, []);

  return (
    <FlexContainer
      flexDirection="column"
      addlStyles={`width: 100%; 
      height: 100%;
      & > * {
        margin: 0.5rem 0;
      }`}
    >
      <h1>Hello</h1>
      <LabeledInput
        vertical
        name={"config files folder"}
        labelText={"Path to your config files folder:"}
        onChange={handleChange}
        value={configPath}
        alignItems="center"
      />
      {isLoading ? (
        <Loader
          type="Hearts"
          color={constants.LIGHTER_GREEN}
          height={80}
          width={80}
        />
      ) : (
        <StartClusterButton
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Start Cluster
        </StartClusterButton>
      )}
      {error.length > 0 && <div>{error}</div>}
    </FlexContainer>
  );
};

export default StartZookeeper;
