import React from 'react';
import ReactDom from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

const Main = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

ReactDom.render(<Main />, document.getElementById('root'));