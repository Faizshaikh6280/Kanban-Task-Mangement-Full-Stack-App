import express from 'express';
import morgan from 'morgan';

import boardRouter from './routes/boardRoutes.js';
import taskRouter from './routes/tasksRoutes.js';
import columnRouter from './routes/coulmnRoutes.js';
import userRouter from './routes/userRoutes.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const corsOptions = {
  origin: 'http://localhost:5173', // Your React app's URL
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/boards', boardRouter);

app.use('/api/columns', columnRouter);

app.use('/api/tasks', taskRouter);
app.use('/api/auth', userRouter);

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
