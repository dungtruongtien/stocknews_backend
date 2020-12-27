import { startOfDay, endOfDay, subDays } from 'date-fns';
import { IPersonalPropertyQueryInput } from '../common/interface';

export default class PersonalPropertyService {
  private PersonalPropertyModel: any;
  constructor(personalPropertyModel: any) {
    this.PersonalPropertyModel = personalPropertyModel;
  }

  async list({ filter }: IPersonalPropertyQueryInput) {
    const now = new Date();
    const { fromDate = startOfDay(now), endDate = subDays(endOfDay(now), 7) } = filter;
    return this.PersonalPropertyModel.find({
      date: {
        $gte: fromDate,
        $lte: endDate
      }
    });
  }
}
