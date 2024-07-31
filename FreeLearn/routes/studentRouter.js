import { Router } from 'express';
const router = Router();

import {
 
  createsub,
  getdetails,
  verifyclass,
  
} from '../controllers/studentcontroller.js';

import {
  
  validatemediaIdParam,
} from '../middleware/validationMiddleware.js';

import { authenticateUser } from '../middleware/authMiddleware.js';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

// router.get('/', getAllJobs);
// router.post('/', createJob);
//it is we can write a seperate write to diff post and get and all methods and the functions
//createsub
//getallsub
//getallchapters
//getalltopics
//adminverify

router
  .route('/createcontent')
  .post(authenticateUser, upload.single('file'), createsub);
router
  .route('/getallsubs')
  .get(authenticateUser, getdetails)
router.route('/:media_id').patch(authenticateUser,validatemediaIdParam, verifyclass);
// router.get('/check', checkuser);
// router.route('/').post(validateUserInput, createuser);
export default router;
