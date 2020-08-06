import React, { useState } from 'react';
import FlexContainer from '../UIComponents/FlexContainer';

export const TabView = (props) => {
  const [displayed, setDisplayed] = useState<string>('brokers');
  
  return (
    <FlexContainer>
      Hello World
    </FlexContainer>
  );
};

export const TabContent = (props) => {
  return (
    <FlexContainer>
      {props.children}
    </FlexContainer>
  )
}