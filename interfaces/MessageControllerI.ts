import {Request, Response} from "express";

export default interface MessageControllerI {

findAllMessages (req:Request,res:Response):void;
findAllMessageSentToUser(req:Request,res:Response):void;
findallMessageReceivedByUser(req:Request,res:Response):void;
deleteMessageSent(req:Request,res:Response):void;
sendMessage(req:Request,res:Response):void;
};