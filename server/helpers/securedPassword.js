import bcrypt from 'bcrypt';

const encryptPassword = (pass) => bcrypt.hashSync(pass, Number(process.env.PASSWORD_SALT));
const decryptPassword = (userPass, hashedPass) => bcrypt.compareSync(userPass, hashedPass);

export default {
  encryptPassword,
  decryptPassword,
};
