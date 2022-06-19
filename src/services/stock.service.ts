import mongoose from 'mongoose';
import {
  APIServiceResp,
  IStockTradingItemModel,
  IStockTradingItemParams,
  IStockTradingModel,
  IStockTradingParams
} from '../common/interface';

export default class StockService {
  private StockTradingModel: mongoose.Model<IStockTradingModel, {}> | undefined;
  private StockTradingItemModel: mongoose.Model<IStockTradingItemModel, {}> | undefined;
  constructor(StockTradingModel?: mongoose.Model<IStockTradingModel>, StockTradingItemModel?: mongoose.Model<IStockTradingItemModel>) {
    this.StockTradingModel = StockTradingModel;
    this.StockTradingItemModel = StockTradingItemModel;
  }

  async stockTradingSessions({ filter, limit, offset }: IStockTradingParams): Promise<APIServiceResp> {
    if (!this.StockTradingModel) return Promise.reject(null);
    const dataResp = await this.StockTradingModel.find(filter).limit(limit).skip(offset);
    const total = await this.StockTradingModel.count(filter).limit(limit).skip(offset);
    return {
      pageInfo: { total },
      data: dataResp
    };
  }

  async getStockTradingItems({ filter, limit, offset }: IStockTradingItemParams): Promise<APIServiceResp> {
    if (!this.StockTradingItemModel) return Promise.reject(null);
    const result = await this.StockTradingItemModel.find(filter).sort({ createdAt: -1 }).limit(limit).skip(offset);
    const total = await this.StockTradingItemModel.countDocuments(filter);
    return {
      pageInfo: { total },
      data: result
    };
  }
}
