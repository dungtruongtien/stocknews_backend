import { RootFieldFilter } from 'graphql-tools';
import StockService from '../../services/stock.service';
import { IContext, ICreateStockTradingAgrs, ICreateStockTradingItemAgrs, IStockTradingItemParams, IStockTradingParams } from '../../common/interface';

export default {
  Query: {
    stockTrading: async (_: RootFieldFilter, args: IStockTradingParams, { db }: IContext) => {
      const stockService = new StockService(db);
      const { filter = {}, limit = 10, offset = 0 } = args;
      return stockService.stockTrading({ filter, limit, offset });
    },
    stockTradingItems: async (_: RootFieldFilter, args: IStockTradingItemParams, { db }: IContext) => {
      const { filter, limit = 10, offset = 0 } = args;
      const stockService = new StockService(db);
      return stockService.getStockTradingItems({ filter, limit, offset });
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
