/**
* @file Implements mongoose schema for likes
*/
import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";


/**
 * @typedef Like Represents like by a user,
 * @property {string} tuit User likes a tuit
 * @property {User} likedBy User who liked the tuit
 */

const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;