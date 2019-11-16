import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components'
import Products from './src/components/Products';
import ThanksPage from './src/components/ThanksPage';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Helvetica, Arial, 'sans-serif';
    margin: 0;
    padding: 0;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/thanks/:id" children={ThanksPage} />
            {/* <ThanksPage /> */}
          <Route path="/products">
            <Products />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App;