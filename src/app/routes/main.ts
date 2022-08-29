//~Import modules
import { Router } from 'express';
const router = Router();

import { renderHomePage } from '../controllers/homePage.js'

//~Routes
router.get('/', renderHomePage);

export { router };
