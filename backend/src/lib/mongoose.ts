import mongoose from 'mongoose';
import config from '@/config';
import type { ConnectOptions } from 'mongoose';
import { logger } from './winston';

const connectionOptions: ConnectOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
  dbName: 'knots',
};

const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MONGO URI is missing');
  }

  try {
    await mongoose.connect(config.MONGO_URI, connectionOptions);
    logger.info('Database connected successfully');
  } catch (err) {
    logger.error('Failed to connect to database', err);
  }
};

const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('Database disconnected successfully');
  } catch (err) {
    logger.error('Error during disconnecting from database', err);
  }
};

export { connectToDatabase, disconnectDatabase };
