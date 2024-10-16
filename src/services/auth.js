
import { UsersCollection } from '../db/models/User.js';
import { SessionCollection } from '../db/models/Session.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from "crypto";
import { accessTokenLifeTime, refreshTokenLifeTime } from '../constants/users.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

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



export const login = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, "Email or password invalid");
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const sessionData = createSession();
  const userSession = await SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });
  return userSession;
};