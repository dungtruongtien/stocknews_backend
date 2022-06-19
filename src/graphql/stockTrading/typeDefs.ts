import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    stockTradingSessions(filter: StockTradingSessionsFilterInput, limit: Int, offset: Int): StockTradingSessionsPayload
    stockTradingItems(filter: StockTradingItemFilterInput, limit: Int, offset: Int): StockTradingItemPayload
  }

  input StockTradingItemFilterInput {
    tradingKey: String!
  }

  input StockTradingSessionsFilterInput {
    stock: String
  }

  type StockTradingItemPayload {
    status: Int
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

  type StockTradingSessionsPayload {
    status: Int
    message: String
    pageInfo: PageInfo
    data: [StockTradingSessions]
  }

  type StockTradingSessions {
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
