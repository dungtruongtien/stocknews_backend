import mongoose from 'mongoose';
import { IStockInfoModel } from '../common/interface';

export default mongoose.model<IStockInfoModel>('PersonalStockInfo', new mongoose.Schema(
  {
    id: String,
    tradingKey: {
      type: String,
      required: true
    },
    stock: {
      type: String,
      required: true
    },
    action: { // enum: Buy, Sell, AdditionBuy, SubtractionSell.
      type: String,
      required: true
    },
    status: { // Hold, Sold.
      type: String,
      required: true
    },
    stockTradeAmount: {
      type: Number,
      required: true
    },
    tradingTax: {
      type: Number
    },
    totalStockTradeAmount: {
      type: Number,
      required: true
    },
    stockTradePrice: {
      type: Number,
      required: true
    },
    dateStockTradePrice: {
      type: Number
    },
    stockTotalTradePrice: {
      type: Number,
      required: true
    },
    closingPrice: {
      type: Number,
      required: true
    },
    profitPercent: {
      type: Number,
      required: true
    },
    profitAmount: {
      type: Number
    },
    paperProfitPercent: {
      type: Number,
      required: true
    },
    paperProfitAmount: {
      type: Number
    },
    tradingFee: {
      type: Number
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  },
  {
    collection: 'personal_stock_info',
    versionKey: false,
    strict: false
  }
));
