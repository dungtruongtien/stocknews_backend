import { gql } from 'apollo-server-express';

export default gql`
  type Subscription {
    binanceCoinProfile: BinanceCoinProfilePayload
  }

  extend type Query {
    coins: [CoinPayload]
    trackingListCoins: TrackingListCoinsPayload
  }

  type TrackingListCoinsPayload {
    message: String
  }
  
  type CoinPayload {
    _id: ID
    currentPrice: Float
    profit: Float
    name: String
    abbreviations: String
    costPrice: Float
    totalCostPrice: Float
  }

  type BinanceCoinProfilePayload {
    streamName: String
    price: Float
  }
`;
