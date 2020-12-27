import { RootFieldFilter } from 'graphql-tools';
import { IPersonalPropertyQueryInput } from '../../common/interface';
import PersonalPropertyService from '../../services/personalProperty.service';

export default {
  Query: {
    personalPropertySession: async (
      _: RootFieldFilter, args: IPersonalPropertyQueryInput, { PersonalPropertyModel }: any
    ) => {
      const personalPropertyService = new PersonalPropertyService(PersonalPropertyModel);
      const data = await personalPropertyService.list(args);
      return {
        status: 200,
        message: 'Success',
        data
      };
    }
  }
};
