import React from 'react';
import ReactDOM from 'react-dom';
import { RootDiv, Form, Button, StyledLabeledInput } from './UIComponents';
//// Javas black box for making requests to the API 
//const client = require('./client');

function App() {
  const handleClick = (e) => {
    e.preventDefault();
    //client({method: 'GET', path: '/startCluster'}).done(response => {
    //  //this.setState({employees: response.entity._embedded.employees});
    //  console.log(response);
		//});

    fetch('/startCluster')
    //when response from RestController is just a Java String
    //Content-Type is set to text/plain;charset=UTF-8 so can't use .json()
    //.then(res => res.json())
    .then(res => res.text())
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

ReactDOM.render(<App />, document.querySelector('#root'));