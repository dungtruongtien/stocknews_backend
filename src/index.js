import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql';
import config from './config';

const path = 'stockiql';

// Initialize the app
const app = express();

const server = new ApolloServer({ schema });

server.applyMiddleware({ app, path: '/stockiql' });

// Start the server
app.listen(config.port, () => {
  console.log(`Go to http://localhost:${config.port}/${path} to run queries!`);
});
