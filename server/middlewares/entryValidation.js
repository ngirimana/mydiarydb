import Joi from 'joi';
import response from '../helpers/response';

export const entryValidation = (req, res, next) => {
  const schema = {
    title: Joi.string().max(100).required(),
    description: Joi.string().min(150).max(2000).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return response.errorMessage(req, res, 400, `${result.error.details[0].message}`);
  }
  next();
};

export default { entryValidation };
