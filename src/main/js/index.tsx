import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './src/components/App';
import { createGlobalStyle } from 'styled-components';
import constants from './src/UIComponents/constants';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${constants.LIBRE_FRANKLIN};
    background-color: ${constants.BODY_BACKGROUND};
  }
  #root {
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    box-sizing: border-box;
  }
`;

ReactDOM.render(<><GlobalStyle /><App /></>, document.getElementById('root'));
