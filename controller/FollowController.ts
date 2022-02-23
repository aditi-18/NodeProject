/**
 * @file Controller RESTful Web service API for Follow resource
 */
import FollowDao from "../daos/FollowDao";
import Follows from "../models/Follows";
import { Express, Request, Response } from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import User from "../models/User";
import FollowModel from "../mongoose/FollowModel";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/follow/:uid1/:uid2 to create a follow of a user1 and user2</li>
 *     <li>GET /api/followuser/:uid to retrieve list of users they are following  </li>
 *     <li>GET /api/followinguser/:uid to retrieve list of users that are following them </li>
 *     <li>DELETE /api/unfollow/:uid1/:uid2 to unfollow a particular user </li>
 * </ul>
 * @property {FollowDao} followdao Singleton DAO implementing follow CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
    * Creates singleton controller instance
    * @param {Express} app Express instance to declare the RESTful Web service
    * API
    * @return FollowController
    */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();

            app.get("/api/followuser/:uid", FollowController.followController.findAllFollowedUser);
            app.get("/api/followinguser/:uid", FollowController.followController.findallFollowing);
            app.post("/api/follow/:uid1/:uid2", FollowController.followController.follow);
            app.delete("/api/unfollow/:uid1/:uid2", FollowController.followController.deletefollower);
        }
        return FollowController.followController;
    }
    private constructor() { }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user that are followed.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the uid that matches that the user 
     * follows.
     */
    findAllFollowedUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowedUser(req.params.uid)
            .then((follow: Follows[]) => res.json(follow));

    /**
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user that are following.
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON containing the uid that matches that the user 
    * following.
    */
    findallFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowedUser(req.params.uid)
            .then((follow: Follows[]) => res.json(follow));

    /**
    * @param {Request} req Represents request from client, including body
    * containing the JSON object for the new follow to be inserted in t
    * database.
    * @param {Response} res Represents response to client, including status
    * on whether follow was successful or not.
    */
    follow = (req: Request, res: Response) =>
        FollowController.followDao.follow(req.params.uid1, req.params.uid2, req.body)
            .then((status) => res.send(status));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter uid1 and uid2 identifying the primary key of the follower to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a follow was successful or not
     */
    deletefollower = (req: Request, res: Response) =>
        FollowController.followDao.deletefollower(req.params.uid1, req.params.uid2)
            .then((status) => res.send(status));


};

