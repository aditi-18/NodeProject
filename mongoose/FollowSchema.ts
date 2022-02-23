import mongoose,{Schema} from "mongoose"; 
import User from "../models/User";
import Follows from "../models/Follows";

const FollowSchema = new mongoose.Schema<Follows>({
    followedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    following:{type: Schema.Types.ObjectId, ref: "UserModel"}
},{collection: "follows"});
export default FollowSchema;

