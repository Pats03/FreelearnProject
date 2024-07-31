import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { comparePassword } from '../utils/passwordUtils.js';
import { NotFoundError, UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';
import { nanoid } from 'nanoid';
import { Class, Subject, Topic, Chapters, Media } from '../models/database.js';
import { User, Teacher, Student } from '../models/teacher.js';
export const createuser = async (req, res) => {
  const { name, email, media, standard } = req.body;
  var { role, password } = req.body;
  const isFirstAccount = (await User.countDocuments()) === 0;
  if (isFirstAccount) {
    role = 'legend';
  } else {
    if (role === 'legend') {
      role = 'admin';
    } else {
      role = role;
    }
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(req.body.password, salt);

  // req.body.password = hashedPassword;
  let user;

  if (role === 'legend') {
    // user = new User({ name, email, password, role });
    user = await User.create({ name, email, password, role });
  } else if (role === 'admin') {
    //user = new Teacher({ name, email, password, role, media });
    user = await Teacher.create({ name, email, password, role, media });
  } else if (role === 'user') {
    //user = new Student({ name, email, password, role, standard });
    user = await Student.create({ name, email, password, role, standard });
  } else {
    //return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid role' });
    throw new NotFoundError('Invalid role');
  }

  //console.log('User with password:', user);
  await user.save();

  res
    .status(StatusCodes.CREATED)
    .json({ message: `${role} created successfully` });
  // } catch (error) {
  //   res
  //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //     .json({ error: error.message });
  // }
};

export const login = async (req, res) => {
  // check if user exists
  // check if password is correct

  const user = await User.findOne({ email: req.body.email });

  if (!user) throw new UnauthenticatedError('invalid credentials');

  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');
  //res.send('login route');

  if(user.role==='user')
  {
    var token = createJWT({ userId: user._id, role: user.role,standard:user.standard });
  }
  else
  {
    var token = createJWT({ userId: user._id, role: user.role });
  }
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });
  //console.log(token);
res.status(StatusCodes.CREATED).json({ msg: 'user logged in' });
};


export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
