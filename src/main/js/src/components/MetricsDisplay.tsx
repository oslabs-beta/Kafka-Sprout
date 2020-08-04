import React, { useRef } from 'react';
import { Button } from '../UIComponents/Buttons';
import SockJsClient from 'react-stomp';

const MetricsDisplay = () => {
  const clientRef = useRef(null);

  const handleClick = () => {
    console.log('im button');
    clientRef.current.sendMessage('/app/test', JSON.stringify({message: 'FROM SOCKET'}));
  }

  const client = <SockJsClient
    url='/socketConnect'
    topics={['/topic/metrics']}
    onMessage={(msg) => { console.log(msg); }}
    ref={(client) => { clientRef.current = client }}
  />

  return (
    <>
    {client}
    <Button onClick={handleClick}>Send Socket</Button>
    </>
  );
}

export default MetricsDisplay;