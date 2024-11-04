import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import healthRoutes from './routes/health';
import { errorHandler } from './middleware/errorHandler';
import { connectProducer } from './events/publisher';

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/userdb';

app.use(express.json());
app.use('/users', userRoutes);
app.use('/', healthRoutes);
app.use(errorHandler);

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    await connectProducer();

    app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
