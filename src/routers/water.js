import { Router } from "express";
import { authenticate } from '../middlewares/authenticate.js';
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { getWaterForMonthController } from "../controllers/water.js";
import validateBody from "../utils/validateBody.js";
import { waterForMonthSchema } from "../validation/water.js";

const waterRouter = Router();

waterRouter.use(authenticate);
waterRouter.post("/month" , validateBody(waterForMonthSchema) ,ctrlWrapper(getWaterForMonthController));

export default waterRouter;
