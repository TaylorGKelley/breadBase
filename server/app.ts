import express from 'express';
import { authRoutes, bakeryRoutes, recipeRoutes } from './routes';
import passport from 'passport';
import './config/passport';

const app = express();
app.use(express.json());
app.use(passport.initialize());

const baseRoute = '/api/v1';
app.use(`${baseRoute}`, authRoutes);
app.use(`${baseRoute}/recipes`, recipeRoutes);
app.use(`${baseRoute}/bakeries`, bakeryRoutes);

app.all('*', (req, res, next) => {
  console.log('404');
  next(new Error(`Can't find ${req.originalUrl} on this server`));
});

export default app;
