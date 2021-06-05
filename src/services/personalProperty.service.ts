import { format } from 'date-fns';

interface IAggregateByMonthIdData {
  month: number;
  year: number;
}

interface IAggregateByMonthData {
  _id: IAggregateByMonthIdData;
  price: number;
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
    return data.sort((a, b) => {
      return b._id.year - a._id.year & b._id.month - a._id.month;
    }).map(property => {
      return { text: `${property._id.month}/${property._id.year}`, price: property.price };
    });
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
      { $sort: { date: -1 } },
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
          price: {
            $last: '$price'
          }
        }
      },
      {
        $sort: {
          year: 1,
          month: 1
        }
      },
      {
        $limit: AGG_LIMITATION
      }
    ]);
    return this.formatAggregateByMonthData(data);
  }
}
