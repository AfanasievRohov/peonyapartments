import { connect } from 'mongoose';

const connectMongo = async () => {
  try {
    await connect(process.env.MONGO_URI || '');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Can not connect to mongodb')
  }
}

export { connectMongo };
