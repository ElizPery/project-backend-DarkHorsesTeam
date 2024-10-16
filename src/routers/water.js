import { Router } from "express";
import { authenticate } from '../middlewares/authenticate.js';

router.use(authenticate);

const waterRouter = Router();

export default waterRouter;
