import mongoose from 'mongoose';
import { env } from '../env';

const connectDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log('✅ MongoDB Atlas conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;