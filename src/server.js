import express from 'express';
import cors from 'cors';
import waterRouter from './routers/water.js';
import { env } from './utils/env.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import logger from './middlewares/logger.js';
import authRouter from './routers/auth.js';
import userRouter from './routers/user.js';

import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(logger);
  app.use(cookieParser());

  app.use(express.static('uploads'));

  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/water', waterRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
