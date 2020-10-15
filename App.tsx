/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import SplashScreen from 'react-native-splash-screen'

import Navigation from './src/navigations/Navigation'
import client from './src/graphql/client'

import WatchlistContextProvider from './src/contexts/watchlist'

declare const global: {HermesInternal: null | {}};

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <ApolloProvider client={client}>
      <WatchlistContextProvider>
        <Navigation />
      </WatchlistContextProvider>
    </ApolloProvider>
  );
};

export default App;
