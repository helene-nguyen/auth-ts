import { Router } from 'express';
const router = Router();
import { renderHomePage } from '../controllers/homePage.js';
router.get('/', renderHomePage);
export { router };
//# sourceMappingURL=main.js.map