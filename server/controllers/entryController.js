import Model from '../models/db';
import response from '../helpers/response';
import Token from '../helpers/tokens';
import notNumber from '../helpers/notNumber';

class EntryController {
  static entryModel() {
    return new Model('entries');
  }

  static createEntry = async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = Token.verifyToken(req.header('x-auth-token'));
      const cols = 'created_on, userid,title,description,updated_on';
      const entryInfo = `NOW(), ${userId}, '${title}', '${description}',NOW()`;
      const row = await this.entryModel().insert(cols, entryInfo, '');
      return response.successMessage(req, res, 200, 'entry successfully created', row);
    } catch (er) {
      return response.errorMessage(req, res, 500, er);
    }
  }

  static modifyEntry = async (req, res) => {
    let { title, description } = req.body;
    const { entryId } = req.params;
    const userInfosId = Token.verifyToken(req.header('x-auth-token'));
    if (isNaN(entryId)) { return notNumber(req, res); }
    const entry = await this.entryModel().select('*', 'id=$1', [entryId]);
    if (!entry.length) {
      return response.errorMessage(req, res, 404, `An entry with Id ${entryId} does not exist`);
    }
    if (userInfosId !== entry[0].userid) {
      return response.errorMessage(req, res, 403, `An entry with Id ${entryId} does not belongs to you`);
    }
    const cols = 'title=$1, description=$2, updated_on=$3';
    const clause = 'id=$4';
    const values = [title, description, 'Now()', entryId];
    const updatedEntry = await this.entryModel().update(cols, clause, values);
    return response.successMessage(req, res, 200, 'entry successfully edited', updatedEntry);
  }

  static getAllEntries = async (req, res) => {
    const userId = Token.verifyToken(req.header('x-auth-token'));
    const myEntries = await this.entryModel().select('*', 'userid=$1', [userId]);
    if (!myEntries.length) {
      return response.errorMessage(req, res, 404, 'Your entries  are not found!');
    }
    return response.successMessage(req, res, 200, 'Your available entries are: ', myEntries);
  };

  static getSpecificEntry = async (req, res) => {
    const { entryId } = req.params;
    const userInfos = Token.verifyToken(req.header('x-auth-token'));
    if (isNaN(entryId)) { return notNumber(req, res); }
    const singleEntry = await this.entryModel().select('*', 'id=$1', [entryId]);
    if (!singleEntry.length) {
      return response.errorMessage(req, res, 404, 'This entry is not fouund');
    }
    if (singleEntry[0].userid !== userInfos) {
      return response.errorMessage(req, res, 403, 'This entry is not yours');
    }
    return response.successMessage(req, res, 200, 'Your Entry was found', singleEntry);
  }

  static deleteEntry = async (req, res) => {
    const { entryId } = req.params;
    const userInfo = Token.verifyToken(req.header('x-auth-token'));
    if (isNaN(entryId)) { return notNumber(req, res); }
    const uniqueEntry = await this.entryModel().select('*', 'id=$1', [entryId]);
    if (!uniqueEntry.length) {
      return response.errorMessage(req, res, 404, 'This entry is not avaialable');
    }
    if (uniqueEntry[0].userid !== userInfo) {
      return response.errorMessage(req, res, 403, 'This entry doesn\'t belongs to you');
    }
    await this.entryModel().delete('id=$1', [entryId]);
    return response.successMessage(req, res, 200, 'entry successfully deleted', uniqueEntry);
  }
}
export default { EntryController };
