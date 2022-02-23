import Bookmark from "../models/Bookmark";
import Tuit from "../models/Tuit";
import User from "../models/User";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    bookmarkTuit(uid:string,tid:string):Promise<Bookmark>;
    unbookmarkTuit(uid:string,tid:string):Promise<any>;
    viewBookmarks(uid:string):Promise<Bookmark>;
};