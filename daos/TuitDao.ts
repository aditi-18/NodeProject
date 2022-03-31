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
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() { }

    /**
    * Uses TuitModel to retrieve all tuits.
    * @returns Promise To be notified when the tuits are retrieved from
    * database.
    */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
    * Uses TuitModel to retrieve all tuits by a user.
    *@param {string} uid is primary key of user.
    * @returns Promise To be notified when the tuits by a user are retrieved from
    * database.
    */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
    TuitModel.find({postedBy: uid})
           .sort({'postedOn': -1})
           .populate("postedBy")
           .exec();
    /**
    * Uses TuitModel to retrieve all tuits by id of a user.
    *@param {string} uid is primary key of user.
    * @returns Promise To be notified when the tuits by a user are retrieved from
    * database and posted by filed is filled.
    */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();
    /**
    * Inserts tuit instance into the database.
    * @param {string} uid is primary key of user.
    * @param {string} tid is primary key of tuit.
    * @returns Promise To be notified when tuit is created into the database.
    */
    createTuit = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({ ...tuit, postedBy: uid });

    /**
    * Updates tuit instance into the database.
    * @param {string} uid is primary key of user.
    * @param {string} tid is primary key of tuit.
    * @returns Promise To be notified when tuit is modified into the database.
    */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            { _id: uid },
            { $set: tuit });
    /**
    * Deletes tuit instance from the database.
    * @param {string} uid is primary key of user.
    * @returns Promise To be notified when tuit is deleted from the database.
    */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({ _id: uid });
    
    deleteTuitByContent = async (tuit: string): Promise<any> =>
        TuitModel.deleteMany({tuit});
}