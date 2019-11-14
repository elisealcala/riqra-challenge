import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from './src/components/Products';
import ThanksPage from './src/components/ThanksPage';
import ReactDom from 'react-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Products />
        </Route>
        <Route path="/thankyou">
          <ThanksPage />
        </Route>
      </Switch>
    </Router>
  )
}

ReactDom.render(<App />, document.getElementById('root'));