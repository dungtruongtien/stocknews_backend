import mongoose from 'mongoose';

export default function connect() {
  mongoose.connect('mongodb://localhost:27017/stocknews', {
    useNewUrlParser: true, useUnifiedTopology: true
  });
}

