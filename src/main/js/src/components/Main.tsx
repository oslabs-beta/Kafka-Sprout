import React, { useState, useEffect } from 'react';
import TopicDisplay from './TopicDisplay';
import BrokerDisplay from './BrokerDisplay';
import { RootDiv } from '../UIComponents/UIComponents';
import Loader from 'react-loader-spinner';
import constants from '../UIComponents/constants';

const Main = props => {
  const [broker, setBroker] = useState(null);
  const [topic, setTopic] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateBrokerList = () => {
    fetch('/describeBrokers')
      .then(res => res.json())
      .then(res => {
        setBroker(res);
      })
      .catch(err => {
        throw new Error('Error in getting brokers' + err);
      });
  };

  const updateTopicList = () => {
    fetch('/describeTopics')
      .then(res => res.json())
      .then(res => {
        setTopic(res);
      })
      .catch(err => {
        throw new Error('Error in getting topics' + err);
      });
  };

  const updateList = async () => {
    const res = await fetch('/describeTopicsAndBrokers');
    if (!res.ok) {
      throw new Error('Error in loading data' + res);
    }
    const data = await res.json();
    setTopic(data.Topics);
    setBroker(data.Brokers);
  };

  useEffect(() => {
    updateList().then(() => setIsLoaded(true));
  }, []);

  if (isLoaded) {
    if (props.status === 'false') {
      return (
        <RootDiv>
          <BrokerDisplay brokerData={broker} />
          <TopicDisplay topicData={topic} />
        </RootDiv>
      );
    } else {
      return (
        <RootDiv>
          <BrokerDisplay
            brokerData={broker}
            updateBrokerList={updateBrokerList}
          />
          <TopicDisplay topicData={topic} updateTopicList={updateTopicList} />
        </RootDiv>
      );
    }
  } else {
    return (
      <RootDiv>
        <Loader
          type='Hearts'
          color={constants.LIGHTER_GREEN}
          height={80}
          width={80}
        />
      </RootDiv>
    );
  }
};

export default Main;
