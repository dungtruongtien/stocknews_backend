import { IStockTradingHistoryFilter, IStockTradingSessionInput } from '../common/interface';

export default class StockService {
  private PersonalStockModel: any;
  constructor(PersonalStockModel: any) {
    this.PersonalStockModel = PersonalStockModel;
  }

  async stockTradingSessions({ filter }: IStockTradingSessionInput) {
    const { limit, page } = filter;
    const skip = (page - 1) * limit;
    const total = await this.PersonalStockModel.countDocuments({ action: 'buy' });
    const stocks = await this.PersonalStockModel.find({ action: 'buy' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const listTradingKey = stocks.map((stock: any) => stock.tradingKey);
    const stockSoldInfo = await this.PersonalStockModel.find({ tradingKey: { $in: listTradingKey } })
      .sort({ createdAt: -1 });
    const stockInfo = stocks.map((stock: any) => {
      let totalProfitOrLostAmount = 0;
      let totalProfitOrLostPercent = 0;
      let status = stock.status;
      const currentStockSoldInfo = stockSoldInfo.find((st: any) => st.tradingKey === stock.tradingKey);
      if (currentStockSoldInfo) {
        const { stockTotalClosingPrice, stockTotalTradePrice, profitOrLostPercent } = currentStockSoldInfo;
        totalProfitOrLostAmount = stockTotalClosingPrice - stockTotalTradePrice;
        totalProfitOrLostPercent = profitOrLostPercent;
        status = currentStockSoldInfo.status;
      }
      return {
        ...stock.toJSON(),
        totalProfitOrLostAmount,
        totalProfitOrLostPercent,
        status
      };
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
