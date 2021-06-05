import { format } from 'date-fns';

interface IAggregateByMonthIdData {
  month: number;
  year: number;
}

interface IAggregateByMonthData {
  _id: IAggregateByMonthIdData;
  property: any;
}

interface IAggregateByDayData {
  _id: Date;
  price: number;
}

const AGG_LIMITATION = 15;
export default class PersonalPropertyService {
  private PersonalPropertyModel: any;
  constructor(personalPropertyModel: any) {
    this.PersonalPropertyModel = personalPropertyModel;
  }

  formatAggregateByMonthData(data: IAggregateByMonthData[]) {
    return data.map((aggData, idx) => {
      return { text: `${aggData._id.month}/${aggData._id.year}`, price: aggData.property.price, idx };
    }).sort((a, b) => b.idx - a.idx);
  }

  formatAggregateByDayData(data: IAggregateByDayData[]) {
    return data.map(({ _id, price }) => {
      return { text: `${format(_id, 'dd-MM')}`, price };
    }).reverse();
  }

  async aggregateByDate() {
    const data = await this.PersonalPropertyModel.aggregate([
      {
        $group: {
          _id: '$date',
          price: {
            $last: '$price'
          }
        }
      },
      {
        $sort: {
          _id: -1
        }
      },
      {
        $limit: AGG_LIMITATION
      }
    ]);
    return this.formatAggregateByDayData(data);
  }

  async aggregateByMonth() {
    const data = await this.PersonalPropertyModel.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: '$date'
            },
            year: {
              $year: '$date'
            }
          },
          property: {
            $last: '$$ROOT'
          }
        }
      },
      { $sort: { 'property.date': -1 } }
    ]);
    return this.formatAggregateByMonthData(data);
  }
}
