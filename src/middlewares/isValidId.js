import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    const validateError = createHttpError(404, `${id} is not valid`);
    next(validateError);
  }

  next();
};

export default isValidId;
