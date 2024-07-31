import { StatusCodes } from 'http-status-codes';
import { NotFoundError,BadRequestError } from '../errors/customErrors.js';
import { nanoid } from 'nanoid';
import { Class, Subject, Topic, Chapters, Media } from '../models/database.js';
import { User, Teacher, Student } from '../models/teacher.js';

export const fetchmedia = async (req, res) => {
  const teacherId = req.user.userId;
  const media = await Media.find({ teacher: teacherId })
    .populate({
      path: 'topics',
      populate: {
        path: 'Chapter',
        populate: {
          path: 'subject',
          populate: { path: 'standard' },
        },
      },
    })
    .populate('teacher'); // Populate the teacher field

  if (!media || media.length === 0) {
    throw new NotFoundError(`media not found for teacher ${teacherId}`);
  }

  res.status(StatusCodes.OK).json({ media });
};

export const recentMedia = async (req, res) => {
  const teacherId = req.user.userId;
  const limit = 10; // Adjust the limit as needed

  try {
    const media = await Media.find({ teacher: teacherId })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(limit) // Limit the number of results
      .populate({
        path: 'topics',
        populate: {
          path: 'Chapter',
          populate: {
            path: 'subject',
            populate: { path: 'standard' },
          },
        },
      })
      .populate('teacher');

    if (!media || media.length === 0) {
      throw new NotFoundError(
        `Media not found for teacher with ID ${teacherId}`
      );
    }

    res.status(StatusCodes.OK).json({ media });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};




export const editmedia = async (req, res) => {
  try {
    const { mediaId } = req.params;
    const { classs, subject, chapter, topicName, video } = req.body;
    const teacherId = req.user.userId;
    const file = req.file;

    if (!classs || !subject || !chapter || !topicName || !file) {
      throw new BadRequestError('Please provide all required fields');
    }

    // Find the media by ID
    let media = await Media.findById(mediaId);
    if (!media) {
      throw new NotFoundError(`Media not found with ID: ${mediaId}`);
    }

    // Save the old topic ID
    const oldTopicId = media.topics;

    // Update media details
    media.file = file ? file.filename : media.file;
    media.video = video || media.video;

    // Find or create the class
    let classObj = await Class.findOne({ standard: classs });
    if (!classObj) {
      classObj = await Class.create({
        standard: classs,
        subjects: [],
      });
    }

    // Find or create the subject within the context of the class
    let newSubject = await Subject.findOne({
      name: subject,
      standard: classObj._id,
    });
    if (!newSubject) {
      newSubject = await Subject.create({
        name: subject,
        standard: classObj._id,
        chapters: [],
      });
    }

    // Ensure subject is associated with the class
    if (!classObj.subjects.includes(newSubject._id)) {
      classObj.subjects.push(newSubject._id);
      await classObj.save();
    }

    // Find or create the chapter within the context of the subject
    let newChapter = await Chapters.findOne({
      name: chapter,
      subject: newSubject._id,
    });
    if (!newChapter) {
      newChapter = await Chapters.create({
        name: chapter,
        subject: newSubject._id,
        topics: [],
      });
    }

    // Find or create the topic within the context of the chapter
    let newTopic = await Topic.findOne({
      name: topicName,
      Chapter: newChapter._id,
    });
    if (!newTopic) {
      newTopic = await Topic.create({
        name: topicName,
        Chapter: newChapter._id,
        media: [],
      });
    }

    // If the old and new topics are different, update references
    if (String(oldTopicId) !== String(newTopic._id)) {
      // Remove media reference from old topic
      const oldTopic = await Topic.findById(oldTopicId);
      if (oldTopic) {
        oldTopic.media.pull(media._id);
        await oldTopic.save();
      }

      // Associate Media with new Topic
      newTopic.media.push(media._id);
      await newTopic.save();

      // Update media's topic reference
      media.topics = newTopic._id;
    }

    // Save updated media
    await media.save();

    // Ensure associations are correct
    if (!newSubject.chapters.includes(newChapter._id)) {
      newSubject.chapters.push(newChapter._id);
      await newSubject.save();
    }

    if (!newChapter.topics.includes(newTopic._id)) {
      newChapter.topics.push(newTopic._id);
      await newChapter.save();
    }

    res.status(StatusCodes.OK).json({
      message: 'Media updated successfully',
      media,
    });
  } catch (error) {
    console.error('Error updating media:', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error' });
  }
};


export const singlemedia = async (req, res) => {
  try {
    const { mediaId } = req.params;

    // Fetch the media by ID and populate necessary references
    const media = await Media.findById(mediaId)
      .populate({
        path: 'topics',
        populate: {
          path: 'Chapter',
          populate: {
            path: 'subject',
            populate: { path: 'standard' },
          },
        },
      })
      .populate('teacher', 'name email role');

    if (!media) {
      throw new NotFoundError(`Media not found with ID: ${mediaId}`);
    }

    res.status(StatusCodes.OK).json({ media });
  } catch (error) {
    console.error('Error fetching media:', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error' });
  }
};

