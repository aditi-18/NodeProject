/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import User from "./User";
import Tuit from "./Tuit";

/**
 * @typedef Bookmark Represents bookmark relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {User} user Bookmarking a tuit.
 * @property {Tuit} tuit being bookmarked.
 */
export default interface Bookmark {

bookmarkedTuit:Tuit,
bookmarkedBy:User

};