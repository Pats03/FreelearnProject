import { allmedia } from "../controllers/legendController.js";
import { authenticateUser } from '../middleware/authMiddleware.js';
import {checkLegendRole} from '../middleware/validationMiddleware.js'
import { Router } from 'express';
const router = Router();
router.get('/',authenticateUser,checkLegendRole,allmedia);

export default router;
