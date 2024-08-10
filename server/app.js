import express from 'express';
import AppError from './utils/AppError.js';
import errorController from './controllers/errorController.js';
import recipeRouter from './routes/productRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/v1/products', recipeRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

export default app;
