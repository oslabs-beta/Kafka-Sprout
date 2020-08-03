import React, { useState } from 'react';
import { Button } from '../UIComponents/Buttons';
import { StyledLabeledInput } from '../UIComponents/StyledLabeledInput';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
`;

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
    <Container>
      <label htmlFor='topicNames'>Select a topic to delete:</label>
      <select id='topicNames'>
        {props.topicNames.sort().map(name => <option value={name}>{name}</option>)}
      </select>
      <Button>Delete Topic</Button>
      {error.length > 0 && <div>{error}</div>}
    </Container>
  );
};

export default TopicDelete;
