import { makeExecutableSchema } from 'apollo-server-express';
import merge from 'lodash.merge';
import news from './news';
import stockTrading from './stockTrading';
import base from './base';
import personalProperty from './personalProperty';
import coin from './coin';

export default makeExecutableSchema({
  typeDefs: [
    base.typeDefs,
    stockTrading.typeDefs,
    news.typeDefs,
    personalProperty.typeDefs,
    coin.typeDefs

  ],
  resolvers: merge({},
    base.resolvers,
    stockTrading.resolver,
    news.resolver,
    personalProperty.resolver,
    coin.resolver
  )
});
