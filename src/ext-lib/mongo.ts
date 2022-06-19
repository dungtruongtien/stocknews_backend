import mongoose from 'mongoose';

export default function connect() {
  mongoose.connect('mongodb://admin:admin@localhost:27017/stock_eco?authSource=admin?', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

