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
  }

  input CreateStockTradingItemInput {
    tradingKey: String!
    closingPrice: Int!
    maximumBudget: Int
    action: String
    tradingAmount: Int
    tradingQuantity: Int
    tradingPrice: Int
    tradingTax: Int
    tradingFee: Int
    totalTradingQuantity: Int
  }

  type CreateStockTradingSessionPayload {
    errorCode: String
    statusCode: Int
    message: String
    data: StockTradingSession
  }

  type CreateStockTradingItemPayload {
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
