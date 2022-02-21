import Follows from "../models/Follows";
import User from "../models/User";

/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface FollowDaoI {
    followUser():Promise<User[]>;
    findAllFollowedUser(uid:String):Promise<User[]>;
    findallFollowing(uid:string):Promise<User[]>;
    follow(uid:string,user:User):Promise<any>;
    deletefollower(uid:string):Promise<any>;
};