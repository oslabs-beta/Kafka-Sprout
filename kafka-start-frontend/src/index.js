import { render } from 'react-dom';
import React from 'react';
import { RootDiv, Form, Button, StyledLabeledInput } from './UIComponents';

function App() {
  const handleClick = (e) => {
    e.preventDefault();
    //do something
    fetch('/startCluster')
    .then(res => res.json())
    .then(res => console.log(res))
    .catch();
    console.log(e.target.innerHTML);
  };

  return (
    <RootDiv className='root'>
      <Form>
        <StyledLabeledInput vertical name={'config files folder'} label={'Path to your config files folder:'} />
        <Button onClick={handleClick}>Start Cluster</Button>
      </Form>
    </RootDiv>
  );
}

render(<App />, document.querySelector('#root'));