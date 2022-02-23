import {Request, Response} from "express";

export default interface BookmarkControllerI {

bookmarkTuit(req:Request,res:Response):void;
unbookmarkTuit(req:Request,res:Response):void;
viewBookmarks(req:Request,res:Response):void;
};