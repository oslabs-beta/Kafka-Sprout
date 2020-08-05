import styled from 'styled-components';

interface FlexContainerProps {
  flexDirection?: 'row' | 'column' | 'reverse-row' | 'reverse-column'
  width?: string,
  height?: string,
}

const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'}
  width: ${props => props.width || '100%'}
  height: ${props => props.height || '100%'}
`;

export default FlexContainer;