import { Client } from '@elastic/elasticsearch';
import { IStockNews } from '../common/interface';

interface IEsClient {
  search?: any;
}

export default class StockNewsService {
  private esClient: IEsClient = {};
  constructor(esClient: Client) {
    this.esClient = esClient;
  }

  async getStockNews() {
    const result = await this.esClient.search({
      index: 'stocknews'
    });
    return result.body.hits.hits.map(({ _source }: {_source: IStockNews}) => ({ ..._source }));
  }
}
