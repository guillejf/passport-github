//@ts-check
import { Schema, model } from 'mongoose';

export const OderModel = model(
  'orders',
  new Schema({
    name: String,
    size: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium',
    },
    price: Number,
    quantity: Number,
    date: Date,
  })
);
