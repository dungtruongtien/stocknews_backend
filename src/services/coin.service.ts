import { w3cwebsocket as WebSocketClient } from 'websocket';
import { BINANCE_CRYPTO_PROFILE_STREAM } from '../config/constant';

export default class CoinService {
  private client: any = {};
  private pubsub: any = {};
  private CoinModel: any = {};

  constructor(coinModel: any, pubsub?: any) {
    this.pubsub = pubsub;
    this.CoinModel = coinModel;
  }

  getListCoins = () => {
    return this.CoinModel.find({});
  }

  onConnectFail = () => {
    this.client.on('connectFailed', (error: any) => {
      console.log(`Connect Error: ${error.toString()}`);
    });
  }

  createClient = (connectStr: string) => {
    console.log('connectStr-------', connectStr);
    const client = new WebSocketClient(connectStr);
    this.client = client;
    return client;
  }

  onConnect = () => {
    this.client.onmessage = (message: any) => {
      const streamData = JSON.parse(message.data);
      // console.log('streamData-----', streamData);
      this.pubsub.publish(BINANCE_CRYPTO_PROFILE_STREAM, {
        binanceCoinProfile: { streamName: streamData.stream, price: streamData.data.p }
      });
    };
  }

  close = () => {
    this.client.close();
  }
}
