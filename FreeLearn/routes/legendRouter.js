import { allmedia,deletemedia } from "../controllers/legendController.js";
import { authenticateUser } from '../middleware/authMiddleware.js';
import {checkLegendRole} from '../middleware/validationMiddleware.js'
import { Router } from 'express';
const router = Router();
router.get('/',authenticateUser,checkLegendRole,allmedia);
router.delete('/deletemedia/:mediaId', checkLegendRole,authenticateUser, deletemedia);

export default router;
