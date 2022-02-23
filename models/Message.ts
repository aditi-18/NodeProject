/**
 * @file Message sent by user.
*/

import User from "./User";
import mongoose from "mongoose";

/**
 * @typedef Message Represents msg sent between users.
 * @property {string} message body.
 * @property {to} User sending the msg.
 * @property {from} User receiving the msg.
 * @property {Date} sentOn is the date.
 */
export default interface Message {
    _id?: mongoose.Schema.Types.ObjectId,
    message: string,
    to: User,
    from: User,
    sentOn: Date
};