import mongoose from "mongoose";
import User from "./User";

export default interface Follows {
    _id?: mongoose.Schema.Types.ObjectId,
    followedBy:User,
    following:User,
};