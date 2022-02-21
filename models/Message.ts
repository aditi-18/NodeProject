import User from "./User";
import mongoose from "mongoose";

export default interface Message {
    _id?: mongoose.Schema.Types.ObjectId,
    message: string,
    to: User,
    from: User,
    sentOn:Date
};