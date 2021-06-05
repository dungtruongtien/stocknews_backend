import { RootFieldFilter } from 'graphql-tools';
import StockService from '../../services/stock.service';
import { IStockTradingHistoryParams } from '../../common/interface';

export default {
  Query: {
    stockTradingSessions: async (_: RootFieldFilter, args: any, { PersonalStockInfoModel }: any) => {
      const stockService = new StockService(PersonalStockInfoModel);
      const { data, pageInfo } = await stockService.stockTradingSessions(args);
      return {
        status: 200,
        message: 'Success',
        data,
        pageInfo
      };
    },
    stockHistory: async (_: RootFieldFilter, args: IStockTradingHistoryParams, { PersonalStockInfoModel }: any) => {
      const { tradingKey, filter } = args;
      const stockService = new StockService(PersonalStockInfoModel);
      const { data, pageInfo } = await stockService.getStockTradingHistory(tradingKey, filter);
      return {
        status: 200,
        message: 'Success',
        data,
        pageInfo
      };
    }
  }
};
