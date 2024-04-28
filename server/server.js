import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
// import authMiddleware from './utils/Auth';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    path: '/graphql',
    // Uncomment and adjust if you have authentication middleware
    // context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(new URL(import.meta.url).pathname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(new URL(import.meta.url).pathname, '../client/dist/index.html'));
    });
  }

  app.use(express.static(path.join(new URL(import.meta.url).pathname, '../client/dist')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(new URL(import.meta.url).pathname, '../client/dist/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
