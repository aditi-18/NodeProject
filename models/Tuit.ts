/**
 * @file Declares Tuit data type.
 */

import User from "./User";
import Stats from "./Stats";

/**
 * @typedef Tuit Represents tuit.
 * @property {string} tuit.
 * @property {User} postedBy user.
 * @property {Date} postedOn date.
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};