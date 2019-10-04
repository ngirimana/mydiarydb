import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const userInfo = {

  generateAuthToken(id, email) {
    const token = jwt.sign({
      Id: id,
      userEmail: email,
    }, process.env.Token_Key, { expiresIn: '1d' });
    return token;
  },
  verifyToken(token) {
    const mytoken = jwt.verify(token, process.env.Token_Key);
    return mytoken.Id;
  },
};

export default userInfo;
