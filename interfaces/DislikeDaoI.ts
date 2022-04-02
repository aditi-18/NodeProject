import Like from "../models/Like";
import Dislike from "../models/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 */

export default interface DislikeDao {
    userDislikesTuit (tid: string, uid: string): Promise<any>;
    userRemoveDislikesTuit (tid: string, uid: string): Promise<Like>;
    findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>;
    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;
    countHowManyDislikedTuit (tid: string): Promise<any>;
    findUserDislikesTuit(uid: string, tid: string): Promise<any>;////////
};