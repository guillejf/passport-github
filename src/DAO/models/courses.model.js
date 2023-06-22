//@ts-check
import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  title: String,
  description: String,
  dificulty: Number,
  topics: {
    type: Array,
    default: [],
  },
  professor: String,
  students: {
    type: Array,
    default: [],
  },
});

export const CoursesModel = model('courses', courseSchema);
