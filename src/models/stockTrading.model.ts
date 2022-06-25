import mongoose from 'mongoose';
import { IStockTradingModel } from '../common/interface';

export default mongoose.model<IStockTradingModel>('StockTrading', new mongoose.Schema(
  {
    id: String,
    tradingKey: {
      type: String,
      required: true
    },
    stockName: {
      type: String,
      required: true
    },
    status: { // Hold, Sold.
      type: String,
      required: true
    },
    totalQuantity: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    investDate: {
      type: Date,
      required: true
    },
    profitPercent: {
      type: Number
    },
    averageStockPrice: {
      type: Number
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  },
  {
    collection: 'stock_trading',
    versionKey: false,
    strict: false
  }
));
