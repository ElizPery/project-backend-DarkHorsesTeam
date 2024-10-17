import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { waterPostShema } from '../validation/water.js';
import ctrlWrapper from './../utils/ctrlWrapper.js';
import validateBody from './../utils/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import * as WaterControllers from '../controllers/water.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.post(
  '/',
  validateBody(waterPostShema),
  ctrlWrapper(WaterControllers.addWaterController),
);

export default waterRouter;
