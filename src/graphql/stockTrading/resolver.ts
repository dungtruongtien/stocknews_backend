import { RootFieldFilter } from 'graphql-tools';
import StockService from '../../services/stock.service';
import { IContext, ICreateStockTradingInput, IStockTradingItemParams, IStockTradingParams } from '../../common/interface';

export default {
  Query: {
    stockTradingSessions: async (_: RootFieldFilter, args: IStockTradingParams, { db }: IContext) => {
      const stockService = new StockService(db);
      const { filter = {}, limit = 10, offset = 0 } = args;
      const { data, pageInfo } = await stockService.stockTradingSessions({ filter, limit, offset });
      return {
        status: 200,
        message: 'Success',
        data,
        pageInfo
      };
    },
    stockTradingItems: async (_: RootFieldFilter, args: IStockTradingItemParams, { db }: IContext) => {
      const { filter, limit = 10, offset = 0 } = args;
      const stockService = new StockService(db);
      const dataResp = await stockService.getStockTradingItems({ filter, limit, offset });
      if (!dataResp) return null;
      return {
        status: 200,
        message: 'Success',
        data: dataResp.data,
        pageInfo: dataResp.pageInfo
      };
    }
  },
  Mutation: {
    createStockTrading: async (_: RootFieldFilter, args: ICreateStockTradingInput, { db }: IContext) => {
      const stockService = new StockService(db);
      return stockService.createStockTrading(args);
    }
  }
};
