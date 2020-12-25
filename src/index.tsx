import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './tailwind.css';
import LightBoxProvider from './contexts/lightBoxContext';
import { ThemeProvider } from './contexts/themeContext';

ReactDOM.render(
  <ThemeProvider>
    <LightBoxProvider>
      <App />
    </LightBoxProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
