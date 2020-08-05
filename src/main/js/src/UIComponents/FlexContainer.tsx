import styled from 'styled-components';

const FlexContainer = styled.div<{ flexDirection: 'row' | 'column' | 'reverse-row' | 'reverse-column'}>`
  display: flex;
  flex-direction: ${props => props.flexDirection}
`

export default FlexContainer