import express from 'express';
import cookieParser from 'cookie-parser';
import {
  authRoutes,
  bakeryAccessRoutes,
  bakeryRoutes,
  recipeRoutes,
} from './routes';
import passport from 'passport';
import './config/passport';
import productRoutes from './routes/productRoutes';
import cors from 'cors';
import csurf from 'csurf';

const app = express();
app.use(express.json({ limit: '50mb'}));
app.use(cors({
   origin: true,// (https://breadbase.com/) client url
   credentials: true,
 }))
app.use(cookieParser());
// app.use(
  //   csurf({
    //     cookie: true,
    //   }),
    // );
    app.use(passport.initialize());
    
const baseRoute = '/api/v1';
app.use(`${baseRoute}`, authRoutes);
app.use(`${baseRoute}/baker`, bakeryAccessRoutes);
app.use(`${baseRoute}/bakery`, bakeryRoutes);
app.use(`${baseRoute}/recipe`, recipeRoutes);
app.use(`${baseRoute}/product`, productRoutes);

app.all('*', (req, res, next) => {
  console.log('404');
  next(new Error(`Can't find ${req.originalUrl} on this server`));
});

export default app;
