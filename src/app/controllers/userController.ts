//~Import modules
import debug from 'debug';
const logger = debug('Controller');
import { User } from '../datamappers/index.js';
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Security
import bcrypt from 'bcrypt';

//~CONTROLLERS
async function fetchAllUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll();

    if (!users || users.length === 0) throw new ErrorApi(`No users found !`, req, res, 400);

    return res.status(200).json(users);
  } catch (err: unknown) {
    if (err instanceof Error) logger(err.message);
    //https://stackoverflow.com/questions/60151181/object-is-of-type-unknown-typescript-generics
    //make a conditin to catch the error that is first unknown
  }
}

async function fetchOneUser(req: Request, res: Response) {
  try {
    const userId = req.params.userId;

    if (typeof userId !== 'string') throw new ErrorApi(`Id must be a string`, req, res, 400);

    const user: object | null | undefined = await User.findOne(userId);

    if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    // const isUser = req.user._id;
    // if (isUser !== userId && isUser !== 'string') throw new ErrorApi(`Bad Request`, req, res, 400);

    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function dosignUp(req: Request, res: Response) {
  try {
    let { email, password, passwordConfirm } = req.body;

    if (email) {
      const userExist = await User.findUser(email);
      if (userExist) throw new ErrorApi(`User already exists !`, req, res, 401);
    }

    //~ Encrypt password if password exist
    if (password !== passwordConfirm) throw new ErrorApi(`Please enter the same password`, req, res, 401);
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //replace password in body
    req.body.password = password;

    //~ Add role + remove passwordconfirm
    // console.log("\x1b[1;34m ---------------------------------------\x1b[0m ");
    // console.log("✨\x1b[1;34m YOU BODY BEFORE ADDING SOMETHING:\x1b[0m ", req.body);

    req.body = { ...req.body, role: 'user' };
    const { ['passwordConfirm']: remove, ...user } = req.body;

    //~ Create user
    const userCreated = await User.create(user);

    if (!userCreated) throw new ErrorApi(`User creation failed`, req, res, 400);

    return res.status(201).json(`User created successfully !`);
  } catch (err: unknown) {
    if (err instanceof Error) logger(err.message);
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    let { email, password, passwordConfirm } = req.body;

    const userExist = await User.findUser(email);
    if (userExist) throw new ErrorApi(`L'email existe déjà !`, req, res, 401);

    const userId = req.params.userId;

    const oneUser = await User.findOne(userId);
    if (!oneUser) throw new ErrorApi('Aucun utilisateur trouvé', req, res, 404);

    //~ Encrypt password if password exist
    if (password !== passwordConfirm) throw new ErrorApi(`Les mots de passe ne sont pas identiques`, req, res, 401);
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      req.body.password = password;
      delete req.body['passwordConfirm'];
    }

    await User.updateOne(userId, req.body);
    return res.status(200).json(`User updated successfully !`);
  } catch (err: unknown) {
    if (err instanceof Error) logger(err.message);
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.userId;

    const oneUser = await User.findOne(userId);
    if (!oneUser) throw new ErrorApi('Aucun utilisateur trouvé', req, res, 404);

    await User.delete(userId);
    return res.status(200).json(`Le compte a bien été supprimé`);
  } catch (err: unknown) {
    if (err instanceof Error) logger(err.message);
  }
}

export { fetchAllUsers, fetchOneUser, dosignUp, updateUser, deleteUser };
