import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql';
import config from './config';
import EsClient from './ext-lib/es';


const path = 'stockiql';

const esClient = EsClient;
// Initialize the app
const app = express();

const context = () => ({
  esClient
});

const server = new ApolloServer({ schema, context });


server.applyMiddleware({ app, path: '/stockiql' });

// Start the server
app.listen(config.port, () => {
  console.log(`Go to http://localhost:${config.port}/${path} to run queries!`);
});
