import { gql } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { SORT_TYPE } from '../config/constant';

const CustomDateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Description of DateTime',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value); // ast value is always in string format
    }
    return null;
  }
});


const typeDefs = gql`
  scalar Date
  scalar DateTime
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
  },
  SortType: {
    ...SORT_TYPE
  },
  DateTime: CustomDateTime
};


export default {
  typeDefs,
  resolvers
};
