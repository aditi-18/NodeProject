import {Request, Response} from "express";
import { Express, ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";
import User from "../models/User";

export default class UserController implements UserControllerI {
private static userDao: UserDao = UserDao.getInstance();
private static userController: UserController | null = null;
public static getInstance = (app: Express): UserController => {
    if(UserController.userController === null) {
        UserController.userController = new UserController();
        
        //for testing without postman. Not RESTful
        // app.get("/api/users/create", UserController.userController.createUser);
        // app.get("/api/users/:uid/delete", UserController.userController.deleteUser);
        // app.get("/api/users/delete", UserController.userController.deleteUser);
        // 
        //RESTful User Web service API
        // app.get("/api/users", UserController.userController.findAllUsers);
        // app.get("/api/users/:uid", UserController.userController.findUserById);
        // app.post("/api/users", UserController.userController.createUser);
        // app.put("/api/users/:uid", UserController.userController.updateUser);
        // app.delete("/api/users/:uid", UserController.userController.deleteUser);
        // app.delete("/api/users", UserController.userController.deleteUser);
        app.get('/users', UserController.userController.findAllUsers);

app.get('/users/:userid', UserController.userController.findUserById);

app.post('/users', UserController.userController.createUser);

app.delete('/users/:userid', UserController.userController.deleteUser);

app.put('/users/:userid', UserController.userController.updateUser);
    }
    return UserController.userController;
}

private constructor() {}
    deleteAllUsers(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }

   findAllUsers = (req: Request, res: Response) =>
       UserController.userDao.findAllUsers()
           .then(User => res.json(User));
   findUserById = (req: Request, res: Response) =>
       UserController.userDao.findUserById(req.params.userid)
           .then(User => res.json(User));
   createUser = (req: Request, res: Response) =>
       UserController.userDao.createUser(req.body)
           .then(User => res.json(User));
   deleteUser = (req: Request, res: Response) =>
       UserController.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));
   updateUser = (req: Request, res: Response) =>
       UserController.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));
}

