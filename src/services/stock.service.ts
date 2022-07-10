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
      investDate: input.investDate || new Date()
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
    const stockTradingItem: ICreateStockTradingItemInput = {
      tradingKey: input.tradingKey,
      closingPrice: input.closingPrice,
      maximumBudget: input.maximumBudget || 0,
      action: input.action || "HOLD",
      tradingQuantity: input.tradingQuantity || 0,
      tradingPrice: input.tradingPrice || 0,
      tradingTax: input.tradingTax || 0,
      tradingFee: input.tradingFee || 0,
      totalCapital: 0,
      tradingAmount: 0,
      availabelBudget: 0,
      averageStockPrice: 0,
      totalTradingQuantity: 0,
      profitAmount: 0,
      profitPercent: 0,
      totalProfitAmount: 0,
    }
    let totalCapital = 0
    let tradingAmount = 0
    let maximumBudget = 0
    let availabelBudget = 0
    let averageStockPrice = 0
    let totalTradingQuantity = 0
    let totalProfitAmount = 0
    let tradingQuantity = stockTradingItem.tradingQuantity || 0

    // 1. Caculate totalCapital and tradingAmount
    if (input.tradingQuantity && input.tradingPrice) {
      totalCapital = input.tradingQuantity * input.tradingPrice
      tradingAmount = input.tradingQuantity * input.tradingPrice
    }

    // 2. Caculate totalCapital && totalTradingQuantity && maximumBudget
    const latestStockTradingItemResp = await this.DB.StockTradingItemModel.find({ tradingKey: input.tradingKey }, null, { sort: { _id: -1 } }).limit(1).skip(0)
    if (latestStockTradingItemResp && latestStockTradingItemResp[0]) {
      totalCapital += latestStockTradingItemResp[0].totalCapital
      maximumBudget = latestStockTradingItemResp[0].maximumBudget
      availabelBudget = latestStockTradingItemResp[0].availabelBudget
      if (input.action === "SELL") {
        totalTradingQuantity -= latestStockTradingItemResp[0].totalTradingQuantity + tradingQuantity
      } else {
        totalTradingQuantity += latestStockTradingItemResp[0].totalTradingQuantity + tradingQuantity
      }
    } else {
      totalTradingQuantity = input.tradingQuantity
      maximumBudget = input.maximumBudget
    }

    // 3. Caculate availabelBudget
    if (tradingAmount > 0) {
      if (input.action === "SELL" || input.action === "BUY") {
        availabelBudget = maximumBudget - totalCapital
      }
    }

    // 4. Caculate averageStockPrice
    averageStockPrice = totalCapital / totalTradingQuantity

    // 5. Caculate profitPercent && profitAmount 
    let profitPercent = (input.closingPrice - averageStockPrice) / averageStockPrice * 100
    let profitAmount = (totalCapital * profitPercent / 100)

    // 6. Caculate totalProfitAmount
    if (input.action === "SELL" && input.tradingQuantity) {
      totalProfitAmount = (profitAmount * (input.tradingQuantity / totalTradingQuantity * 100)) / 100
    }

    // Reassign property to stockTradingItem
    stockTradingItem.totalCapital = totalCapital
    stockTradingItem.profitPercent = Math.round(profitPercent * 100) / 100
    stockTradingItem.profitAmount = profitAmount
    stockTradingItem.tradingAmount = tradingAmount
    stockTradingItem.averageStockPrice = averageStockPrice
    stockTradingItem.totalTradingQuantity = totalTradingQuantity
    stockTradingItem.availabelBudget = availabelBudget
    stockTradingItem.totalProfitAmount = totalProfitAmount
    stockTradingItem.maximumBudget = maximumBudget,
    stockTradingItem.totalCapital = totalCapital

    const createStockTradingItemResp = await this.DB.StockTradingItemModel.create(stockTradingItem)
    if (!createStockTradingItemResp) {
      return {
        errorCode: "Error",
        statusCode: 500,
        message: "Cannot create stock trading item"
      }
    }

    // DONE TradingSession if totalTradingQuantity = 0
    if (totalTradingQuantity === 0) {
      await this.DB.StockTradingModel.updateOne({ tradingKey: input.tradingKey }, { $set: { status: "DONE" } })
    }
    return {
      errorCode: "OK",
      statusCode: 200,
      message: "Create stock trading item success",
      data: createStockTradingItemResp
    }
  }
}
