import mongoose from 'mongoose';
import { IStockInfoModel } from '../common/interface';

export default mongoose.model<IStockInfoModel>('PersonalStockInfo', new mongoose.Schema(
  {
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
      type: Number,
      required: true
    },
    totalStockTradeAmount: {
      type: Number,
      required: true
    },
    stockTradePrice: {
      type: Number,
      required: true
    },
    stockTotalTradePrice: {
      type: Number,
      required: true
    },
    closingPrice: {
      type: Number,
      required: true
    },
    stockTotalClosingPrice: {
      type: Number,
      required: true
    },
    profitOrLostPercent: {
      type: Number,
      required: true
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
