/**
 * @file Controller RESTful Web service API for tuits resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/Message";
 import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI {
    private static msgDao: MessageDao = MessageDao.getInstance();
    private static msgController: MessageController | null = null;
 
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.msgController === null) {
             MessageController.msgController = new MessageController();
             app.get("/api/msgs", MessageController.msgController.findAllMessages);
             app.get("/api/msgsent/:uid", MessageController.msgController.findAllMessageSentToUser);
             app.get("/api/msgreceived/:uid", MessageController.msgController.findallMessageReceivedByUser);
             app.post("/api/msg/:uid", MessageController.msgController.sendMessage);
             app.delete("/api/msg/:mid", MessageController.msgController.deleteMessageSent);
        }
        return MessageController.msgController;
          }
     private constructor() {}

     findAllMessages  = (req: Request, res: Response) =>
    MessageController.msgDao.findAllMessages()
        .then((message: Message[]) => res.json(message));

    findAllMessageSentToUser = (req: Request, res: Response) =>
        MessageController.msgDao.findAllMessageSentToUser(req.params.uid)
            .then((msg: Message[]) => res.json(msg));

    findallMessageReceivedByUser = (req: Request, res: Response) =>
        MessageController.msgDao.findAllMessageSentToUser(req.params.uid)
                .then((msg: Message[]) => res.json(msg));
    
    deleteMessageSent = (req: Request, res: Response) =>
        MessageController.msgDao.deleteMessageSent(req.params.mid)
                    .then((status) => res.send(status));
            
    sendMessage = (req: Request, res: Response) =>
        MessageController.msgDao.sendMessage(req.params.uid, req.body)
             .then((status) => res.send(status));

    };