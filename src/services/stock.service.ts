import { IStockTradingHistoryFilter, IStockTradingSessionInput } from '../common/interface';

export default class StockService {
  private PersonalStockModel: any;
  constructor(PersonalStockModel: any) {
    this.PersonalStockModel = PersonalStockModel;
  }

  async stockTradingSessions({ filter }: IStockTradingSessionInput) {
    const { limit, page } = filter;
    // const skip = (page - 1) * limit;
    const total = await this.PersonalStockModel.countDocuments({ action: 'buy' });
    const stocks = await this.PersonalStockModel.aggregate(
      [
        { $group: { _id: '$tradingKey', stocks: { $last: '$$ROOT' } } },
        { $match: { 'stocks.status': 'hold' } },
        { $sort: { 'stocks.createdAt': -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit }
      ]
    );
    const stockInfo = stocks.map((stock: any) => {
      return { ...stock.stocks };
    });
    return { pageInfo: { total, currentPage: page }, data: stockInfo };
  }

  async getStockTradingHistory(tradingKey: string, filter: IStockTradingHistoryFilter) {
    const { limit, page } = filter;
    const skip = (page - 1) * limit;
    const result = await this.PersonalStockModel.find({ tradingKey }).sort({ createdAt: -1 }).limit(limit).skip(skip);
    const total = await this.PersonalStockModel.countDocuments({ tradingKey });
    return { pageInfo: { total, currentPage: page }, data: result };
  }
}
