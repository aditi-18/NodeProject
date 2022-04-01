/**
* @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
* to integrate with MongoDB
*/

import Follows from "../models/Follows"; import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";
import { StringLiteralLike } from "typescript";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likedao.
 * @property {LikeDao} LikeDao Private single instance of LikeDao.
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
    * Creates singleton DAO instance
    * @returns LikeDao.
    */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() { }

    /**
    * Uses LikeModel to retrieve all users that is liked by tuit.
    * @param {string} tid is primary key of tuit.
    * @returns Promise To be notified when the tuits are retrieved from
    * database and populates the likedby field.
    */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({ tuit: tid })
            .populate("likedBy")
            .exec();

    /**
    * Uses LikeModel to retrieve all tuits that is liked by user.
    * @param {string} uid is primary key of user.
    * @returns Promise To be notified when the uis are retrieved from
    * database and populates the likedby field.
    */
     findAllTuitsLikedByUser = async (uid) =>
     LikeModel
       .find({likedBy: uid})
       .populate({
         path: "tuit",
         populate: {
           path: "postedBy"
         }
       })
       .exec();
   
   
    /**
    * Inserts like instance into the database
    * @param {string} uid is primary key of user.
    * @param {string} tid is primary key of tuit.
    * @returns Promise To be notified when like is inserted into the database along with likedby field.
    */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({ tuit: tid, likedBy: uid });
    /**
    * Deletes  like instance from the database
    * @param {string} uid is primary key of user.
    * @param {string} tid is primary key of tuit.
    * @returns Promise To be notified when like is deleted from the database along with likedby field.
    */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });
    /**
      * If a user has liked a particular tuit
      * @param uid Represents id of the user
      * @param tid Represents id of the tuit
      */

     findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
     LikeModel.findOne({tuit: tid, likedBy: uid});

 /**
   * Counts how many users liked a particular tuit.
   * @param tid Represents id of the tuit
   */

 countHowManyLikedTuit = async (tid: string): Promise<any> =>
     LikeModel.count({tuit: tid});
}