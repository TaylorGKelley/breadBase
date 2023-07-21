import express from 'express';
import recipeRouter from './routes/recipeRouter.js';

const app = express();
app.use(express.json());

app.use('/api/v1/bread/recipes', recipeRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Not Found',
    message: `No route for ${req.originalUrl}`,
  });
  next();
});

export default app;
