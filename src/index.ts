import express from 'express';
import { createServer } from 'http';
import { ApolloServer, PubSub } from 'apollo-server-express';
import schema from './graphql';
import StockTradingModel from './models/stockTrading.model';
import IdGen from './models/idGen.model';
import StockTradingItemModel from './models/stockTradingItem.model';
import config from './config';
import MongoConnection from './ext-lib/mongo';
import EsClient from './ext-lib/es';

const pubsub = new PubSub();

async function init() {
  await MongoConnection();
  const path = 'stockiql';

  // Initialize the app
  const app = express();

  app.use(express.static('public'));

  const context = () => {
    return {
      esClient: EsClient,
      pubsub,
      db: {
        StockTradingModel,
        StockTradingItemModel,
        IdGen
      },
      SocketClients: []
    };
  };

  const server = new ApolloServer({ schema, context });
  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);


  server.applyMiddleware({ app, path: '/stockiql' });

  // Start the server
  httpServer.listen({ port: config.port }, async () => {
    console.log(`Go to http://localhost:${config.port}/${path} to run queries!`);
  });
}

init();
