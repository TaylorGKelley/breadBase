import mongoose from 'mongoose';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! -- Shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app.js';

const dbConnection = process.env?.DB_URI?.replace(
  '<password>',
  process.env.DB_PASSWORD ?? 'password',
);

if (dbConnection !== undefined) {
  mongoose
    .connect(dbConnection)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(`Database connection failed: ${err.message}`));
} else {
  console.log('No DB connection string provided. Please check the .env file.');
}

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port};`);
  console.log(`Test locally on: http://localhost:${port}/api/v1`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! -- Shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // 0 stands for success while 1 stands for uncalled for exception
  });
});
