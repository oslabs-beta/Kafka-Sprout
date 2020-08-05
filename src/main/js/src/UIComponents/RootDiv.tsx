import styled from 'styled-components';
import constants from './constants';

/**
 * Basic full-height flexbox container to center page content.
 */

export const RootDiv = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${constants.LIBRE_FRANKLIN};
  & > * {
    margin: 0.5rem 0;
  }
`;
