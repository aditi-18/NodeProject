/**
 * @file Declares Follow data type representing relationship between
 * users and tuits, as in user follow a tuit
 */
import mongoose from "mongoose";
import User from "./User";

/**
 * @typedef Follow Represents follows relationship between a user and a user,
 * as in a user follows a tuit
 * @property {User} user follwing.
 * @property {User} user being followed.
 */
export default interface Follows {
    _id?: mongoose.Schema.Types.ObjectId,
    followedBy:User,
    following:User,
};