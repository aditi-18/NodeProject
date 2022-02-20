// import TuitModel from "../mongoose/TuitModel";
// import Tuit from "../models/Tuit";
// import TuitDaoI from "../interfaces/TuitDaoI";
// export default class TuitDao implements TuitDaoI{
//     private static tuitDao: TuitDao | null = null;
//     public static getInstance = (): TuitDao => {
//         if(TuitDao.tuitDao === null) {
//             TuitDao.tuitDao = new TuitDao();
//         }
//         return TuitDao.tuitDao;
//     }
//     findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
//         TuitModel.find({postedBy: uid});
//     async findAllTuits(): Promise<Tuit[]> {
//         return await TuitModel.find();
//     }
//     async findTuitsByUser(uid: string): Promise<Tuit[]> {
//         return await TuitModel.find({postedBy:uid});
//     }
//      findTuitById = async (uid: string): Promise<any> =>
//         TuitModel.findById(uid)
//             .populate("postedBy")
//             .exec();
//     createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
//             TuitModel.create({...tuit, postedBy: uid});
//     async deleteTuit(tid: string):  Promise<any> {
//         return await TuitModel.deleteOne({_id: tid});
//     }
//     async updateTuit(tid: string, tuit: Tuit): Promise<any> {
//         return await TuitModel.updateOne({_id: tid}, {$set: tuit});
//     }

// }
/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
 import TuitModel from "../mongoose/TuitModel";
 import Tuit from "../models/Tuit";
 import TuitDaoI from "../interfaces/TuitDaoI";
 
 /**
  * @class UserDao Implements Data Access Object managing data storage
  * of Users
  * @property {UserDao} userDao Private single instance of UserDao
  */
 export default class TuitDao implements TuitDaoI{
     private static tuitDao: TuitDao | null = null;
     public static getInstance = (): TuitDao => {
         if(TuitDao.tuitDao === null) {
             TuitDao.tuitDao = new TuitDao();
         }
         return TuitDao.tuitDao;
     }
     private constructor() {}
     findAllTuits = async (): Promise<Tuit[]> =>
         TuitModel.find();
     findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
         TuitModel.find({postedBy: uid});
     findTuitById = async (uid: string): Promise<any> =>
         TuitModel.findById(uid)
             .populate("postedBy")
             .exec();
     createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
         TuitModel.create({...tuit, postedBy: uid});
     updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
         TuitModel.updateOne(
             {_id: uid},
             {$set: tuit});
     deleteTuit = async (uid: string): Promise<any> =>
         TuitModel.deleteOne({_id: uid});
 }