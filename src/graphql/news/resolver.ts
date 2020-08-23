import { RootFieldFilter } from 'graphql-tools';
import StockNewsService from '../../services/stockNews.service';
import { IStockNews } from '../../common/interface';


export default {
  Query: {
    news: async (_: RootFieldFilter, args: any, { esClient }: any) => {
      const stockNewsService = new StockNewsService(esClient);
      const news: IStockNews[] = await stockNewsService.getStockNews();
      console.log('news-------', news);
      return {
        status: 200,
        message: 'Success',
        data: news
      };
    }
  }
};
