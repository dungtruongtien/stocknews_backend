
const typeDefs = `
scalar Date
scalar JSON
type Query {
    name: String
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
    sayHello: (_, { name }) => `Hello ${name}`
  }
};


export default {
  typeDefs,
  resolvers
};
