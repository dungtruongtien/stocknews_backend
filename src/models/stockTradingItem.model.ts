import mongoose from 'mongoose';
import { IStockTradingItemModel } from '../common/interface';

export default mongoose.model<IStockTradingItemModel>('StockTradingItem', new mongoose.Schema(
  {
    id: String,
    tradingKey: {
      type: String,
      required: true
    },
    maximumBudget: {
      type: Number,
      required: true
    },
    availabelBudget: {
      type: Number,
      required: true
    },
    stockName: {
      type: String,
      required: true
    },
    action: { // enum: Buy, Sell 
      type: String,
      required: true
    },
    tradingAmount: {
      type: Number
    },
    tradingQuantity: {
      type: Number,
      required: true
    },
    tradingPrice: { // Giá giao dịch cổ phiếu 
      type: Number,
      required: true
    },
    closingPrice: { // Giá giao dịch cổ phiếu 
      type: Number,
      required: true
    },
    tradingTax: {
      type: Number
    },
    tradingFee: {
      type: Number
    },
    profitAmount: { // tiền mặt lời lỗ theo lý thuyết 
      type: Number,
      required: true
    },
    profitPercent: { // % lời lỗ theo lý thuyết
      type: Number,
      required: true
    },
    totalProfitAmount: { // Tổng lời lỗ tiền mặt
      type: Number,
      required: true
    },
    totalTradingQuantity: { // Tổng số lượng cổ phiếu
      type: Number,
      required: true
    },
    totalCapital: { // Tổng vốn 
      type: Number,
      required: true
    },
    averageStockPrice: { // Giá trung bình mỗi cổ phiếu = totalTradingPrice / totalCapital // Không nhập
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
    collection: 'stock_trading_item',
    versionKey: false,
    strict: false
  }
));
