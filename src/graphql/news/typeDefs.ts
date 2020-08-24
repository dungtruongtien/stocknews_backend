import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    books: [Book]
    news: StockNewsPayload 
  }

  type Book {
    title: String
    author: String
  }

  type StockNewsPayload {
    status: Int
    message: String
    data: [StockNews]
  }

  type StockNews {
    link: String
    title: String
    originLink: String
    shortDescription: String
    createdDate: Date
  }
`;
