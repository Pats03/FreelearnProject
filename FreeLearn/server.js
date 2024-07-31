
import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';




//routes
import studentroute from './routes/studentRouter.js';
import authRouter from './routes/authRouter.js';
import teacherRouter from './routes/teacherRouter.js'
import legendRouter from './routes/legendRouter.js';
import userRouter from './routes/userRouter.js';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { StatusCodes } from 'http-status-codes';
import { authenticateUser } from './middleware/authMiddleware.js';


app.use('/files', express.static('files'));


app.use(cookieParser());

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Get All subs
// app.get('/api/v1/subs')
// //Create Job

// app.post('/api/v1/subs');
// // GET SINGLE JOB

// app.get('/api/v1/subs/:id');
//edit classs
// app.patch('/api/v1/subs/:id', (req, res) => {
//   const { classs, subject, topic } = req.body;
//   if (!classs) {
//     return res.status(400).json({ msg: 'please provide class name' });
//   }
//   const { id } = req.params;
//   const sub = subs.find((sub) => sub.id === id);
//   if (!sub) {
//     return res.status(404).json({ msg: `no student with id ${id}` });
//   }

//   sub.classs = classs;
//   res.status(200).json({ msg: 'class modified', sub });
// });
// app.delete('/api/v1/subs/:id', (req, res) => {
//   const { id } = req.params;
//   const sub = subs.find((sub) => sub.id === id);
//   if (!sub) {
//     return res.status(404).json({ msg: `no student with id ${id}` });
//   }
//   const newstudents = subs.filter((sub) => sub.id !== id);
//   subs = newstudents;
//   res.status(200).json({ msg: 'student deleted' });
// });
// app.get('/', (req, res) => {
//   res.send('hello world');
// });
// app.post('/', (req, res) => {
//   console.log(req);

//   res.json({ message: 'Data received', data: req.body });
// });

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});


app.use('/api/v1/subs', studentroute);

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', authenticateUser, userRouter);

app.use('/api/v1/teacher', teacherRouter);

app.use('/api/v1/legend', legendRouter);


app.use('*', (req, res) => {
  res.status(404).json({ msg: 'no route matched' });
});

app.use(errorHandlerMiddleware); //=> {try and catch vaadey badhalu u can use
//   console.log(err);
//   res
//     .status(StatusCodes.INTERNAL_SERVER_ERROR)
//     .json({ msg: 'something went wrong' });
// });
// try {
//   const response = await fetch(
//     'https://www.course-api.com/react-useReducer-cart-project'
//   );
//   const cartData = await response.json();
//   console.log(cartData);
// } catch (error) {
//   console.log(error);
// }

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
//
// app.listen(port, () => {
//   console.log(`server running on PORT ${port}....`);
// });
