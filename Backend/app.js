import express from 'express';
import morgan from 'morgan';

import boardRouter from './routes/boardRoutes.js';
import taskRouter from './routes/tasksRoutes.js';
import columnRouter from './routes/coulmnRoutes.js';
import userRouter from './routes/userRoutes.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/boards', boardRouter);
app.use('/api/columns', columnRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/auth', userRouter);

const __dirname = path.resolve();

// using this we will access our frontend from the server
app.use(express.static(path.join(__dirname, '/Frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
});

// This will catch all other routes that did't match above.
app.use('*', (req, res) => {
  res.send(`Can't find the ${req.originalUrl} on this server!`);
});

// Gloabr error handler.
app.use((err, req, res, next) => {
  console.log('Error 💥', err);
  res.send(`Error 💥 ${err}`);
});

export default app;
