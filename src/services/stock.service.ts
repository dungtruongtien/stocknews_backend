import { IStockTradingHistoryOptions } from '../common/interface';

export default class StockService {
  private PersonalStockModel: any;
  constructor(PersonalStockModel: any) {
    this.PersonalStockModel = PersonalStockModel;
  }

  async getPersonalStocksName() {
    const result = await this.PersonalStockModel.aggregate([
      { $group: { _id: '$tradingKey', stock: { $first: '$stock' } } }
    ]);
    return { pageInfo: null, data: result };
  }

  async getStockTradingHistory(tradingKey: string, options: IStockTradingHistoryOptions) {
    const { limit, page } = options;
    const skip = (page - 1) * limit;
    const result = await this.PersonalStockModel.find({ tradingKey }).limit(limit).skip(skip);
    const total = await this.PersonalStockModel.count();
    return { pageInfo: { total, currentPage: page }, data: result };
  }
}
