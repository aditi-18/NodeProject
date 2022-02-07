import {Request, Response} from "express";
import { Express } from "express-serve-static-core";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";
import User from "../models/User";

export default class UserController implements UserControllerI {
   static getInstance(app: Express) {
       throw new Error('Method not implemented.');
   }
   app: Express;
   userDao: UserDao;
   constructor(app: Express, userDao: UserDao) {
       this.app = app;
       this.userDao = userDao;
       this.app.get('/users', this.findAllUsers);
       this.app.get('/users/:userid', this.findUserById);
       this.app.post('/users', this.createUser);
       this.app.delete('/users/:userid', this.deleteUser);
       this.app.put('/users/:userid', this.updateUser);
   }
   findAllUsers = (req: Request, res: Response) =>
       this.userDao.findAllUsers()
           .then(User => res.json(User));
   findUserById = (req: Request, res: Response) =>
       this.userDao.findUserById(req.params.userid)
           .then(User => res.json(User));
   createUser = (req: Request, res: Response) =>
       this.userDao.createUser(req.body)
           .then(User => res.json(User));
   deleteUser = (req: Request, res: Response) =>
       this.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));
   updateUser = (req: Request, res: Response) =>
       this.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));
}
