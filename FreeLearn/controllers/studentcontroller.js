//import { NotFoundError } from '../customErrors.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import { nanoid } from 'nanoid';
import { Class, Subject, Topic, Chapters, Media } from '../models/database.js';
import { User, Teacher, Student } from '../models/teacher.js';

//import { NotFoundError } from '..error/customErrors.js';
//import { Chapters } from '../models/database.js';
// let subs = [
//   { id: nanoid(), classs: '1', subject: 'math', topic: 'calculus' },
//   { id: nanoid(), classs: '1', subject: 'physics', topic: 'NLM' },
// ];

//get all student

//create student

export const createsub = async (req, res) => {
  try {
    const { classs, subject, chapter, topicName, video } = req.body;  
    const teacherId = req.user.userId;
    const file = req.file;

    if (!classs || !subject || !chapter || !topicName || !file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Please provide all required fields' });
    }

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
        verified: false,
      });
    }

    // Create Media document
    let newMedia = await Media.create({
      file: file.filename,
      video: video || '',
      teacher: teacherId,
      topics: newTopic._id,
      verified: false,
    });

    // Associate Media with Topic
    newTopic.media.push(newMedia._id);
    await newTopic.save();

    // Associate Media with Teacher
    let teacher = await User.findById(teacherId);
    if (teacher && teacher.role === 'admin') {
      teacher.media.push(newMedia._id);
      await teacher.save();
    }

    if (!newSubject.chapters.includes(newChapter._id)) {
      newSubject.chapters.push(newChapter._id); // Add chapter to subject
      await newSubject.save();
    }

    if (!newChapter.topics.includes(newTopic._id)) {
      newChapter.topics.push(newTopic._id); // Add topic to chapter
      await newChapter.save();
    }

    res.status(StatusCodes.CREATED).json({
      message: 'Subject, chapter, topic, and media created successfully',
    });
  } catch (error) {
    console.error('Error creating subject, chapter, and topic:', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error' });
  }
};

//get single student
export const getdetails = async (req, res) => {
  //console.log(req);
  const standard = req.user.standard; // Assuming standard is passed as a route parameter
  const classObj = await Class.findOne({ standard }).populate({
    path: 'subjects',
    populate: {
      path: 'chapters',
      populate: {
        path: 'topics',
        populate: {
          path: 'media',
          populate: {
            path: 'teacher',
            select: 'name email', // Populate teacher details
          },
        },
      },
    },
  });

  if (!classObj) {
    //throw new NotFoundError(`class not found ${standard}`);
    return res.status(404).json({ error: 'Class not found' });
  }

  // Return the subjects of the class along with chapters and topics
  res.status(StatusCodes.OK).json({ subjects: classObj.subjects });
};

//edit class
export const verifyclass = async (req, res) => {
  const { media_id } = req.params;

  // Find the media by its ID and update the verified field to true
  const media = await Media.findByIdAndUpdate(
    media_id,
    { verified: true },
    { new: true }
  );

  if (!media) {
    //return res.status(404).json({ error: 'Media not found' });
    throw new NotFoundError(`Media not found ${media_id}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ message: 'Media verified successfully', media });
};

//create-user
// export const createuser = async (req, res) => {
//   const { name, email, password, role, media, standard } = req.body;

//   let user;

//   if (role === 'legend') {
//    // user = new User({ name, email, password, role });
//    user = await User.create({ name, email, password, role });
//   } else if (role === 'admin') {
//     //user = new Teacher({ name, email, password, role, media });
//      user = await Teacher.create({ name, email, password, role, media });
//   } else if (role === 'user') {
//     //user = new Student({ name, email, password, role, standard });
//     user = await Student.create({ name, email, password, role, standard });
//   } else {
//     return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid role' });
//   }

//   await user.save();
//   res
//     .status(StatusCodes.CREATED)
//     .json({ message: `${role} created successfully`, user });
//   // } catch (error) {
//   //   res
//   //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
//   //     .json({ error: error.message });
//   // }
// };

//delete student
// export const studentdelete = async (req, res) => {
//   const { id } = req.params;
//   const sub = subs.find((sub) => sub.id === id);
//   if (!sub) {
//     return res.status(404).json({ msg: `no student with id ${id}` });
//   }
//   const newstudents = subs.filter((sub) => sub.id !== id);
//   subs = newstudents;
//   res.status(200).json({ msg: 'student deleted' });
// };

// export const checkuser = async (req,res)=>{
//   res.send("tej");
// }
