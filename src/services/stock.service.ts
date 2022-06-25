import mongoose from 'mongoose';
import {
  APIServiceResp,
  ICreateStockTradingInput,
  ICreateStockTradingItemInput,
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

  async StockTradingSession({ filter, limit, offset }: IStockTradingParams): Promise<APIServiceResp> {
    const dataResp = await this.DB.StockTradingModel.find(filter).limit(limit).skip(offset);
    const total = await this.DB.StockTradingModel.count(filter).limit(limit).skip(offset);
    return {
      statusCode: 200,
      message: "OK",
      pageInfo: { total },
      data: dataResp
    };
  }

  async getStockTradingItems({ filter, limit, offset }: IStockTradingItemParams): Promise<APIServiceResp> {
    const result = await this.DB.StockTradingItemModel.find(filter).sort({ createdAt: -1 }).limit(limit).skip(offset);
    const total = await this.DB.StockTradingItemModel.countDocuments(filter);
    return {
      statusCode: 200,
      message: "OK",
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
      const createIdGenResp = await this.DB.IdGen.create({ _id: new mongoose.Types.ObjectId(), value: 1 });
      if (!createIdGenResp) {
        return {
          errorCode: "Error",
          message: "Cannot create id gen",
          statusCode: 500
        }
      }
    } else {
      latestIdGenValue = latestIdGenResp.value + 1
      const createIdGenResp = await this.DB.IdGen.create({ _id: new mongoose.Types.ObjectId(), value: latestIdGenValue });
      if (!createIdGenResp) {
        return {
          errorCode: "Error",
          message: "Cannot create id gen",
          statusCode: 500
        }
      }
    }
    code = genCode(latestIdGenValue, 6);
    const stockTrading = {
      _id: new mongoose.Types.ObjectId(),
      tradingKey: code,
      stockName: input.stockName,
      status: "HOLD",
      totalQuantity: input.totalQuantity,
      totalAmount: input.totalAmount,
      investDate: input.investDate || new Date(),
      profitPercent: input.profitPercent || 0,
      averageStockPrice: input.totalAmount / input.totalQuantity,
    }
    const createStockTradingResp = await this.DB.StockTradingModel.create(stockTrading)
    if (!createStockTradingResp) {
      return {
        errorCode: "Error",
        statusCode: 500,
        message: "Cannot create stock trading"
      }
    }
    return {
      errorCode: "OK",
      statusCode: 200,
      message: "Create stock trading success",
      data: createStockTradingResp
    }
  }

  async createStockTradingItem(input: ICreateStockTradingItemInput): Promise<APIServiceResp> {
    const stockTradingItem = {
      tradingKey: input.tradingKey,
      action: input.action,
      tradingTax: input.tradingTax,
      tradingAmount: input.tradingAmount,
      tradingQuantity: input.tradingQuantity,
      closingPrice: input.closingPrice
    }
    const createStockTradingResp = await this.DB.StockTradingItemModel.create(stockTradingItem)
    if (!createStockTradingResp) {
      return {
        errorCode: "Error",
        statusCode: 500,
        message: "Cannot create stock trading item"
      }
    }
    return {
      errorCode: "OK",
      statusCode: 200,
      message: "Create stock trading item success",
      data: createStockTradingResp
    }
  }
}
