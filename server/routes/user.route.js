import express from 'express';
import userControl from '../controllers/userController';
import { signUpValidation, signInValidation } from '../middlewares/userValidator';

const router = express.Router();
router.post('/signup', signUpValidation, userControl.UserController.signUp);
router.post('/signin', signInValidation, userControl.UserController.signIn);
export default router;
