import mongoose, { Types } from 'mongoose';
import { Schema } from 'mongoose';
import { Subject, Chapters, Topic, Media } from './database.js';

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin', 'legend'],
    default: 'user',
  },
});
const User = mongoose.model('User', UserSchema);

const TeacherSchema = mongoose.Schema({
  media: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
  default: [],
});
const StudentSchema = new Schema({
  standard: { type: Number, required: true },
});

StudentSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

TeacherSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

const Student = User.discriminator('student', StudentSchema);
const Teacher = User.discriminator('teacher', TeacherSchema);

export { User, Student, Teacher };
