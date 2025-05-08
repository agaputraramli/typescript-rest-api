import express from 'express';
import authRoutes from './route/auth.route';
import inputRoutes from './route/input.route';
import fetchRoutes from './route/fetch.route';
import transactionRoutes from './route/transaction.route';
import { errorHandler } from './utils/errorHandler';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/input', inputRoutes);
app.use('/api/fetch', fetchRoutes);
app.use('/api/transaction', transactionRoutes);
app.use(errorHandler);

export default app;
