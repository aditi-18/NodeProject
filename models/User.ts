/**
 * @file Declares user data type.
 */
import AccountType from "./AccountType";
import MaritialStatus from "./MaritialStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents user.
 * @property {string} username of user's account.
 * @property {string} password of user's account.
 * @property {string} firstName of user.
 * @property {string} lastName of user.
 * @property {string} email of user.
 * @property {string} profilePhoto of user.
 * @property {User} headerImage user.
 * @property {string} biography of user.
 * @property {Date} dateOfBirth of user.
 * @property {AccountType} accountType user.
 * @property {MaritialStatus} maritalStatus of user.
 * @property {Location} location of user.
 * @property {number} salary of user.
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritialStatus,
    location?: Location,
    salary?: number
};