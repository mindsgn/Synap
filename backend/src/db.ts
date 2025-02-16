import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectOptions = { };

  const response = await mongoose.connect(`${process.env.MONGODB_URL}`, options);
};

export { connectToDatabase };
