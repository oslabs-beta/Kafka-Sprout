import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { RootDiv, Form, Button, StyledLabeledInput } from './UIComponents';

function App() {
  const handleClick = (e) => {
    e.preventDefault();

    fetch('/startCluster')
    //when response from RestController is just a Java String
    //Content-Type is set to text/plain;charset=UTF-8 so can't use .json()
    //.then(res => res.json())
    .then(res => res.text())
    .then(res => console.log(res))
    .catch();
    console.log(e.target.innerHTML);
  };

  useEffect(() => {
    console.log('page loaded');
      }
  )

  return (
    <RootDiv className='root'>
      <Form>
        <StyledLabeledInput vertical name={'config files folder'} label={'Path to your config files folder:'} />
        <Button onClick={handleClick}>Start Cluster</Button>
      </Form>
    </RootDiv>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));