/**
 * @file Controller RESTful Web service API for Bookmark resource
 */
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDao from "../daos/BookmarkDao";
import Bookmark from "../models/Bookmark";
import { Express, Request, Response } from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import User from "../models/User";
import Tuit from "../models/Tuit";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmark resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/bookmarkTuit/:uid/:tid to create a bookmark of a tuit
 *     by given user</li>
 *     <li>GET /api/bookmarks to retrieve all the bookmarked tuits </li>
 *     <li>DELETE /api/unbookmarktuits/:uid/:tid to unbookmark a particular tuit </li>
 * </ul>
 * @property {BookmarkDao} bookmarkdao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkdao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return BookmarkController
    */
    public static getInstance = (app: Express): BookmarkController => {

        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/api/bookmarks", BookmarkController.bookmarkController.viewBookmarks);
            app.post("/api/bookmarkTuit/:uid/:tid", BookmarkController.bookmarkController.bookmarkTuit);
            app.delete("/api/unbookmarkTuit/:uid/:tid", BookmarkController.bookmarkController.unbookmarkTuit);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() { }

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new bookmark to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    bookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkdao.bookmarkTuit(req.params.uid, req.params.tid)
            .then((bookmarks) => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter uid and tid identifying the primary key of the bookmark to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a bookmark was successful or not
     */
    unbookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkdao.unbookmarkTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));


    /**
     * Retrieves all bookmarks from the database and returns an array of tuit id and user id.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmarks objects
     */
    viewBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkdao.viewBookmarks(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

};
