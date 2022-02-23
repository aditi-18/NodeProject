/**
 * @file Controller RESTful Web service API for message resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/Message";
import { Express, Request, Response } from "express";
import MessageControllerI from "../interfaces/MessageControllerI";


/**
 * @class MessageController Implements RESTful Web service API for msgs resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/msgsentto/:uid to retrieve all the msgs sent to a user </li>
 *     <li>GET /api/msgreceivedfrom/:uid/ retrieve all msgs that were received from a user. </li>
 *     <li>POST /api/msg/from/:uid/to/:uid to record msg sent from a user to another </li>
 *     <li>DELETE /api/msg/:mid to record deleted msg </li>
 * </ul>
 * @property {Message} msgDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
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
        if (MessageController.msgController === null) {
            MessageController.msgController = new MessageController();
            app.get("/api/msgsentto/:uid", MessageController.msgController.findAllMessageSentToUser);
            app.get("/api/msgreceivedfrom/:uid", MessageController.msgController.findallMessageReceivedByUser);
            app.post("/api/msg/from/:uid1/to/:uid2", MessageController.msgController.sendMessage);
            app.delete("/api/msg/:mid", MessageController.msgController.deleteMessageSent);
        }
        return MessageController.msgController;
    }
    private constructor() { }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user that the msg is sent to .
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the msg sent.
     */
    findAllMessageSentToUser = (req: Request, res: Response) =>
        MessageController.msgDao.findAllMessageSentToUser(req.params.uid)
            .then((msg: Message[]) => res.json(msg));

    /**
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user that the msg is received by .
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON containing the msg received.
    */
    findallMessageReceivedByUser = (req: Request, res: Response) =>
        MessageController.msgDao.findAllMessageSentToUser(req.params.uid)
            .then((msg: Message[]) => res.json(msg));

    /**
     * @param {Request} req Represents request from client, including path
     * parametermid identifying the primary key of the msg to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a msg delete was successful or not
     */

    deleteMessageSent = (req: Request, res: Response) =>
        MessageController.msgDao.deleteMessageSent(req.params.mid)
            .then((status) => res.send(status));

    /**
    * @param {Request} req Represents request from client, including body
    * containing the JSON object for the new msg to be inserted in t
    * database.
    * @param {Response} res Represents response to client, including json
    * of the msg sent.
    */
    sendMessage = (req: Request, res: Response) =>
        MessageController.msgDao.sendMessage(req.params.uid1, req.params.uid2, req.body)
            .then((msg: Message) => res.json(msg));

};