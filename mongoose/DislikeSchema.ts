 /**
 * @file Implements mongoose schema for dislikes
 */
  import mongoose, {Schema} from "mongoose";
  import Dislike from "../models/Dislike";
  
  /**
   * @typedef Dislike Represents dislikes relationship when a user dislikes a tuit
   * @property {Tuit} tuit Tuit being liked
   * @property {User} dislikedBy User liking the tuit
   */
  
  const DislikeSchema = new mongoose.Schema<Dislike>({
      tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
      dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
  }, {collection: "dislikes"});
  export default DislikeSchema;