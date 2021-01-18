import { RootFieldFilter } from 'graphql-tools';
import { IPersonalPropertyQueryInput } from '../../common/interface';
import PersonalPropertyService from '../../services/personalProperty.service';

export default {
  Query: {
    personalPropertyAgg: async (
      _: RootFieldFilter, { filter }: IPersonalPropertyQueryInput, { PersonalPropertyModel }: any
    ) => {
      let data: any[] = [];
      const personalPropertyService = new PersonalPropertyService(PersonalPropertyModel);
      const { aggType } = filter;
      if (aggType === 'MONTH') {
        data = await personalPropertyService.aggregateByMonth();
      }
      if (aggType === 'DATE') {
        data = await personalPropertyService.aggregateByDate();
      }
      return {
        status: 200,
        message: 'Success',
        data
      };
    }
  }
};
