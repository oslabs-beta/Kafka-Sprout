import React, { useState } from 'react';
import PopupContainer from '../UIComponents/PopupContainer';
import { Button } from '../UIComponents/Buttons';

interface TopicDeleteProps {
  topicNames: string[]
}

const TopicDelete = (props: TopicDeleteProps) => {
  const [error, setError] = useState<String>('');

  //const handleSubmit = () => {
  //  console.log(config);
  //  fetch('/createTopics', {
  //    method: 'POST',
  //    headers: {
  //      'Content-Type': 'application/json',
  //    },
  //    body: JSON.stringify({
  //      name: config.name,
  //      partition: config.partition,
  //      replication: config.replication,
  //    }),
  //  }).then((response) => console.log(response));
  //};

  return (
    <PopupContainer>
      <label htmlFor='topicNames'>Select a topic to delete:</label>
      <select id='topicNames'>
        {props.topicNames.sort().map(name => <option value={name}>{name}</option>)}
      </select>
      <Button>Delete Topic</Button>
      {error.length > 0 && <div>{error}</div>}
    </PopupContainer>
  );
};

export default TopicDelete;
