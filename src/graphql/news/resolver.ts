import { RootFieldFilter } from 'graphql-tools';
import StockNewsService from '../../services/stockNews.service';
import { INewsQueryInput } from '../../common/interface';


export default {
  Query: {
    news: async (_: RootFieldFilter, args: INewsQueryInput, { esClient }: any) => {
      const { filter, sort } = args;
      const stockNewsService = new StockNewsService(esClient);
      const { data, pageInfo } = await stockNewsService.getStockNews({ filter, sort });
      return {
        status: 200,
        message: 'Success',
        data,
        pageInfo
      };
    }
  }
};
