import React, { useState } from 'react';
import PopupContainer from '../UIComponents/PopupContainer';
import { Button } from '../UIComponents/Buttons';
import LabeledDropdown from '../UIComponents/LabeledDropdown';

interface TopicDeleteProps {
  topicNames: string[]
  [key: string]: any
}

const TopicDelete = (props: TopicDeleteProps) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    fetch('/deleteTopics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: value }),
    })
      .then(res => {
        if (res.ok) {
          props.updateTopicList();
          setError('');
        }
        else {
          setError('Error in deleting topic');
        }
      });
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  if (navigator.userAgent.toLowerCase().indexOf('windows') > 0) {
    return (
      <PopupContainer>
        <p>
          Safely deleting topics is not possible on Windows OS,
          as documented in <a target='_blank' href='https://issues.apache.org/jira/browse/KAFKA-1194'>KAFKA-1194</a>.
        </p>
        <p>
          If you tried to delete a topic and the cluster fails to start because of an AccessDeniedException,
          try deleting the contents of the kafka and zookeeper folders in your Kafka data folder.
        </p>
      </PopupContainer>)
  } else {
    return (
      <PopupContainer>
        <LabeledDropdown
          name='topicNames'
          label='Select a topic to delete:'
          options={props.topicNames} 
          onChange={handleChange}
        />
        {/*<label htmlFor='topicNames'>Select a topic to delete:</label>
        <select value={value} id='topicNames' onChange={handleChange}>
          {props.topicNames.sort().map(name => <option key={name} value={name}>{name}</option>)}
        </select>*/}
        <Button onClick={handleSubmit}>Delete Topic</Button>
        {error.length > 0 && <div>{error}</div>}
      </PopupContainer>
    );
  }
};

export default TopicDelete;
