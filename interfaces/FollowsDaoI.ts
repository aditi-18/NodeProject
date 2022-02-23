import Follows from "../models/Follows";
import User from "../models/User";

/**
 * @file Declares API for follow related data access object methods
 */
export default interface FollowDaoI {

    findAllFollowedUser(uid:String):Promise<Follows[]>;
    findallFollowing(uid:string):Promise<Follows[]>;
    follow(uid1:string,uid2:string,user:User):Promise<any>;
    deletefollower(uid1:string,uid2:string):Promise<any>;
};