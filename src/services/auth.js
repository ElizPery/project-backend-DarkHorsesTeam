import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/User.js';
import { SessionCollection } from '../db/models/Session.js';
import { accessTokenLifeTime, refreshTokenLifeTime } from '../constants/users.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const findSessionByAccessToken = async (accessToken) => {
  return await SessionCollection.findOne({ accessToken });
};


export const findUser = async (filter) => {
  return await UsersCollection.findOne(filter);
};


