import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    news(
      filter: StockNewsFilter
      sort: [StockNewsSort]
    ): StockNewsPayload 
  }

  input StockNewsSort {
    createdDate: SortType
    publishedDate: SortType
  }

  input StockNewsFilter {
    from: Int
    size: Int
  }

  type StockNewsPayload {
    status: Int
    message: String
    pageInfo: PageInfo
    data: [StockNews]
  }

  type StockNews {
    link: String
    title: String
    originLink: String
    shortDescription: String
    createdDate: Date
    image: String
    publishedDate: Date
  }
`;
