import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  scalar JSON
  type Query {
      name: String
  }

  type PageInfo {
    total: Int
    currentPage: Int
  }

  enum SortType {
    ASC
    DESC
  }

  type Mutation {
      sayHello(name: String!): String
  }
`;

const resolvers = {
  Query: {
    name: () => 'Stocknews'
  },
  Mutation: {
    sayHello: (_: any, { name }: { name: string }) => `Hello ${name}`
  }
};


export default {
  typeDefs,
  resolvers
};
