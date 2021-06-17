import { ApolloProvider } from '@apollo/client';
import { client } from 'apollo-config/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AutomaticLoginProvider } from './utils/automaticLogin';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AutomaticLoginProvider>
        <App />
      </AutomaticLoginProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

