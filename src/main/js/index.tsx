import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './src/components/App';
import { createGlobalStyle } from 'styled-components';
import constants from './src/UIComponents/constants';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${constants.LIBRE_FRANKLIN};
  }
`;

ReactDOM.render(<><GlobalStyle /><App /></>, document.getElementById('root'));
