import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    personalPropertyAgg(filter: PersonalPropertyFilter!): PersonalPropertyPayload
  }

  input PersonalPropertyFilter {
    aggType: PersonalPropertyOutputType!
  }

  enum PersonalPropertyOutputType {
    DATE
    MONTH
  }

  type PersonalPropertyPayload {
    status: Int
    message: String
    data: [PersonalProperty]
  }

  type PersonalProperty {
    text: String
    price: Int
  }
`;
