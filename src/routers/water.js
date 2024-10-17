import { Router } from "express";
import { authenticate } from '../middlewares/authenticate.js';
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { getWaterForMonthController } from "../controllers/water.js";

const waterRouter = Router();

waterRouter.use(authenticate);
waterRouter.use("/month" , ctrlWrapper(getWaterForMonthController));

export default waterRouter;
