import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './tailwind.css';
import LightBoxProvider from './contexts/lightBoxContext';
import { ThemeProvider } from './contexts/themeContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <LightBoxProvider>
        <App />
      </LightBoxProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
