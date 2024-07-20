import { Router } from 'express';
const router = Router();

import {
 
  createsub,
  getdetails,
  verifyclass,
  studentdelete,
  
} from '../controllers/studentcontroller.js';

import {
  
  validatemediaIdParam,
} from '../middleware/validationMiddleware.js';

import { authenticateUser } from '../middleware/authMiddleware.js';

// router.get('/', getAllJobs);
// router.post('/', createJob);
//it is we can write a seperate write to diff post and get and all methods and the functions
//createsub
//getallsub
//getallchapters
//getalltopics
//adminverify

router.route('/createcontent').post(authenticateUser, createsub);
router
  .route('/getallsubs')
  .get(authenticateUser, getdetails)
  .delete(studentdelete);
router.route('/:media_id').patch(authenticateUser,validatemediaIdParam, verifyclass);
// router.get('/check', checkuser);
// router.route('/').post(validateUserInput, createuser);
export default router;
