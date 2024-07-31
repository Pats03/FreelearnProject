import mongoose from 'mongoose';
import { param } from 'express-validator';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import { UnauthorizedError } from '../errors/customErrors.js';
import { User } from '../models/teacher.js';
import { Class } from '../models/database.js';
export const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateUserInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters long')
    .trim(),
  //body('email')
  // .isEmail()
  // .withMessage('Valid email is required')
  body('email')
    .notEmpty()
    .withMessage('Please Enter Email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 3 })
    .withMessage('Password must be at least 3 characters long'),
  body('role')
    .isIn(['user', 'admin', 'legend'])
    .withMessage('Role must be one of: Teacher or student')
    .custom((value, { req }) => {
      if (value === 'user') {
        // Additional validation for user role
        if (!req.body.standard) {
          throw new Error('Standard is required for user role');
        }
      }
      return true;
    }),
]);

// export const validatestandardParam = withValidationErrors([
//   param('standard').custom(async (value) => {
//     const classExists = await Class.findOne({ standard: value });
//     if (!classExists) {
//       throw new Error('Standard not found');
//     }
//     return true;
//   }),
// ]);

// export const validateteacherIdParam = withValidationErrors([
//   param('teacherId')
//     .custom((value) => mongoose.Types.ObjectId.isValid(value))
//     .withMessage('invalid MongoDB id'),
// ]);

export const validatemediaIdParam = withValidationErrors([
  param('media_id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    const islegend = req.user.role === 'legend';
    if (!islegend)
      throw UnauthorizedError('not authorized to access this route');
  }),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

// Custom middleware to check if the user has the 'legend' role
export const checkLegendRole = (req, res, next) => {
  // Assuming req.user.role contains the user's role
  if (req.user.role === 'legend') {
    next(); // User has the 'legend' role, proceed to the next middleware or route handler
  } else {
    next(new UnauthorizedError('Not authorized to access this route')); // User does not have the 'legend' role
  }
};

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  //body('email')
  // .isEmail()
  // .withMessage('Valid email is required')
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('role').custom(async (value, { req }) => {
    if (value !== req.user.role) {
      throw new Error('Cant change the role');
    }
  }),
]);
