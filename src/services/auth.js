
import { UsersCollection } from '../db/models/User.js';
import { SessionCollection } from '../db/models/Session.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';


export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already exist');
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const data = await UsersCollection.create({
    ...payload,
    password: hashPassword,
  });

  delete data._doc.password;
  return data._doc;
};


export const findSessionByAccessToken = async (accessToken) => {
  return await SessionCollection.findOne({ accessToken });
};


export const findUser = async (filter) => {
  return await UsersCollection.findOne(filter);

};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};