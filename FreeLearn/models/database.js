import mongoose, { Schema } from 'mongoose';
const ClassSchema = new mongoose.Schema({
  standard: { type: Number },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
});
const SubjectSchema = new mongoose.Schema({
  name: { type: String},
  chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapters' }],
  standard: { type: Schema.Types.ObjectId, ref: 'Class' },
});
const chapterSchema = new mongoose.Schema({
  name: { type: String },
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
});
const topicSchema = new mongoose.Schema({
  name: { type: String },
  media: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
  Chapter: { type: Schema.Types.ObjectId, ref: 'Chapters' },
});
const mediaSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      default: '',
    },
    video: {
      type: String,
    },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Teacher schema
    topics: { type: Schema.Types.ObjectId, ref: 'Topic' },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Class = mongoose.model('Class', ClassSchema);
const Subject = mongoose.model('Subject', SubjectSchema);
const Chapters = mongoose.model('Chapters', chapterSchema);
const Topic = mongoose.model('Topic', topicSchema);
const Media = mongoose.model('Media', mediaSchema);
export { Class, Subject, Chapters, Topic, Media };
