import mongoose from 'mongoose';
import {
  APIServiceResp,
  ICreateStockTradingInput,
  IDBContext,
  IStockTradingItemParams,
  IStockTradingParams
} from '../common/interface';
import { genCode } from '../utils/method';

export default class StockService {
  private DB: IDBContext;
  constructor(db: IDBContext) {
    this.DB = db;
  }

  async stockTradingSessions({ filter, limit, offset }: IStockTradingParams): Promise<APIServiceResp> {
    const dataResp = await this.DB.StockTradingModel.find(filter).limit(limit).skip(offset);
    const total = await this.DB.StockTradingModel.count(filter).limit(limit).skip(offset);
    return {
      statusCode: 200,
      status: "OK",
      pageInfo: { total },
      data: dataResp
    };
  }

  async getStockTradingItems({ filter, limit, offset }: IStockTradingItemParams): Promise<APIServiceResp> {
    const result = await this.DB.StockTradingItemModel.find(filter).sort({ createdAt: -1 }).limit(limit).skip(offset);
    const total = await this.DB.StockTradingItemModel.countDocuments(filter);
    return {
      statusCode: 200,
      status: "OK",
      pageInfo: { total },
      data: result
    };
  }

  async createStockTrading(input: ICreateStockTradingInput): Promise<APIServiceResp> {
    let code = "";
    let latestIdGenValue = 0;
    const latestIdGenResp = await this.DB.IdGen.findOne({}).sort({ _id: -1 });
    if (!latestIdGenResp) {
      latestIdGenValue = 1;
      code = genCode(1, 6);
      const createIdGenResp = await this.DB.IdGen.create({ _id: new mongoose.Types.ObjectId(), value: 1 });
      if (!createIdGenResp) {
        console.log('createIdGenResp------', createIdGenResp)
        return {
          status: "Error",
          message: "Cannot create id gen",
          statusCode: 500
        }
      }
    }
    const createIdGenResp = await this.DB.IdGen.create({ _id: new mongoose.Types.ObjectId(), value: latestIdGenValue + 1 });
    if (!createIdGenResp) {
      console.log('createIdGenResp------', createIdGenResp)
      return {
        status: "Error",
        message: "Cannot create id gen",
        statusCode: 500
      }
    }
    const stockTrading = {
      _id: new mongoose.Types.ObjectId(),
      tradingKey: code,
      stockName: input.stockName,
      status: "HOLD",
      totalQuantity: input.totalQuantity,
      totalAmount: input.totalAmount,
      investDate: input.investDate,
      profitPercent: 0,
      averageStockPrice: input.totalAmount / input.totalQuantity,
    }
    const createStockTradingResp = await this.DB.StockTradingModel.create(stockTrading)
    if (!createStockTradingResp) {
      return {
        status: "Error",
        statusCode: 500,
        message: "Cannot create Stock Trading"
      }
    }
    return {
      status: "OK",
      statusCode: 200,
      message: "Create stock trading success",
      data: createStockTradingResp
    }
  }
}
