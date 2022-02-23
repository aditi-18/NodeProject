import {Request, Response} from "express";

export default interface MessageControllerI {
    
findAllMessageSentToUser(req:Request,res:Response):void;
findallMessageReceivedByUser(req:Request,res:Response):void;
deleteMessageSent(req:Request,res:Response):void;
sendMessage(req:Request,res:Response):void;
};