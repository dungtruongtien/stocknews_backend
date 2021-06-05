import mongoose from 'mongoose';
import { ICoinModel } from '../common/interface';

export default mongoose.model<ICoinModel>('Coin', new mongoose.Schema(
  {
    currentPrice: Number,
    profit: Number,
    name: String,
    abbreviations: String,
    costPrice: Number,
    totalCostPrice: Number
  },
  {
    collection: 'coin',
    versionKey: false,
    strict: false,
    autoCreate: true
  }
));
