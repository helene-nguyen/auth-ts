import debug from 'debug';
const logger = debug('Controller');
import { User } from '../datamappers/index.js';
import { ErrorApi } from '../services/errorHandler.js';
import bcrypt from 'bcrypt';
async function fetchAllUsers(req, res) {
    try {
        const users = await User.findAll();
        if (!users || users.length === 0)
            throw new ErrorApi(`No users found !`, req, res, 400);
        return res.status(200).json(users);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function fetchOneUser(req, res) {
    try {
        const userId = req.params.userId;
        if (typeof userId !== 'string')
            throw new ErrorApi(`Id must be a string`, req, res, 400);
        const user = await User.findOne(userId);
        if (!user)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        return res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function dosignUp(req, res) {
    try {
        let { email, password, passwordConfirm } = req.body;
        if (email) {
            const userExist = await User.findUser(email);
            if (userExist)
                throw new ErrorApi(`User already exists !`, req, res, 401);
        }
        if (password !== passwordConfirm)
            throw new ErrorApi(`Please enter the same password`, req, res, 401);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        req.body.password = password;
        req.body = { ...req.body, role: 'user' };
        const { ['passwordConfirm']: remove, ...user } = req.body;
        const userCreated = await User.create(user);
        if (!userCreated)
            throw new ErrorApi(`User creation failed`, req, res, 400);
        return res.status(201).json(`User created successfully !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function updateUser(req, res) {
    try {
        let { email, password, passwordConfirm } = req.body;
        const userExist = await User.findUser(email);
        if (userExist)
            throw new ErrorApi(`L'email existe déjà !`, req, res, 401);
        const userId = req.params.userId;
        const oneUser = await User.findOne(userId);
        if (!oneUser)
            throw new ErrorApi('Aucun utilisateur trouvé', req, res, 404);
        if (password !== passwordConfirm)
            throw new ErrorApi(`Les mots de passe ne sont pas identiques`, req, res, 401);
        if (password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            req.body.password = password;
            delete req.body['passwordConfirm'];
        }
        await User.updateOne(userId, req.body);
        return res.status(200).json(`User updated successfully !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function deleteUser(req, res) {
    try {
        const userId = req.params.userId;
        const oneUser = await User.findOne(userId);
        if (!oneUser)
            throw new ErrorApi('Aucun utilisateur trouvé', req, res, 404);
        await User.delete(userId);
        return res.status(200).json(`Le compte a bien été supprimé`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { fetchAllUsers, fetchOneUser, dosignUp, updateUser, deleteUser };
//# sourceMappingURL=userController.js.map