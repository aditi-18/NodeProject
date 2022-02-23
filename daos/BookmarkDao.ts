/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import User from "../models/User";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import Tuit from "../models/Tuit";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of BookmarkDao.
 * @property {BookmarkDao} BookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkdao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkdao == null) {
            BookmarkDao.bookmarkdao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkdao;
    }
    private constructor() { }


    /**
     * Inserts bookmark instance into the database
     * @param {string} uid is primary key of user.
     * @param {string} tid is primary key of tuit.
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    bookmarkTuit = async (uid: string, tid: String): Promise<any> =>
        BookmarkModel.create(
            { bookmarkedBy: uid },
            { bookmarkedTuit: tid });


    /**
    * Removes a particular bookmark from the database. Useful for testing
    * @param {string} uid is primary key of user.
    * @param {string} tid is primary key of tuit.
    * @returns Promise To be notified when a users removes a particular tuit from bookmark
    * database
    */
    unbookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ bookmarkedBy: uid }, { bookmarkedTuit: tid });



    /**
    * Uses BookmarkModel to retrieve all bookmarked documents by a user.
    * @param {string} uid is primary key of user.
    * @returns Promise To be notified when the bookmarks are retrieved from
    * database
    */
    viewBookmarks = async (uid: string): Promise<any> =>
        BookmarkModel.find({ bookmarkedBy: uid })
            .populate("bookmarkedBy");


};

