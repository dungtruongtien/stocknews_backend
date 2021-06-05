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
    // const stocks = await this.PersonalStockModel.find({ action: 'buy' })
    //   .sort({ createdAt: -1 })
    //   .skip(skip)
    //   .limit(limit);
    // const listTradingKey = stocks.map((stock: any) => stock.tradingKey);
    // const stockSoldInfo = await this.PersonalStockModel.find({ tradingKey: { $in: listTradingKey } })
    //   .sort({ createdAt: -1 });
    // const stockInfo = stocks.map((stock: any) => {
    //   let { status } = stock;
    //   const latestStockInfo = stockSoldInfo.find((st: any) => st.tradingKey === stock.tradingKey);
    //   console.log('latestStockInfo-------', latestStockInfo);
    //   if (latestStockInfo) {
    //     status = latestStockInfo.status;
    //   }
    //   return {
    //     ...stock.toJSON(),
    //     status
    //   };
    // });
    const stocks = await this.PersonalStockModel.aggregate(
      [
        { $group: { _id: '$tradingKey', stocks: { $last: '$$ROOT' } } },
        { $sort: { 'stocks.createdAt': -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit }
      ]
    );
    const stockInfo = stocks.map((stock: any) => {
      return { ...stock.stocks };
    });
    console.log('stockInfo-------', stockInfo);
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
