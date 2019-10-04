import Joi from 'joi';
import response from '../helpers/response';

export const signUpValidation = (req, res, next) => {
  const schema = {
    firstName: Joi.string().regex(/^[a-zA-Z]+$/).max(100).required(),
    lastName: Joi.string().regex(/^[a-zA-Z]+$/).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]+$/).min(8).max(20)
      .required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return response.errorMessage(req, res, 400, `${result.error.details[0].message}`);
  }
  next();
};
export const signInValidation = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{10,30}$/).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return response.errorMessage(req, res, 400, `${result.error.details[0].message}`);
  }
  next();
};
