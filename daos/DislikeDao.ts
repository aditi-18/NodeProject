/**
 * @file Implements DAO for dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */

 import DislikeDaoI from "../interfaces/DislikeDaoI";
 import DislikeModel from "../mongoose/DislikeModel";
 import Dislike from "../models/Dislike";
 
 /**
   * @class DislikeDao Implements Data Access Object managing data storage
   * of Dislikes
   * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
   */
 
 export default class DislikeDao implements DislikeDaoI {
     private static dislikeDao: DislikeDao | null = null;
     public static getInstance = (): DislikeDao => {
         if(DislikeDao.dislikeDao === null) {
             DislikeDao.dislikeDao = new DislikeDao();
         }
         return DislikeDao.dislikeDao;
     }
     private constructor() {}
 
     
     /**
       * Create a dislike instance
       * @param uid Represents id of the user
       * @param tid Represents id of the tuit
       */
     userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
         DislikeModel.create({tuit: tid, dislikedBy: uid});
 
     /**
       * Removes a dislike instance
       * @param uid Represents id of the user
       * @param tid Represents id of the tuit
       */
 
     userRemoveDislikesTuit = async (uid: string, tid: string): Promise<any> =>
         DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
 
     /**
       * Check of a users who have disliked a particular tuit
       * @param uid Represents id of the user
       * @param tid Represents id of the tuit
       */
 
      findUserDislikedTuit = async (uid: string, tid: string): Promise<any> =>
         DislikeModel.findOne({tuit: tid, dislikedBy: uid});
 
     /**
       * Counts of users that disliked a particular tuit.
       * @param tid Represents id of the tuit
       */
 
     countHowManyDislikedTuit = async (tid: string): Promise<any> =>
         DislikeModel.count({tuit: tid});

       /**
        * Users that disliked a tuit 
        * @param tid  id of the tuit
        */

        findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();
  
        /**
          * All tuits disliked by a user 
          * @param uid  id of the user
          */
  
         findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
         DislikeModel
             .find({dislikedBy: uid})
             .populate({
                 path: "tuit",         
                 populate: {
                     path: "postedBy" 
                 }
             })
             .exec();
             findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});
  
   
 }