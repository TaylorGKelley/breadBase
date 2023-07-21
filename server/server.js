import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app.js';

const dbConnection =
  process.env.DATABASEURI || 'mongodb://127.0.0.1:27017/breadBase';

mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database Connection Successful!'))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
