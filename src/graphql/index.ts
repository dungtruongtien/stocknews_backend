import { makeExecutableSchema } from 'apollo-server-express';
import merge from 'lodash.merge';
import news from './news';
import personalStocksIfno from './personalStocksInfo';
import base from './base';

export default makeExecutableSchema({
  typeDefs: [
    base.typeDefs,
    news.typeDefs,
    personalStocksIfno.typeDefs

  ],
  resolvers: merge({},
    base.resolvers,
    news.resolver,
    personalStocksIfno.resolver
  )
});
