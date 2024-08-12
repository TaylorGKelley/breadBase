import express from 'express';
import AppError from './utils/AppError.js';
import errorController from './controllers/errorController.js';
import { productRoutes, recipeRoutes } from './routes/index.js';

const app = express();
app.use(express.json());

const baseRoute = '/api/v1';
app.use(`${baseRoute}/products`, productRoutes);
app.use(`${baseRoute}/recipes`, recipeRoutes);

app.all('*', (req, res, next) => {
  console.log('404');
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

export default app;
