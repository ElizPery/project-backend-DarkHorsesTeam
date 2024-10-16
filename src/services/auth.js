
import { UsersCollection } from '../db/models/User.js';
import { SessionCollection } from '../db/models/Session.js';


export const findSessionByAccessToken = async (accessToken) => {
  return await SessionCollection.findOne({ accessToken });
};


export const findUser = async (filter) => {
  return await UsersCollection.findOne(filter);
};
