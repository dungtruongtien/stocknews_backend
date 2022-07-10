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
    investDate: {
      type: Date,
      required: true
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
