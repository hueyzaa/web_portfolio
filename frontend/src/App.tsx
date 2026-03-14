import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyle } from './styles/GlobalStyle';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <GlobalStyle />
        <AppRouter />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
