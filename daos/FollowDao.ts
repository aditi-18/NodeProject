/**
* @file Implements DAO managing data storage of follow requests. Uses mongoose FollowModel
* to integrate with MongoDB
*/

import Follows from "../models/Follows";
import FollowDaoI from "../interfaces/FollowsDaoI";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowModel from "../mongoose/FollowModel";
import User from "../models/User";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of followDao.
 * @property {FollowDao} FollowDao Private single instance of FollowDao.
 */
export default class FollowDao implements FollowDaoI {

    private static followdao: FollowDao | null = null;
    /**
    * Creates singleton DAO instance
    * @returns FollowDao.
    */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followdao == null) {
            FollowDao.followdao = new FollowDao();
        }
        return FollowDao.followdao;
    }
    private constructor() { }


    /**
    * FollowModel used to retrieve all users that are following.
    * @param {string} uid is primary key of user.
    * @returns Promise to be notified when the follow are retrieved from
    * database followed field is populated.
    */
    findAllFollowedUser = async (uid: string): Promise<Follows[]> =>
        FollowModel.find({ followedBy: uid })
            .populate("followedBy")


    /**
    *  FollowModel used  to retrieve all users they are following .
    * @param {string} uid is primary key of user.
    * @returns Promise to be notified when the follow are retrieved from
    * database following field is populated.
    */
    findallFollowing = async (uid: string): Promise<Follows[]> =>
        FollowModel.find({ following: uid })
            .populate("following")


    /**
     * Removes a particular follow from the database. Useful for testing
     * @param {string} uid1 is primary key of user1.
     * @param {string} uid2 is primary key of user2.
     * @returns Promise To be notified when a users unfollows a particular user from follow
     * database
     */
    deletefollower = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({ _id: uid1 }, { _id: uid2 });


    /**
     * Inserts follow instance into the database
     * @param {string} uid1 is primary key of user1.
     * @param {string} uid2 is primary key of user2.
     * @returns Promise To be notified when follow is inserted into the database
     */
    follow = async (uid1: string, uid2: string, user: User): Promise<any> =>
        FollowModel.create(
            { followedBy: uid1 },
            { following: uid2 })

};
