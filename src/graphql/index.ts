import { makeExecutableSchema } from 'apollo-server-express';
import merge from 'lodash.merge';
import news from './news';
import personalStocksInfo from './personalStocksInfo';
import base from './base';
import personalProperty from './personalProperty';

export default makeExecutableSchema({
  typeDefs: [
    base.typeDefs,
    news.typeDefs,
    personalStocksInfo.typeDefs,
    personalProperty.typeDefs

  ],
  resolvers: merge({},
    base.resolvers,
    news.resolver,
    personalStocksInfo.resolver,
    personalProperty.resolver
  )
});
