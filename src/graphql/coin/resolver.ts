import { RootFieldFilter } from 'graphql-tools';
import { BINANCE_CRYPTO_PROFILE_STREAM } from '../../config/constant';
import CoinService from '../../services/coin.service';

const globalSocketClient = {};

export default {
  Query: {
    coins: (_: RootFieldFilter, agrs: null, { CoinModel }: any) => {
      const coinService = new CoinService(CoinModel);
      return coinService.getListCoins();
    },
    trackingListCoins: async (_: RootFieldFilter, agrs: null, context: any) => {
      const { CoinModel, pubsub } = context;
      const coinService = new CoinService(CoinModel, pubsub);
      const listCoins = await coinService.getListCoins();
      const connectStr = listCoins.reduce((total: any, coin: any, idx: number) => {
        if (idx === 0) {
          return `${total}${coin.abbreviations}@trade`;
        }
        return `${total}/${coin.abbreviations}@trade`;
      }, 'wss://stream.binance.com:9443/stream?streams=');
      const client = await coinService.createClient(connectStr);
      context.SocketClients.push(client);
      coinService.onConnect();
      return { message: 'Success' };
    }
  },
  Subscription: {
    binanceCoinProfile: {
      subscribe: (_: any, agrs: any, context: any) => {
        return context.pubsub.asyncIterator(BINANCE_CRYPTO_PROFILE_STREAM);
      }
    }
  }
};
