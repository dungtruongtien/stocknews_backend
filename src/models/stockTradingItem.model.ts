import mongoose from 'mongoose';
import { IStockTradingItemModel } from '../common/interface';

export default mongoose.model<IStockTradingItemModel>('StockTradingItem', new mongoose.Schema(
  {
    id: String,
    tradingKey: {
      type: String,
      required: true
    },
    action: { // enum: Buy, Sell, AdditionBuy, SubtractionSell.
      type: String,
      required: true
    },
    tradingTax: {
      type: Number,
      required: true
    },
    totalTradingAmount: {
      type: Number,
      required: true
    },
    totalTradingQuantity: {
      type: Number,
      required: true
    },
    tradingAmount: {
      type: Number
    },
    tradingQuantity: {
      type: Number,
      required: true
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
    collection: 'stock_trading_item',
    versionKey: false,
    strict: false
  }
));
