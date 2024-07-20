import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import { nanoid } from 'nanoid';
import { Class, Subject, Topic, Chapters, Media } from '../models/database.js';
import { User, Teacher, Student } from '../models/teacher.js';
export const fetchmedia = async (req, res) => {
  const teacherId = req.user.userId;
  const media = await Media.find({ teacher: teacherId }).populate({
    path: 'topics',
    populate: {
      path: 'Chapter',
      populate: {
        path: 'subject',
        populate: { path: 'standard' },
      },
    },
  });

  if (!media) {
    throw new NotFoundError(`media not found ${teacherId}`);
    //return res.status(404).json({ error: 'Class not found' });
  }
  res.status(StatusCodes.OK).json({ media: media });
};


