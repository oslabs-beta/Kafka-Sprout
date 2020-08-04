import React, { useState, ReactEventHandler } from 'react';
import PopupContainer from '../UIComponents/PopupContainer';
import { Button } from '../UIComponents/Buttons';

interface TopicDeleteProps {
  topicNames: string[]
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
      body: JSON.stringify({ name: value}),
    }).then((response) => console.log(response))
    .catch(err => {
      setError('Error in deleting topic: ' + err);
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <PopupContainer>
      <label htmlFor='topicNames'>Select a topic to delete:</label>
      <select value={value} id='topicNames' onChange={handleChange}>
        {props.topicNames.sort().map(name => <option key={name} value={name}>{name}</option>)}
      </select>
      <Button onClick={handleSubmit}>Delete Topic</Button>
      {error.length > 0 && <div>{error}</div>}
    </PopupContainer>
  );
};

export default TopicDelete;
