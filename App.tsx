import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Products from './src/components/Products';
import ThanksPage from './src/components/ThanksPage';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Helvetica, Arial, 'sans-serif';
    margin: 0;
    padding: 0;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/thanks/:id" children={ThanksPage} />

          <Route path="/products" children={Products} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
