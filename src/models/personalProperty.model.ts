import mongoose from 'mongoose';
import { IPersonalPropertyModel } from '../common/interface';

export default mongoose.model<IPersonalPropertyModel>('PersonalProperty', new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    financialPlanning: {
      type: Object,
      required: true
    }
  },
  {
    collection: 'personal_property',
    versionKey: false,
    strict: false
  }
));
