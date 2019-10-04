import express from 'express';
import entryControl from '../controllers/entryController';
import { entryValidation } from '../middlewares/entryValidation';
import Authentication from '../middlewares/verifyAuth';

const router = express.Router();
router.post('/entries', Authentication.verifyAuth, entryValidation, entryControl.EntryController.createEntry);
router.patch('/entries/:entryId', Authentication.verifyAuth, entryValidation, entryControl.EntryController.modifyEntry);
router.get('/entries', Authentication.verifyAuth, entryControl.EntryController.getAllEntries);
router.get('/entries/:entryId', Authentication.verifyAuth, entryControl.EntryController.getSpecificEntry);
router.delete('/entries/:entryId', Authentication.verifyAuth, entryControl.EntryController.deleteEntry);

export default router;
