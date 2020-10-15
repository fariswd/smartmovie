import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import config from '../constants/config'

const restLink = new RestLink({
  uri: `${config.APIURL}`,
});

const client:ApolloClient<NormalizedCacheObject>  = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

export default client