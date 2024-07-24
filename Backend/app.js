import express from 'express';
import morgan from 'morgan';

import boardRouter from './routes/boardRoutes.js';
import taskRouter from './routes/tasksRoutes.js';
import columnRouter from './routes/coulmnRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/boards', boardRouter);

app.use('/api/columns', columnRouter);

app.use('/api/tasks', taskRouter);

// This will catch all other routes that did't match above.
app.all('*', function (req, res, next) {
  next(`Can't find ${req.originalUrl} on this server!`);
});

// Gloabr error handler.
app.use((err, req, res, next) => {
  console.log('Error 💥', err);
  res.send(`Error 💥 ${err}`);
});

export default app;
