import { RootFieldFilter } from 'graphql-tools';
import StockService from '../../services/stock.service';
import { IStockTradingHistoryParams } from '../../common/interface';

export default {
  Query: {
    personalStocksName: async (_: RootFieldFilter, args: any, { PersonalStockInfoModel }: any) => {
      const stockNewsService = new StockService(PersonalStockInfoModel);
      const { data, pageInfo } = await stockNewsService.getPersonalStocksName();
      return {
        status: 200,
        message: 'Success',
        data,
        pageInfo
      };
    },
    stockHistory: async (_: RootFieldFilter, args: IStockTradingHistoryParams, { PersonalStockInfoModel }: any) => {
      const { tradingKey, options } = args;
      const stockNewsService = new StockService(PersonalStockInfoModel);
      const { data, pageInfo } = await stockNewsService.getStockTradingHistory(tradingKey, options);
      return {
        status: 200,
        message: 'Success',
        data,
        pageInfo
      };
    }
  }
};
