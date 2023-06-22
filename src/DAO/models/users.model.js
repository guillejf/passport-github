//@ts-check
import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    max: 100,
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});
schema.plugin(monsoosePaginate);
export const UserModel = model('users', schema);
