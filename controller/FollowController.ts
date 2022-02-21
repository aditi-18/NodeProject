import FollowDao from "../daos/FollowDao";
import Follows from "../models/Follows";
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import User from "../models/User";
import FollowModel from "../mongoose/FollowModel";

export default class FollowController implements FollowControllerI{
    private static followDao:FollowDao=FollowDao.getInstance();
    private static followController:FollowController|null=null;

  /**
  * Creates singleton controller instance
  * @param {Express} app Express instance to declare the RESTful Web service
  * API
  * @return FollowController
  */
 public static getInstance = (app: Express): FollowController => {
    if(FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.get("/api/followUser", FollowController.followController.followUser);
        app.get("/api/followusers/:uid", FollowController.followController.findAllFollowedUser);
        app.get("/api/followinguser/:uid", FollowController.followController.findallFollowing);
        app.post("/api/follow/:uid", FollowController.followController.follow);
        app.delete("/api/unfollow/:uid", FollowController.followController.deletefollower);
    }
    return FollowController.followController;
}
private constructor(){}

followUser=(req: Request, res: Response) =>
FollowController.followDao.followUser().then((user:User[])=>res.json(user));

findAllFollowedUser = (req: Request, res: Response) =>
    FollowController.followDao.findAllFollowedUser(req.params.uid)
        .then((user: User[]) => res.json(user));
    
findallFollowing = (req: Request, res: Response) =>
    FollowController.followDao.findAllFollowedUser(req.params.uid)
        .then((user: User[]) => res.json(user));

follow = (req: Request, res: Response) =>
    FollowController.followDao.follow(req.params.uid, req.body)
            .then((status) => res.send(status));

deletefollower = (req: Request, res: Response) =>
    FollowController.followDao.deletefollower(req.params.uid)
        .then((status) => res.send(status));


};

