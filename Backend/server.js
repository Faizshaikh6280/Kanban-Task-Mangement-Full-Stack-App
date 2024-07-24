import dotenv from 'dotenv';
import connectToDB from './db/connectToDB.js';
dotenv.config({ path: './.env' });
// for handling javascript syntax error
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('uncaught Exception 💥 Shutting down...');
  process.exit(1);
});
import app from './app.js';

// connect to mongoDB database
connectToDB();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Server listning on port', port);
});

// for handling promises error
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
