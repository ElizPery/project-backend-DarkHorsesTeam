
import { Router } from "express";
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { waterPostShema, waterForMonthSchema } from '../validation/water.js';
import validateBody from './../utils/validateBody.js';
import {
  addWaterController,
  getWaterForMonthController,
  getTodayWaterController
} from '../controllers/water.js';


const waterRouter = Router();

waterRouter.use(authenticate);


waterRouter.get('/today', ctrlWrapper(getTodayWaterController));

waterRouter.post(
  '/',
  validateBody(waterPostShema),
  ctrlWrapper(addWaterController),
);

waterRouter.post(
  '/month',
  validateBody(waterForMonthSchema),
  ctrlWrapper(getWaterForMonthController),
);


export default waterRouter;
