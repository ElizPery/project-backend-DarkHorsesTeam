import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import { updateWaterController } from '../controllers/water.js';
import { validateBody } from '../utils/validateBody.js';
import { updateWaterSchema } from '../validation/water.js';
import isValidId from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.patch(
  '/:id',
  isValidId,
  validateBody(updateWaterSchema),
  ctrlWrapper(updateWaterController.updateWater),
);

export default waterRouter;
