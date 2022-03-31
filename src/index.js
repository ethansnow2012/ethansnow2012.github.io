import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createRoot} from "react-dom/client";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const shadows = {
  outline: '0 0 0 3px red',
};
const theme = extendTheme({ shadows })

const container = document.getElementById('root');


const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)

reportWebVitals();
