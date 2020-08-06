import styled from 'styled-components';

interface FlexContainerProps {
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right',
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'start' | 'end' | 'self-start' | 'self-end',
  addlStyles?: string,
}

/**
 * Div with CSS flexbox enabled that takes in standard flex properties.
 * Content is centered by default, and width and height are 100% by default
 * Additional styles can be provided in a string which should be
 * formatted like CSS.
 */
const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  justify-content: ${props => props.justifyContent || 'center'};
  align-items: ${props => props.alignItems || 'center'};
  width: 100%;
  height: 100%;
  ${props => props.addlStyles || ''}
`;

export default FlexContainer;