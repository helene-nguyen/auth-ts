import { Router } from 'express';
const router = Router();
import { fetchAllUsers, fetchOneUser, dosignUp, updateUser, deleteUser } from '../controllers/userController.js';
router.get('/users', fetchAllUsers);
router.get('/users/:userId', fetchOneUser);
router.post('/signup', dosignUp);
router.patch('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);
export { router };
//# sourceMappingURL=user.js.map