import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    personalStocksName: PersonalStockNamePayload
    stockHistory(tradingKey: String!, options: StockTradingHistoryOptionsInput): StockHistoryPayload
  }

  input StockTradingHistoryOptionsInput {
    limit: Int
    page: Int
  }

  type StockHistoryPayload {
    status: Int
    message: String
    pageInfo: PageInfo
    data: [StockHistory]
  }

  type StockHistory {
    _id: String,
    tradingKey: String,
    stock: String,
    action: String,
    status: String,
    tradingTax: Float,
    totalStockTradeAmount: Int,
    stockTradeAmount: Int,
    stockTradePrice: Float,
    stockTotalTradePrice: Int,
    closingPrice: Float,
    stockTotalClosingPrice: Int,
    profitOrLostPercent: Float,
    createdAt: Date,
    updatedAt: Date
  }

  type PersonalStockNamePayload {
    status: Int
    message: String
    pageInfo: PageInfo
    data: [PersonalStockName]
  }

  type PersonalStockName {
    _id: String
    stock: String
  }
`;
