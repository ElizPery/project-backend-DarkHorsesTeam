import * as authServices from '../services/auth.js';
export const registerController = async (req, res) => {
  const newUser = await authServices.register(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered user',
    data: newUser,
  });
};

export const logoutController = async(req, res)=> {
  const {sessionId} = req.cookies;
  if(sessionId) {
      await authServices.logout(sessionId);
  }

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};