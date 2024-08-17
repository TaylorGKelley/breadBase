import express from 'express';
import cookieParser from 'cookie-parser';
import {
  authRoutes,
  bakerInviteRoutes,
  bakeryRoutes,
  recipeRoutes,
} from './routes';
import passport from 'passport';
import './config/passport';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const baseRoute = '/api/v1';
app.use(`${baseRoute}`, authRoutes);
app.use(`${baseRoute}/recipe`, recipeRoutes);
app.use(`${baseRoute}/bakery`, bakeryRoutes);
app.use(`${baseRoute}/baker`, bakerInviteRoutes);

app.all('*', (req, res, next) => {
  console.log('404');
  next(new Error(`Can't find ${req.originalUrl} on this server`));
});

export default app;
