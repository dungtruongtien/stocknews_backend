import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql';
import PersonalStockInfoModel from './models/personalStockInfo.model';
import PersonalPropertyModel from './models/personalProperty.model';
import config from './config';
import MongoConnection from './ext-lib/mongo';
import EsClient from './ext-lib/es';

async function init() {
  await MongoConnection();
  const path = 'stockiql';

  const esClient = EsClient;
  // Initialize the app
  const app = express();

  app.use(express.static('public'));

  const context = () => ({
    esClient,
    PersonalStockInfoModel,
    PersonalPropertyModel
  });

  const server = new ApolloServer({ schema, context });

  server.applyMiddleware({ app, path: '/stockiql' });

  // Start the server
  app.listen(config.port, () => {
    console.log(`Go to http://localhost:${config.port}/${path} to run queries!`);
  });
}

init();
