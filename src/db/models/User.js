import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateOptions } from "./hooks.js";
import { emailRegexp } from '../../constants/users.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true
    },
    dailyNorma: {
      type: Number,
      required: true,
      default: 1500,
    },
    gender: {
      type: String,
      enum: ['man', 'woman'],
      required: true,
      default: 'woman',
    },
    photo: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateOptions);

export const UsersCollection = model('user', userSchema);