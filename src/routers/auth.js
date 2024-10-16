import { Router } from "express";
import { authenticate } from '../middlewares/authenticate.js';

authRouter.get('/data', authenticate, ctrlWrapper(getUserCurrentUserController));
authRouter.patch('/userId', jsonParser, authenticate, validateBody(updateDataUserSchema), ctrlWrapper(updateDataUserController));
authRouter.patch('/avatar', authenticate, upload.single('avatar'), ctrlWrapper(updateDataUserController));

const authRouter = Router();


export default authRouter;
