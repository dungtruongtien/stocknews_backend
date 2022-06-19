import mongoose from 'mongoose';
import { IIdGenModel } from '../common/interface';

export default mongoose.model<IIdGenModel>('IdGen', new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true
    },
    value: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  },
  {
    collection: '_id_gen',
    versionKey: false,
    strict: false
  }
));
