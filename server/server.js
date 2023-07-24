import mongoose from 'mongoose';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! -- Shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app.js';

const dbConnection = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log(err.message));

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! -- Shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // 0 stands for success while 1 stands for uncalled for exception
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
