import { Router } from 'express';
import * as authControllers from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userRegisterSchema, userLoginSchema } from '../validation/users.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(authControllers.registerController),
);

authRouter.post('/logout', ctrlWrapper(authControllers.logoutController));

authRouter.post(
  '/login',
  validateBody(userLoginSchema),
  ctrlWrapper(authControllers.loginController),
);
authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));
export default authRouter;
