import { Router } from "express";
import { authenticate } from '../middlewares/authenticate.js';

waterRouter.use(authenticate);


const waterRouter = Router();

export default waterRouter;
