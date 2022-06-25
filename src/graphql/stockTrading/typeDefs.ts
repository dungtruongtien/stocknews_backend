import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    StockTradingSession(filter: StockTradingSessionFilterInput, limit: Int, offset: Int): StockTradingSessionPayload
    stockTradingItems(filter: StockTradingItemFilterInput, limit: Int, offset: Int): StockTradingItemPayload
  }

  extend type Mutation {
    createStockTrading(input: CreateStockTradingSessionInput!): CreateStockTradingSessionPayload
    createStockTradingItem(input: CreateStockTradingItemInput!): CreateStockTradingItemPayload
  }

  input CreateStockTradingSessionInput {
    stockName: String!
    totalQuantity: Int!
    totalAmount: Int!
    status: String
    investDate: Date
    profitPercent: Int
    averageStockPrice: Int
  }

  input CreateStockTradingItemInput {
    tradingKey: String!
    action: String!
    tradingTax: Int!
    tradingAmount: Int!
    tradingQuantity: Int!
    closingPrice: Int
  }

  type CreateStockTradingSessionPayload {
    errorCode: String
    statusCode: Int
    message: String
    data: StockTradingSession
  }

  type CreateStockTradingSessionPayload {
    errorCode: String
    statusCode: Int
    message: String
    data: StockTradingSession
  }

  input StockTradingItemFilterInput {
    tradingKey: String!
  }

  input StockTradingSessionFilterInput {
    stock: String
  }

  type StockTradingItemPayload {
    message: String
    pageInfo: PageInfo
    data: [StockTradingItem]
  }

  type StockTradingItem {
    _id: String
    tradingKey: String
    action: String
    tradingTax: Int
    tradingAmount: Int
    tradingQuantity: Int
    closingPrice: Int
    createdAt: Date
    updatedAt: Date
  }

  type StockTradingSessionPayload {
    message: String
    pageInfo: PageInfo
    data: [StockTradingSession]
  }

  type StockTradingSession {
    _id: String
    tradingKey: String
    stockName: String
    status: String
    profitPercent: Int
    averageStockPrice: Int
    totalStockTradeQuantity: Int
    totalStockTradeAmount: Int
    investDate: Date
    createdAt: Date
    updatedAt: Date
  }
`;
