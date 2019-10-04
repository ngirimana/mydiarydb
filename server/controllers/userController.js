import lodash from 'lodash';
import Model from '../models/db';
import hashed from '../helpers/securedPassword';
import response from '../helpers/response';
import Token from '../helpers/tokens';

class UserController {
  static model() {
    return new Model('users');
  }

  static signUp = async (req, res) => {
    try {
      let {
        firstName,
        lastName,
        email,
        password,
      } = req.body;
      const user = await this.model().select('*', 'email=$1', [email]);
      if (user[0]) {
        return response.errorMessage(req, res, 409, `${email} was already taken`);
      }
      password = await hashed.encryptPassword(password);
      const cols = 'firstName, lastName,email,password';
      const userInfo = `'${firstName}', '${lastName}', '${email}', '${password}'`;
      const row = await this.model().insert(cols, userInfo);
      const token = Token.generateAuthToken(row[0].id, row[0].email);
      const data = {
        token,
        userData: lodash.pick(row[0], 'id', 'firstname', 'lastname', 'email'),
      };
      return response.successMessage(req, res, 201, 'User created successfully', data);
    } catch (error) {
      return response.errorMessage(req, res, 500, error);
    }
  }

  static signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.model().select('*', 'email=$1', [email]);
      if (user[0] && (hashed.decryptPassword(password, user[0].password))) {
        const token = Token.generateAuthToken(user[0].id, user[0].email);
        const data = {
          token,
          userData: lodash.pick(user[0], 'id', 'firstname', 'lastname', 'email'),
        };
        return response.successMessage(req, res, 200, 'User signed in successfully', data);
      }
      return response.errorMessage(req, res, 401, 'Incorrect email or password');
    } catch (err) {
      return response.errorMessage(req, res, 500, err);
    }
  }
}
export default { UserController };
