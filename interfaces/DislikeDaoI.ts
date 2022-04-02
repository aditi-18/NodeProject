import Like from "../models/Like";

/**
 * @file Declares API for Dislikes related data access object methods
 */

export default interface DislikeDao {
    userDislikesTuit (tid: string, uid: string): Promise<any>;
    userRemoveDislikesTuit (tid: string, uid: string): Promise<Like>;
};