import {Request, Response} from "express";

export default interface FollowControllerI {

followUser(req:Request,res:Response):void;
findAllFollowedUser(req:Request,res:Response):void;
findallFollowing(req:Request,res:Response):void;
follow(req:Request,res:Response):void;
deletefollower(req:Request,res:Response):void;
};