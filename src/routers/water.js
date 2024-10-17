import { Router } from "express";
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getTodayWaterController } from "../controllers/water.js";
import { authenticate } from '../middlewares/authenticate.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.get('/today', ctrlWrapper(getTodayWaterController));

export default waterRouter;
