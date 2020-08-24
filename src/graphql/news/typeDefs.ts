import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    news(
      from: Int
      size: Int
      sort: [StockNewsSort]
    ): StockNewsPayload 
  }

  input StockNewsSort {
    created: SortType
  }

  type StockNewsPayload {
    status: Int
    message: String
    pageInfo: PageInfo
    data: [StockNews]
  }

  type PageInfo {
    total: Int
    currentPage: Int
  }

  type StockNews {
    link: String
    title: String
    originLink: String
    shortDescription: String
    createdDate: Date
    image: String
  }
`;
