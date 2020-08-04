import React, { useState, useEffect } from 'react';
import TopicDisplay from './TopicDisplay';
import BrokerDisplay from './BrokerDisplay';
import { StartCluster } from './StartCluster';
import { ModalBackground } from '../UIComponents/StyledModal';
import { RootDiv } from '../UIComponents/UIComponents';
import Loader from 'react-loader-spinner';
import constants from '../UIComponents/constants';
import MetricsDisplay from './MetricsDisplay';

const Main = (props) => {
  const [broker, setBroker] = useState(null);
  const [topic, setTopic] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateBrokerList = () => {
    fetch('/describeBrokers')
      .then((res) => res.json())
      .then((res) => {
        console.log('describeBrokers', res);
        setBroker(res);
      })
      .catch((err) => {
        console.log('Error in getting brokers', err);
      });
  };

  const updateList = async () => {
    const res = await fetch('/describeTopicsAndBrokers');
    if (!res.ok) {
      console.log('Error in loading data', res);
    }
    const data = await res.json();
    setTopic(data.Topics);
    setBroker(data.Brokers);
  };

  useEffect(() => {
    updateList().then(() => setIsLoaded(true));
  }, []);

  //console.log('NEW RENDER');
  //console.log('brokerdata', broker);
  //console.log('topicData', topic);
  if (isLoaded) {
    console.log('isLoaded');
    if (props.status === 'false') {
      return (
        <RootDiv>
          <ModalBackground>
            <BrokerDisplay brokerData={broker} />
            <TopicDisplay topicData={topic} />
          </ModalBackground>
          <StartCluster />
        </RootDiv>
      );
    } else {
      return (
        <RootDiv>
          <MetricsDisplay />
          <BrokerDisplay
            brokerData={broker}
            updateBrokerList={updateBrokerList}
          />
          <TopicDisplay topicData={topic} />
        </RootDiv>
      );
    }
  } else
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
};

export default Main;
