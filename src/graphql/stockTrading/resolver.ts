import { RootFieldFilter } from 'graphql-tools';
import StockService from '../../services/stock.service';
import { IContext, ICreateStockTradingAgrs, ICreateStockTradingItemAgrs, IStockTradingItemParams, IStockTradingParams } from '../../common/interface';

export default {
  Query: {
    StockTradingSession: async (_: RootFieldFilter, args: IStockTradingParams, { db }: IContext) => {
      const stockService = new StockService(db);
      const { filter = {}, limit = 10, offset = 0 } = args;
      const { data, pageInfo } = await stockService.StockTradingSession({ filter, limit, offset });
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
    createStockTrading: async (_: RootFieldFilter, { input }: ICreateStockTradingAgrs, { db }: IContext) => {
      const stockService = new StockService(db);
      return stockService.createStockTrading(input);
    },
    createStockTradingItem: async (_: RootFieldFilter, { input }: ICreateStockTradingItemAgrs, { db }: IContext) => {
      const stockService = new StockService(db);
      return stockService.createStockTradingItem(input);
    }
  }
};
