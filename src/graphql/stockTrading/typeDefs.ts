import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    stockTrading(filter: StockTradingFilterInput, limit: Int, offset: Int): StockTradingPayload
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
    status: Int
    message: String
    data: StockTrading
  }

  type CreateStockTradingItemPayload {
    errorCode: String
    status: Int
    message: String
    data: StockTrading
  }

  input StockTradingItemFilterInput {
    tradingKey: String!
  }

  input StockTradingFilterInput {
    stock: String
  }

  type StockTradingItemPayload {
    status: Int
    message: String
    total: Int
    data: [StockTradingItem]
  }

  type StockTradingItem {
    _id: String
    tradingKey: String
    closingPrice: Int
    maximumBudget: Int
    availabelBudget: Int
    action: String
    tradingAmount: Int
    tradingQuantity: Int
    tradingPrice: Int
    tradingTax: Int
    tradingFee: Int
    profitAmount: Int
    profitPercent: Float
    totalProfitAmount: Int
    totalTradingQuantity: Int
    totalCapital: Int
    averageStockPrice: Int
    createdAt: Date
    updatedAt: Date
  }

  type StockTradingPayload {
    status: Int
    message: String
    total: Int
    data: [StockTrading]
  }

  type StockTrading {
    _id: String
    tradingKey: String
    stockName: String
    status: String
    investDate: Date
    createdAt: Date
    updatedAt: Date
  }
`;
