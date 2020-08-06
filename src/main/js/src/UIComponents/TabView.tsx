import React, { useState } from 'react';
import FlexContainer from './FlexContainer';
import styled from 'styled-components';
import constants from './constants';

//interface TabViewProps {
//  children?: React.ReactElement<TabContentProps>[] | React.ReactElement<TabContentProps>
//}

export const TabView = (props) => {
  const [selected, setSelected] = useState<string>('Brokers');

  return (
    <FlexContainer
      flexDirection='column'
      justifyContent='flex-start'
      addlStyles={
        `width: 100%; 
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;`
      }
    >
      <TabMenu selected={selected} tabs={props.children.map(child => child.props.tabName)} setSelected={setSelected} />
      {props.children.filter(child => child.props.tabName === selected)}
    </FlexContainer>
  );
};

interface TabContentProps {
  tabName: string,
  children?: React.ReactElement[] | React.ReactElement
}

/**
 * Wrapper component for elements belonging to one tabbed area.
 * TabContent should be assigned a tabName that will appear 
 * in the TabMenu.
 */
export const TabContent = (props: TabContentProps) => {
  return (
    <FlexContainer
      addlStyles={
        `width: 100%; 
        height: 100%;`
      }>
      {props.children}
    </FlexContainer>
  )
}

/**
 * Component to render the clickable tabs above the TabContent.
 */
const TabMenu = (props) => {
  return (
    <FlexContainer
      justifyContent='flex-start'
      addlStyles={
        `width: 100%;
        margin-bottom: 1rem;
        border-bottom: 1px solid ${constants.DARK_GREEN};
        `
      }
    >
      {props.tabs.map(tab => (
        <Tab selected={tab === props.selected} onClick={() => props.setSelected(tab)}>
          {tab}
        </Tab>
      ))}
    </FlexContainer>
  )
}

const Tab = styled.div<{ selected: boolean }>`
  color: ${constants.DARK_GREEN};
  cursor: pointer;
  padding: 0.5rem 1rem;
  box-sizing: content-box;
  border-radius: ${constants.BORDER_RADIUS} ${constants.BORDER_RADIUS} 0 0;
  border: 1px solid ${props => props.selected ? constants.DARK_GREEN : 'transparent'};
  border-bottom: ${props => props.selected ? `1px solid ${constants.BODY_BACKGROUND}` : '0'};
  ${props => props.selected ? 'margin-bottom: -1px;' : ''}
`;