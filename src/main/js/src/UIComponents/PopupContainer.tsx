import styled from "styled-components";

/**
 * Div element container for contents of Popups
 */
const PopupContainer = styled.div`
  padding: 0.25rem 0.5rem;
  box-sizing: border-box;
  & > * {
    margin: 0.25rem 0
  }
`;

export default PopupContainer;