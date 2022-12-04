import experss from 'express';
import {signin, signup} from '../controllers/user.js';

const router = experss.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;