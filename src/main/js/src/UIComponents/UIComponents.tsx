import styled from "styled-components";
import constants from "./constants";

/**
 *
 * styled-components allows for CSS-in-JS so that a separate CSS file
 * is not necessary to style HTML elements
 * It's good for creating component libraries and themes :^)
 * https://styled-components.com/
 *
 */

// <RootDiv className='root' />
// <div class='root'></div>
/**
 * Basic full-height flexbox container to center page content.
 */
export const RootDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${constants.LIBRE_FRANKLIN};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  * {
    margin: 0.25rem 0;
  }
`;
