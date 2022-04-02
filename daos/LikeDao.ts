/**
* @file Implements DAO managing data storage of likes. Uses mongoose LikeModel.
*/

import Follows from "../models/Follows"; import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";


/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likedao.
 * @property {LikeDao} LikeDao Private single instance of LikeDao.
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
    * Singleton DAO instance
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
    * Retrieve all users that is liked by tuit using LikeModel.
    * @param {string} tid is primary key of tuit.
    * @returns Promise to be notified when the tuits are retrieved from
    * database and likedby filed is populated.
    */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({ tuit: tid })
            .populate("likedBy")
            .exec();

    /**
    * Retrieve all tuits liked by user using UserModel.
    * @param {string} uid as primary key of user.
    * @returns Promise to be notified when tuits are retrieved from
    * database and likedby field is populated.
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
    * Insert like instance into the database
    * @param {string} uid as primary key of user.
    * @param {string} tid as primary key of tuit.
    * @returns Promise to be notified when like is inserted into the database along with likedby field.
    */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({ tuit: tid, likedBy: uid });

    /**
    * Delete like  from the database
    * @param {string} uid is primary key of user.
    * @param {string} tid is primary key of tuit.
    * @returns Promise to be notified when like is deleted from the database along with likedby field.
    */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });


    /**
      * Checking if user has liked a tuit.
      * @param uid id of the user
      * @param tid id of the tuit
      */

     findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
     LikeModel.findOne({tuit: tid, likedBy: uid});

 /**
   * Counts of users that liked a tuit.
   * @param tid id of the tuit
   */

 countHowManyLikedTuit = async (tid: string): Promise<any> =>
     LikeModel.count({tuit: tid});
}