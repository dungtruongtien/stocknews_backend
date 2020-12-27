import { Client } from '@elastic/elasticsearch';
import { IStockNews, INewsQueryInput } from '../common/interface';

export default class StockNewsService {
  private esClient: Client;
  constructor(esClient: Client) {
    this.esClient = esClient;
  }

  async getStockNews({ filter = { query: {}, from: 0, size: 10 }, sort }: INewsQueryInput) {
    const { from, size, query } = filter;
    const result = await this.esClient.search({
      index: 'stocknews',
      body: {
        query,
        sort,
        from,
        size
      }
    });
    return {
      data: result.body.hits.hits.map(({ _source }: { _source: IStockNews }) => ({ ..._source })),
      pageInfo: {
        total: result.body.hits.total.value,
        currentPage: from && size ? Math.floor(from / size) + 1 : 1
      }
    };
  }
}
