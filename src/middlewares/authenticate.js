import createHttpError from 'http-errors';
import {
  findSessionByAccessToken,
  findSessionByRefreshToken,
  findUser,
} from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    const session = await findSessionByAccessToken(token);

    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await findUser({ _id: session.userId });

    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const validateRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }

    const session = await findSessionByRefreshToken(refreshToken);

    if (!session) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const isRefreshTokenExpired =
      new Date() > new Date(session.refreshTokenValidUntil);
    if (isRefreshTokenExpired) {
      return res.status(401).json({ message: 'Refresh token expired' });
    }

    req.session = session;
    next();
  } catch (error) {
    next(error);
  }
};
