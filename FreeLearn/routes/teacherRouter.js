import {fetchmedia} from '../controllers/teacherController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { Router } from 'express';
const router = Router();
router.get('/teachercontent',authenticateUser,fetchmedia);
export default router;
