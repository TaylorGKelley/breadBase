import express from 'express';
import { bakeryRoutes, recipeRoutes } from './routes';

const app = express();
app.use(express.json());

const baseRoute = '/api/v1';
app.use(`${baseRoute}/recipes`, recipeRoutes);
app.use(`${baseRoute}/bakeries`, bakeryRoutes);

app.all('*', (req, res, next) => {
  console.log('404');
  next(new Error(`Can't find ${req.originalUrl} on this server`));
});

export default app;
