import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    stockTradingSessions(filter: StockTradingSessionsFilter): StockTradingSessionsPayload
    stockHistory(tradingKey: String!, filter: StockTradingHistoryOptionsInput): StockHistoryPayload
  }

  input StockTradingHistoryOptionsInput {
    page: Int
    limit: Int
  }

  input StockTradingSessionsFilter {
    page: Int
    limit: Int
  }

  type StockHistoryPayload {
    status: Int
    message: String
    pageInfo: PageInfo
    data: [StockHistory]
  }

  type StockHistory {
    _id: String
    tradingKey: String
    stock: String
    action: String
    status: String
    tradingTax: Float
    totalStockTradeAmount: Int
    stockTradeAmount: Int
    stockTradePrice: Float
    stockTotalTradePrice: Int
    closingPrice: Float
    stockTotalClosingPrice: Int
    profitAmount: Int
    profitPercent: Float
    paperProfitAmount: Int
    paperProfitPercent: Float
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
    stock: String
    createdAt: Date
    tradingKey: String
    status: String
    profitAmount: Int
    profitPercent: Float
    paperProfitAmount: Int
    paperProfitPercent: Float
    stockTotalTradePrice: Int
  }
`;
