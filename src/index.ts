import express from 'express';
import { createServer } from 'http';
import { ApolloServer, PubSub } from 'apollo-server-express';
import schema from './graphql';
import PersonalStockInfoModel from './models/personalStockInfo.model';
import PersonalPropertyModel from './models/personalProperty.model';
import CoinModel from './models/coin.model';
import config from './config';
import MongoConnection from './ext-lib/mongo';
import EsClient from './ext-lib/es';

const pubsub = new PubSub();

async function init() {
  await MongoConnection();
  const path = 'stockiql';

  const esClient = EsClient;
  // Initialize the app
  const app = express();

  app.use(express.static('public'));

  const context = () => {
    return {
      esClient,
      pubsub,
      PersonalStockInfoModel,
      PersonalPropertyModel,
      CoinModel,
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
