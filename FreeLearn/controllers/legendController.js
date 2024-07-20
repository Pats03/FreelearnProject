import { StatusCodes } from 'http-status-codes';
import { Media } from '../models/database.js';
export const allmedia = async (req, res) => {
  const media = await Media.find({});

  res.status(StatusCodes.OK).json({media });
};
