import { RootFieldFilter } from 'graphql-tools';
import StockService from '../../services/stock.service';
import { IStockTradingItemParams, IStockTradingParams } from '../../common/interface';

export default {
  Query: {
    stockTradingSessions: async (_: RootFieldFilter, args: IStockTradingParams, { StockTradingModel }: any) => {
      const stockService = new StockService(StockTradingModel);
      const { filter = {}, limit = 10, offset = 0 } = args;
      const { data, pageInfo } = await stockService.stockTradingSessions({ filter, limit, offset });
      return {
        status: 200,
        message: 'Success',
        data,
        pageInfo
      };
    },
    stockTradingItems: async (_: RootFieldFilter, args: IStockTradingItemParams, { StockTradingModel, StockTrading }: any) => {
      const { filter, limit = 10, offset = 0 } = args;
      const stockService = new StockService(StockTradingModel);
      const dataResp = await stockService.getStockTradingItems({ filter, limit, offset });
      if (!dataResp) return null;
      return {
        status: 200,
        message: 'Success',
        data: dataResp.data,
        pageInfo: dataResp.pageInfo
      };
    }
  }
};
