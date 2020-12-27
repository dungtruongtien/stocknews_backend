import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    personalPropertySession(filter: PersonalPropertyFilter!): PersonalPropertyPayload
  }

  input PersonalPropertyFilter {
    fromDate: DateTime!
    endDate: DateTime!
  }

  type PersonalPropertyPayload {
    status: Int
    message: String
    data: [PersonalProperty]
  }

  type PersonalProperty {
    _id: String
    price: Int
    date: Date
    financialPlanning: FinancialPlanning
  }

  type FinancialPlanning {
    targetPercent: Int
    targetPrice: Int
    actualResultMonthPercent: Float
  }
`;
