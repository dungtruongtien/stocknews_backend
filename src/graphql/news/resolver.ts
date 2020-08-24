import { RootFieldFilter } from 'graphql-tools';
import StockNewsService from '../../services/stockNews.service';
import { INewsQueryInput } from '../../common/interface';


export default {
  Query: {
    news: async (_: RootFieldFilter, args: INewsQueryInput = { from: 0, size: 10 }, { esClient }: any) => {
      const { from, size } = args;
      const stockNewsService = new StockNewsService(esClient);
      const { data, pageInfo } = await stockNewsService.getStockNews({ from, size });
      return {
        status: 200,
        message: 'Success',
        data,
        pageInfo
      };
    }
  }
};
